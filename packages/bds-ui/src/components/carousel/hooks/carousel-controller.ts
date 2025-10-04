import { CarouselControllerConfig, CarouselState } from '../types/types';
import { mod } from './use-carousel-touch';

/**
 * 캐러셀 이동 제어를 담당하는 컨트롤러 클래스
 * 모든 이동 로직을 중앙화하여 일관성 있는 동작을 보장합니다.
 */
export class CarouselController {
  private config: CarouselControllerConfig;

  constructor(config: CarouselControllerConfig) {
    this.config = config;
  }

  /**
   * 설정 업데이트 (부분 병합)
   */
  updateConfig(config: Partial<CarouselControllerConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * 특정 인덱스로 이동
   */
  moveToIndex(currentState: CarouselState, targetIndex: number): CarouselState {
    const { totalItems, slideWidth, infinite, slidesPerView } = this.config;

    if (totalItems === 0) {
      return currentState;
    }

    let normalizedTargetIndex: number;
    let newOffset: number;
    if (infinite) {
      normalizedTargetIndex = mod(targetIndex, totalItems);
      const currentNormalizedIndex = mod(currentState.currentIndex, totalItems);
      const diff = normalizedTargetIndex - currentNormalizedIndex;

      const directDistance = Math.abs(diff);
      const wrapDistance = totalItems - directDistance;

      if (directDistance <= wrapDistance) {
        newOffset = currentState.offset + diff * slideWidth;
      } else {
        const direction =
          normalizedTargetIndex > currentNormalizedIndex ? -1 : 1;
        const indexDiff = direction * wrapDistance;
        newOffset = currentState.offset + indexDiff * slideWidth;
      }
    } else {
      const maxIndex = totalItems - 1;
      const maxOffset = Math.max(0, (totalItems - slidesPerView) * slideWidth);

      normalizedTargetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
      newOffset = Math.min(normalizedTargetIndex * slideWidth, maxOffset);
    }

    return {
      currentIndex: normalizedTargetIndex,
      offset: newOffset,
    };
  }

  /**
   * 다음 슬라이드로 이동 (현재 + 1)
   */
  moveNext(currentState: CarouselState): CarouselState {
    return this.moveToIndex(currentState, currentState.currentIndex + 1);
  }

  /**
   * 이전 슬라이드로 이동 (현재 - 1)
   */
  movePrev(currentState: CarouselState): CarouselState {
    return this.moveToIndex(currentState, currentState.currentIndex - 1);
  }

  /**
   * 드래그 오프셋을 기반으로 가장 가까운 인덱스 계산
   */
  findNearestIndexFromOffset(currentOffset: number): number {
    const { slideWidth, totalItems, slidesPerView } = this.config;
    const rawIndex = Math.round(currentOffset / slideWidth);

    if (this.config.infinite) {
      return mod(rawIndex, totalItems);
    } else {
      const maxIndex = totalItems - 1;
      const maxOffset = Math.max(0, (totalItems - slidesPerView) * slideWidth);

      if (currentOffset >= maxOffset - slideWidth * 0.1) {
        return maxIndex;
      }

      return Math.max(0, Math.min(rawIndex, maxIndex));
    }
  }

  /**
   * 드래그 종료 시 스냅할 인덱스 결정
   */
  snapToNearestIndex(
    currentState: CarouselState,
    dragOffset: number,
  ): CarouselState {
    const totalOffset = currentState.offset + dragOffset;
    const nearestIndex = this.findNearestIndexFromOffset(totalOffset);

    return this.moveToIndex(currentState, nearestIndex);
  }

  /**
   * 현재 상태에서 이동 가능한지 확인
   */
  canMoveNext(currentState: CarouselState): boolean {
    if (this.config.infinite) {
      return this.config.totalItems > 1;
    }
    return currentState.currentIndex < this.config.totalItems - 1;
  }

  canMovePrev(currentState: CarouselState): boolean {
    if (this.config.infinite) {
      return this.config.totalItems > 1;
    }
    return currentState.currentIndex > 0;
  }

  /**
   * 상대적 이동 (현재 위치에서 n만큼 이동)
   */
  moveBy(currentState: CarouselState, steps: number): CarouselState {
    return this.moveToIndex(currentState, currentState.currentIndex + steps);
  }

  /**
   * 자유 드래그 모드: 드래그된 위치를 그대로 채택 (autoPlay 용)
   * 오프셋은 라운딩하지 않고, 인덱스만 표시용으로 계산
   */
  handleFreeDrag(
    currentState: CarouselState,
    dragOffsetPercent: number,
  ): CarouselState {
    const { totalItems, slideWidth, slidesPerView } = this.config;
    let newOffset = currentState.offset + dragOffsetPercent;

    if (!this.config.infinite) {
      const maxOffset = Math.max((totalItems - slidesPerView) * slideWidth, 0);
      newOffset = Math.min(Math.max(newOffset, 0), maxOffset);
    }

    const safeTotal = Math.max(totalItems, 1);
    const rawIndex =
      Math.floor((newOffset + slideWidth / 2) / slideWidth) % safeTotal;
    const newIndex = totalItems > 0 ? (rawIndex + totalItems) % totalItems : 0;

    return {
      currentIndex: newIndex,
      offset: newOffset,
    };
  }

  /**
   * 스냅 드래그 모드: 임계값 기준으로 ±1칸 이동 또는 제자리 복귀
   */
  handleSnapDrag(
    currentState: CarouselState,
    dragOffsetPercent: number,
    threshold?: number,
  ): CarouselState {
    const { slideWidth } = this.config;
    const dragThreshold = threshold ?? slideWidth / 3;
    const magnitude = Math.abs(dragOffsetPercent);

    if (magnitude < dragThreshold) {
      return this.moveToIndex(currentState, currentState.currentIndex);
    } else {
      return dragOffsetPercent > 0
        ? this.moveNext(currentState)
        : this.movePrev(currentState);
    }
  }

  /**
   * 통합 드래그 핸들러: 조건에 따라 드래그 모드 자동 선택
   *
   * 규칙:
   * - autoPlay = true: 항상 FreeDrag (infinite는 강제로 true)
   * - autoPlay = false && slidesPerView = 1: SnapDrag
   * - autoPlay = false && slidesPerView >= 2: FreeDrag
   */
  handleDragEnd(
    currentState: CarouselState,
    dragOffsetPercent: number,
    options: {
      isAutoPlay?: boolean;
      snapThreshold?: number;
    } = {},
  ): CarouselState {
    const { isAutoPlay = false, snapThreshold } = options;
    const { slidesPerView } = this.config;

    if (isAutoPlay || slidesPerView >= 2) {
      return this.handleFreeDrag(currentState, dragOffsetPercent);
    } else {
      return this.handleSnapDrag(
        currentState,
        dragOffsetPercent,
        snapThreshold,
      );
    }
  }
}
