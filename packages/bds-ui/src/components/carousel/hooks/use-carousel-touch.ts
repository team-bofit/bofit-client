import { PointerEvent, useCallback, useState } from 'react';

interface UseCarouselDragProps {
  onSmartDragEnd?: (dragOffset: number) => void;
  pauseOnHover: boolean;
}

interface UseCarouselDragReturn {
  isHovered: boolean;
  isDragging: boolean;
  dragOffset: number;
  handlePointerDown: (e: PointerEvent<Element>) => void;
  handlePointerMove: (e: PointerEvent<Element>) => void;
  handlePointerUp: (e: PointerEvent<Element>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * 캐러셀 터치 및 드래그 훅
 * Pointer Events를 사용하여 터치와 마우스를 통합 처리
 * 드래그 시작, 이동, 종료 이벤트 핸들러 제공
 * @param pauseOnHover 호버 시 자동 재생 일시정지 여부
 * @param onSmartDragEnd 드래그 종료 시 가장 가까운 인덱스로 스냅하는 콜백
 *
 */
export const useCarouselTouch = ({
  pauseOnHover,
  onSmartDragEnd,
}: UseCarouselDragProps): UseCarouselDragReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  /** 누를 때 시작 위치 저장 */
  const handlePointerDown = useCallback((e: PointerEvent<Element>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    setIsHovered(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

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
      setIsHovered(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [isDragging, startX, onSmartDragEnd, dragOffset],
  );

  /** 호버 상태 관리 */
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover]);

  return {
    isHovered,
    isDragging,
    dragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEnter,
    handleMouseLeave,
  };
};
