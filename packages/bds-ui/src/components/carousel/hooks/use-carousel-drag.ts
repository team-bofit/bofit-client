import {
  MouseEvent,
  MutableRefObject,
  TouchEvent,
  useCallback,
  useState,
} from 'react';

interface UseCarouselDragProps {
  onNext: () => void;
  onPrev: () => void;
  slidesPerView: number;
  totalItems: number;
  offsetRef: MutableRefObject<number>;
  setOffset: (offset: number) => void;
  setCurrentIndex: (index: number) => void;
  setIsHovered: (hovered: boolean) => void;
}

interface UseCarouselDragReturn {
  isDragging: boolean;
  dragOffset: number;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: () => void;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
}

export const useCarouselDrag = ({
  onNext,
  onPrev,
  slidesPerView,
  totalItems,
  offsetRef,
  setOffset,
  setCurrentIndex,
  setIsHovered,
}: UseCarouselDragProps): UseCarouselDragReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const slideWidth = 100 / slidesPerView;
  const threshold = 50; // 드래그 임계값

  // 드래그 시작 처리
  const startDrag = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setStartX(clientX);
      setCurrentX(clientX);
      setDragOffset(0);
      setIsHovered(true); // 드래그 중에는 자동재생 일시정지
    },
    [setIsHovered],
  );

  // 드래그 중 처리
  const updateDrag = useCallback(
    (clientX: number, containerWidth: number) => {
      if (!isDragging) {
        return;
      }
      setCurrentX(clientX);

      // 드래그 중 실시간 오프셋 업데이트
      const diff = startX - clientX;
      const dragOffsetPercent = (diff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX],
  );

  // 드래그 종료 처리
  const endDrag = useCallback(() => {
    if (!isDragging) {
      return;
    }

    const diff = startX - currentX;

    if (Math.abs(diff) > threshold) {
      // 임계값을 넘으면 다음/이전 슬라이드로 이동
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    } else {
      // 임계값에 도달하지 않으면 현재 드래그된 위치에서 가장 가까운 슬라이드로 이동
      const currentOffset = offsetRef.current + dragOffset;
      const nearestSlideIndex = Math.round(currentOffset / slideWidth);
      const targetOffset = nearestSlideIndex * slideWidth;

      setOffset(targetOffset);
      offsetRef.current = targetOffset;
      // 🔥 무한 스크롤에서는 currentIndex도 연속적으로 증가
      const normalizedIndex = nearestSlideIndex % totalItems;
      const positiveIndex =
        normalizedIndex < 0 ? normalizedIndex + totalItems : normalizedIndex;
      setCurrentIndex(positiveIndex);
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsHovered(false); // 드래그 종료 시 자동재생 재개
  }, [
    isDragging,
    startX,
    currentX,
    onNext,
    onPrev,
    dragOffset,
    slideWidth,
    offsetRef,
    setOffset,
    setCurrentIndex,
    totalItems,
    setIsHovered,
  ]);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      startDrag(e.touches[0]?.clientX || 0);
    },
    [startDrag],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const containerWidth = e.currentTarget.clientWidth;
      updateDrag(e.touches[0]?.clientX || 0, containerWidth);
    },
    [updateDrag],
  );

  const handleTouchEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      startDrag(e.clientX);
    },
    [startDrag],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const containerWidth = e.currentTarget.clientWidth;
      updateDrag(e.clientX, containerWidth);
    },
    [updateDrag],
  );

  const handleMouseUp = useCallback(() => {
    endDrag();
  }, [endDrag]);

  return {
    isDragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
