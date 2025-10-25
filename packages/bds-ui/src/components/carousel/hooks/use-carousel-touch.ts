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
  onStateUpdate,
}: UseCarouselTouchProps): UseCarouselTouchReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [clickTarget, setClickTarget] = useState<EventTarget | null>(null);

  /** 누를 때 시작 위치 저장 */
  const handlePointerDown = useCallback(
    (e: PointerEvent<Element>) => {
      if (e.pointerType === 'touch') {
        e.preventDefault();
      }

      setIsDragging(true);
      setStartX(e.clientX);
      setDragOffset(0);

      if (!autoPlay) {
        setHasMoved(false);
        setClickTarget(e.target);
      }

      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [autoPlay],
  );

  /** 움직일 때 드래그 오프셋 계산 */
  const handlePointerMove = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging) {
        return;
      }

      if (e.pointerType === 'touch') {
        e.preventDefault();
      }

      const dragDiff = startX - e.clientX;
      const diff = Math.abs(dragDiff);

      if (!autoPlay && diff > 10) {
        setHasMoved(true);
      }

      const containerWidth = e.currentTarget.clientWidth;
      const dragOffsetPercent = (dragDiff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX, autoPlay],
  );

  /** 뗄 때 드래그 거리 기준으로 컨트롤러를 통해 새로운 상태 계산
   * - autoPlay=false: 드래그 여부에 따라 슬라이드 변경 or 클릭 이벤트 처리
   * - autoPlay=true: 드래그 후 RAF 재개를 위해 상태 업데이트
   */

  const handlePointerUp = useCallback(
    (e: PointerEvent<Element>) => {
      if (!isDragging || !controller) {
        return;
      }

      const diff = startX - e.clientX;
      const containerWidth = e.currentTarget.clientWidth || 1;
      const dragOffsetPercent = (diff / containerWidth) * 100;

      if (autoPlay) {
        const newState = controller.handleDragEnd(
          carouselState,
          dragOffsetPercent,
          {
            isAutoPlay: true,
          },
        );

        onStateUpdate(newState);
      } else {
        if (hasMoved) {
          const newState = controller.handleDragEnd(
            carouselState,
            dragOffsetPercent,
            {
              isAutoPlay: false,
            },
          );

          onStateUpdate(newState);
        } else {
          if (clickTarget && clickTarget instanceof HTMLElement) {
            clickTarget.click();
          }
        }
      }

      setIsDragging(false);
      setDragOffset(0);

      if (!autoPlay) {
        setHasMoved(false);
        setClickTarget(null);
      }

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
      onStateUpdate,
    ],
  );

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
