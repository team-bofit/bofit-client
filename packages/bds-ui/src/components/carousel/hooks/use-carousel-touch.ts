import { PointerEvent, useCallback, useState } from 'react';

import { UseCarouselTouchProps, UseCarouselTouchReturn } from '../types/types';

export const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * 캐러셀 터치 및 드래그 훅
 * Pointer Events를 사용하여 터치와 마우스를 통합 처리
 * 드래그 시작, 이동, 종료 이벤트 핸들러 제공
 * CarouselController를 내부에서 활용하여 관심사 분리
 */

export const useCarouselTouch = ({
  controller,
  carouselState,
  pauseOnHover,
  autoPlay,
  infinite,
  onStateUpdate,
}: UseCarouselTouchProps): UseCarouselTouchReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [clickTarget, setClickTarget] = useState<EventTarget | null>(null);

  /** 누를 때 시작 위치 저장 */
  const handlePointerDown = useCallback((e: PointerEvent<Element>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    setHasMoved(false);
    setClickTarget(e.target);
    setIsHovered(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  /** 움직일 때 드래그 오프셋 계산 */
  const handlePointerMove = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging) {
        return;
      }

      const dragDiff = startX - e.clientX;
      const diff = Math.abs(dragDiff);

      if (diff > 10) {
        setHasMoved(true);
      }

      const containerWidth = e.currentTarget.clientWidth;
      const dragOffsetPercent = (dragDiff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX],
  );

  /** 뗄 때 드래그 거리 기준으로 컨트롤러를 통해 새로운 상태 계산
   * - 드래그 했는지 : true => 드래그 거리 기준으로 슬라이드 변경
   * - 드래그 안 했는지 : false => 클릭 이벤트로 간주하여 원래 타겟 클릭
   */
  const handlePointerUp = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging || !controller) {
        return;
      }
      if (hasMoved) {
        const diff = startX - e.clientX;
        const containerWidth = e.currentTarget.clientWidth || 1;
        const dragOffsetPercent = (diff / containerWidth) * 100;

        const newState = controller.handleDragEnd(
          carouselState,
          dragOffsetPercent,
          {
            isAutoPlay: autoPlay,
          },
        );

        onStateUpdate(newState);
      } else {
        if (clickTarget && clickTarget instanceof HTMLElement) {
          clickTarget.click();
        }
      }

      setIsDragging(false);
      setDragOffset(0);
      setHasMoved(false);
      setClickTarget(null);
      setIsHovered(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    },
    [
      isDragging,
      hasMoved,
      startX,
      clickTarget,
      controller,
      carouselState,
      autoPlay,
      infinite,
      onStateUpdate,
    ],
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
    hasMoved,
    dragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEnter,
    handleMouseLeave,
  };
};
