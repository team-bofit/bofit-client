export type CarouselState = {
  currentIndex: number;
  offset: number;
  isHovered: boolean;
};

export type CarouselAction =
  | {
      type: 'NEXT';
      totalItems: number;
      slidesPerView: number;
      slideWidth: number;
      infinite: boolean;
    }
  | {
      type: 'PREV';
      totalItems: number;
      slidesPerView: number;
      slideWidth: number;
      infinite: boolean;
    }
  | { type: 'GOTO'; index: number; slideWidth: number }
  | { type: 'SET_INDEX'; index: number }
  | { type: 'SET_OFFSET'; offset: number }
  | { type: 'HOVER'; value: boolean }
  | { type: 'AUTOPLAY_SET'; offset: number; index: number }
  | { type: 'WRAP_RESET'; offset: number; index: number };

export function reducer(
  state: CarouselState,
  action: CarouselAction,
): CarouselState {
  switch (action.type) {
    case 'NEXT': {
      if (action.infinite) {
        // 🔥 무한 스크롤: 오프셋은 계속 증가, currentIndex만 순환
        const currentOffset = state.offset + action.slideWidth;
        const currentSlideIndex = Math.floor(
          (currentOffset + action.slideWidth / 2) / action.slideWidth,
        );
        return {
          ...state,
          currentIndex: mod(currentSlideIndex, action.totalItems),
          offset: currentOffset,
        };
      } else {
        const nextIdx = Math.min(
          state.currentIndex + 1,
          action.totalItems - action.slidesPerView,
        );
        return {
          ...state,
          currentIndex: nextIdx,
          offset: nextIdx * action.slideWidth,
        };
      }
    }
    case 'PREV': {
      if (action.infinite) {
        // 🔥 무한 스크롤: 오프셋은 계속 감소, currentIndex만 순환
        const currentOffset = state.offset - action.slideWidth;
        const currentSlideIndex = Math.floor(
          (currentOffset + action.slideWidth / 2) / action.slideWidth,
        );
        return {
          ...state,
          currentIndex: mod(currentSlideIndex, action.totalItems),
          offset: currentOffset,
        };
      } else {
        const nextIdx = Math.max(state.currentIndex - 1, 0);
        return {
          ...state,
          currentIndex: nextIdx,
          offset: nextIdx * action.slideWidth,
        };
      }
    }
    case 'GOTO':
      return {
        ...state,
        currentIndex: action.index,
        offset: action.index * action.slideWidth,
      };
    case 'SET_INDEX':
      return { ...state, currentIndex: action.index };
    case 'SET_OFFSET':
      return { ...state, offset: action.offset };
    case 'HOVER':
      return { ...state, isHovered: action.value };
    case 'AUTOPLAY_SET':
      return { ...state, offset: action.offset, currentIndex: action.index };
    case 'WRAP_RESET':
      return { ...state, offset: action.offset, currentIndex: action.index };
    default:
      return state;
  }
}

export const mod = (n: number, m: number) => ((n % m) + m) % m;
