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
  const cycleWidth = totalItems * slideWidthPercent; // 1회전의 % 너비 (예: 5개 * 20% = 100%)

  return useMemo(() => {
    // slidesPerView가 'auto'일 때는 flex 레이아웃 사용
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
      // 무한 스크롤이 아닐 때는 가상화 로직을 사용하지 않음
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
    // 빈 데이터 처리
    if (totalItems === 0) {
      return { cycleWidth, start: 0, displaySlides: [] as VirtualItem<T>[] };
    }

    // 현재 보이는 화면의 시작 인덱스 (무한정 증가 가능)
    const startFloat = offsetPercent / slideWidthPercent; // 슬라이드 단위로 몇칸인지 계산
    const startIndex = Math.floor(startFloat - overscan); // 앞쪽 여유 만큼 당겨서 렌더 시작 인덱스 정함.

    // 렌더할 항목 수 (화면에 보이는 수 + 앞뒤 오버스캔)
    const renderCount = slidesPerView + overscan * 2;

    // 가상 아이템 생성
    const displaySlides: VirtualItem<T>[] = Array.from({
      length: renderCount,
    }).map((_, i) => {
      const absoluteIndex = startIndex + i; // 절대 인덱스 (무한정 증가)
      const dataIndex = mod(absoluteIndex, totalItems); // 실제 데이터 배열을 순환하도록 계산 (0..totalItems-1)
      const leftPercent = absoluteIndex * slideWidthPercent; // 요소 배치 위치 => 절대 위치로 계산

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
