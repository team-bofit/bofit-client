import { useMemo } from 'react';

import { UseCarouselVirtualOptions, VirtualItem } from '../types/types';
import { mod } from './use-carousel-touch';

/**
 *  무한 캐러셀을 위한 가상화(virtualization) 훅
 *  화면에 당장 보여줄 슬라이드들만 렌더링하도록 합니다.
 *  스크롤로 오프셋이 무한히 커져도, 실제 데이터 인덱스는 mod 로 순환시켜 계속 반복 재생되는 효과를 냅니다.
 *
 * @param items 원본 데이터
 * @param slideWidthPercent 한 슬라이드의 너비(%) — 예: slidesPerView=1이면 보통 100, 2면 50
 * @param offsetPercent 현재 캐러셀의 왼쪽으로 이동한 오프셋(%) — 시간(rAF)이나 드래그로 계속 증가/감소 가능
 * @param overscan 화면 앞뒤로 미리 렌더할 슬라이드 수(기본 2)
 * @param slidesPerView 한 화면에 보이는 슬라이드 개수
 * @param infinite 무한 스크롤 여부
 * @returns
 *  cycleWidth: 한 사이클의 전체 너비(%),
 *  start: 현재 시작 인덱스,
 *  virtualItems: 렌더할 가상 아이템들
 */
export function useCarouselVirtual<T>({
  items,
  slideWidthPercent,
  offsetPercent,
  overscan = 2,
  slidesPerView,
  infinite,
}: UseCarouselVirtualOptions<T>) {
  const totalItems = items.length;
  const cycleWidth = totalItems * slideWidthPercent;

  return useMemo(() => {
    if (slidesPerView === 'auto') {
      const displaySlides: VirtualItem<T>[] = items.map((item, index) => {
        return {
          key: `${index}`,
          index,
          dataIndex: index,
          data: item,
          style: {
            flexShrink: 0,
            height: '100%',
            display: 'contents',
          },
        };
      });

      return { cycleWidth, start: 0, displaySlides };
    }

    if (!infinite) {
      const displaySlides: VirtualItem<T>[] = items.map((item, index) => {
        return {
          key: `${index}`,
          index,
          dataIndex: index,
          data: item,
          style: {
            height: '100%',
          },
        };
      });

      return { cycleWidth, start: 0, displaySlides };
    }
    if (totalItems === 0) {
      return { cycleWidth, start: 0, displaySlides: [] as VirtualItem<T>[] };
    }

    const startFloat = offsetPercent / slideWidthPercent;
    const startIndex = Math.floor(startFloat - overscan);

    const renderCount = slidesPerView + overscan * 2;

    const displaySlides: VirtualItem<T>[] = Array.from({
      length: renderCount,
    }).map((_, i) => {
      const absoluteIndex = startIndex + i;
      const dataIndex = mod(absoluteIndex, totalItems);
      const leftPercent = absoluteIndex * slideWidthPercent;

      return {
        key: `${absoluteIndex}-${dataIndex}`,
        index: absoluteIndex,
        dataIndex,
        data: items[dataIndex]!,
        style: {
          position: 'absolute',
          left: `${leftPercent}%`,
          top: 0,
          width: `${slideWidthPercent}%`,
          height: '100%',
        },
      };
    });

    return { cycleWidth, start: startIndex, displaySlides };
  }, [
    items,
    slideWidthPercent,
    offsetPercent,
    overscan,
    slidesPerView,
    totalItems,
    cycleWidth,
  ]);
}
