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
    // totalItems: 전체 아이템 수 , slideWidth: 한 슬라이드의 너비 (%),
    // infinite: 무한 스크롤 여부, slidesPerView: 한 화면에 보이는 슬라이드 수
    const { totalItems, slideWidth, infinite, slidesPerView } = this.config;

    if (totalItems === 0) {
      return currentState;
    }

    let normalizedTargetIndex: number;
    let newOffset: number;
    // 무한 스크롤:
    if (infinite) {
      normalizedTargetIndex = mod(targetIndex, totalItems); // 타겟 인덱스 정규화
      const currentNormalizedIndex = mod(currentState.currentIndex, totalItems); // 현재 인덱스 정규화
      const diff = normalizedTargetIndex - currentNormalizedIndex; // 인덱스 차이

      const directDistance = Math.abs(diff); // 직선 거리
      const wrapDistance = totalItems - directDistance; // 한바뀌 도는 거리 (랩어라운드)

      // 더 짧은 경로 선택
      if (directDistance <= wrapDistance) {
        // 직선 경로가 더 짧으면
        newOffset = currentState.offset + diff * slideWidth; // 현재 offset + (변화량 * 슬라이드 폭)
      } else {
        // 랩어라운드 경로가 더 짧으면
        const direction =
          normalizedTargetIndex > currentNormalizedIndex ? -1 : 1; // 랩어라운드 방향 결정
        const indexDiff = direction * wrapDistance; // 랩어라운드 인덱스 변화량
        newOffset = currentState.offset + indexDiff * slideWidth;
      }
    } else {
      // 제한된 스크롤: 범위 내로 클램프
      normalizedTargetIndex = Math.max(
        0,
        Math.min(targetIndex, totalItems - slidesPerView), // 목표 인덱스를 [0, totalItems - slidesPerView] 범위로 제한
      );
      newOffset = normalizedTargetIndex * slideWidth;
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
    const { slideWidth, totalItems } = this.config;
    const rawIndex = Math.round(currentOffset / slideWidth); // (현재 offset / 슬라이드 폭) = 대략적인 인덱스(반올림)

    if (this.config.infinite) {
      return mod(rawIndex, totalItems);
    } else {
      return Math.max(
        0,
        Math.min(rawIndex, totalItems - this.config.slidesPerView), // rowIndex를 [0, totalItems - slidesPerView] 범위로 제한
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
   * 자유 드래그 모드: 드래그된 위치를 그대로 채택 (autoPlay 용)
   * 오프셋은 라운딩하지 않고, 인덱스만 표시용으로 계산
   */
  handleFreeDrag(
    currentState: CarouselState,
    dragOffsetPercent: number,
  ): CarouselState {
    const { totalItems, slideWidth, slidesPerView } = this.config;
    let newOffset = currentState.offset + dragOffsetPercent; // 드래그된 만큼 오프셋 변경

    // 유한 모드에서는 범위 제한
    if (!this.config.infinite) {
      const maxOffset = Math.max((totalItems - slidesPerView) * slideWidth, 0); // 최대 오프셋 = (총 아이템 - 화면에 보이는 수) * 슬라이드 폭
      newOffset = Math.min(Math.max(newOffset, 0), maxOffset); // 0 ~ maxOffset 사이로 클램프
    }

    // 인덱스는 표시용으로만 계산 (양수 정규화)
    const safeTotal = Math.max(totalItems, 1); // 0으로 나누는 것 방지₩
    const rawIndex =
      Math.floor((newOffset + slideWidth / 2) / slideWidth) % safeTotal; // 중앙 기준으로 가장 가까운 인덱스 계산
    const newIndex = totalItems > 0 ? (rawIndex + totalItems) % totalItems : 0; // 음수일 경우 양수로 변환

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
   * 통합 드래그 핸들러: 조건에 따라 드래그 모드 자동 선택
   *
   * 규칙:
   * - autoPlay = true: 항상 FreeDrag (infinite는 강제로 true)
   * - autoPlay = false && slidesPerView = 1: SnapDrag
   * - autoPlay = false && slidesPerView > 1: FreeDrag
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

    // autoPlay가 true이거나, autoPlay가 false이지만 slidesPerView > 1인 경우 FreeDrag
    if (isAutoPlay || slidesPerView > 1) {
      return this.handleFreeDrag(currentState, dragOffsetPercent);
    } else {
      // autoPlay = false && slidesPerView = 1인 경우 SnapDrag
      return this.handleSnapDrag(
        currentState,
        dragOffsetPercent,
        snapThreshold,
      );
    }
  }
}
