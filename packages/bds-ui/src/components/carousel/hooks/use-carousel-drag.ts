import { PointerEvent, useCallback, useState } from 'react';

interface UseCarouselDragProps {
  onNext: () => void;
  onPrev: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onSmartDragEnd?: (dragOffset: number) => void;
}

interface UseCarouselDragReturn {
  isDragging: boolean;
  dragOffset: number;
  handlePointerDown: (e: PointerEvent<Element>) => void;
  handlePointerMove: (e: PointerEvent<Element>) => void;
  handlePointerUp: (e: PointerEvent<Element>) => void;
}

export const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * 캐러셀 드래그 훅
 * Pointer Events를 사용하여 터치와 마우스를 통합 처리
 * 드래그 시작, 이동, 종료 이벤트 핸들러 제공
 * @param onNext 다음 슬라이드 이동 콜백
 * @param onPrev 이전 슬라이드 이동 콜백
 * @param onDragStart 드래그 시작 콜백
 * @param onDragEnd 드래그 종료 콜백
 *
 */
export const useCarouselDrag = ({
  onNext,
  onPrev,
  onDragStart,
  onDragEnd,
  onSmartDragEnd,
}: UseCarouselDragProps): UseCarouselDragReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  /** 누를 때 시작 위치 저장 */
  const handlePointerDown = useCallback(
    (e: PointerEvent<Element>) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setDragOffset(0);
      onDragStart?.();
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [onDragStart],
  );

  /** 움직일 때 드래그 오프셋 계산 */
  const handlePointerMove = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging) {
        return;
      }

      const diff = startX - e.clientX;
      const containerWidth = e.currentTarget.clientWidth;
      const dragOffsetPercent = (diff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX],
  );

  /** 뗄 때 드래그 거리 기준으로 다음/이전 이동 */
  const handlePointerUp = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging) {
        return;
      }

      const diffPx = startX - e.clientX;
      const containerWidth = e.currentTarget.clientWidth || 1;
      const dragOffsetPercent = (diffPx / containerWidth) * 100;

      // 스마트 드래그: 드래그가 끝난 지점 기준으로 항상 가장 가까운 인덱스로 스냅
      onSmartDragEnd?.(dragOffsetPercent);

      setIsDragging(false);
      setDragOffset(0);
      onDragEnd?.();
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [isDragging, startX, onNext, onPrev, onDragEnd, onSmartDragEnd, dragOffset],
  );

  return {
    isDragging,
    dragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
