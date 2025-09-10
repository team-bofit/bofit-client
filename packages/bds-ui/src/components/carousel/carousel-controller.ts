import { mod } from './hooks/use-carousel-touch';

export interface CarouselControllerConfig {
  totalItems: number;
  slidesPerView: number;
  slideWidth: number;
  infinite: boolean;
}

export interface CarouselState {
  currentIndex: number;
  offset: number;
}

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
   * 설정 업데이트
   * 일부만 변경도 가능
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

    let normalizedIndex = targetIndex;
    let newOffset: number;

    if (infinite) {
      // 무한 스크롤: 인덱스를 정규화하고 최적 경로 계산
      normalizedIndex = mod(targetIndex, totalItems);

      // 현재 위치에서 목표까지의 최단 거리 계산
      const currentNormalizedIndex = mod(currentState.currentIndex, totalItems);
      const directDistance = Math.abs(normalizedIndex - currentNormalizedIndex);
      const wrapDistance = totalItems - directDistance;

      // 더 짧은 경로 선택
      if (directDistance <= wrapDistance) {
        // 직선 경로
        const indexDiff = normalizedIndex - currentNormalizedIndex;
        newOffset = currentState.offset + indexDiff * slideWidth;
      } else {
        // 랩어라운드 경로
        const direction = normalizedIndex > currentNormalizedIndex ? -1 : 1;
        const indexDiff = direction * wrapDistance;
        newOffset = currentState.offset + indexDiff * slideWidth;
      }
    } else {
      // 제한된 스크롤: 범위 내로 클램프
      normalizedIndex = Math.max(
        0,
        Math.min(targetIndex, totalItems - slidesPerView),
      );
      newOffset = normalizedIndex * slideWidth;
    }

    return {
      currentIndex: normalizedIndex,
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
    const { slideWidth, totalItems } = this.config;
    const rawIndex = Math.round(currentOffset / slideWidth);

    if (this.config.infinite) {
      return mod(rawIndex, totalItems);
    } else {
      return Math.max(
        0,
        Math.min(rawIndex, totalItems - this.config.slidesPerView),
      );
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
    return (
      currentState.currentIndex <
      this.config.totalItems - this.config.slidesPerView
    );
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
   * 자유 드래그 모드: 드래그된 위치를 그대로 채택 (autoPlay용)
   * 오프셋은 라운딩하지 않고, 인덱스만 표시용으로 계산
   */
  handleFreeDrag(
    currentState: CarouselState,
    dragOffsetPercent: number,
  ): CarouselState {
    const { totalItems, slideWidth, slidesPerView } = this.config;
    let newOffset = currentState.offset + dragOffsetPercent;

    // 유한 모드에서는 범위 제한
    if (!this.config.infinite) {
      const maxOffset = Math.max((totalItems - slidesPerView) * slideWidth, 0);
      newOffset = Math.min(Math.max(newOffset, 0), maxOffset);
    }

    // 인덱스는 표시용으로만 계산 (양수 정규화)
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
    const dragThreshold = threshold ?? slideWidth / 4; // 기본값: 슬라이드 폭의 1/4
    const magnitude = Math.abs(dragOffsetPercent);

    if (magnitude < dragThreshold) {
      // 임계값 미만이면 제자리 스냅
      return this.moveToIndex(currentState, currentState.currentIndex);
    } else {
      // 임계값 이상이면 방향에 따라 ±1칸 이동
      return dragOffsetPercent > 0
        ? this.moveNext(currentState)
        : this.movePrev(currentState);
    }
  }

  /**
   * 통합 드래그 핸들러: 모드에 따라 자동 선택
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

    if (isAutoPlay && this.config.infinite) {
      // AutoPlay + Infinite: 자유 드래그 모드
      return this.handleFreeDrag(currentState, dragOffsetPercent);
    } else {
      // 일반 모드: 스냅 드래그 모드
      return this.handleSnapDrag(
        currentState,
        dragOffsetPercent,
        snapThreshold,
      );
    }
  }
}
