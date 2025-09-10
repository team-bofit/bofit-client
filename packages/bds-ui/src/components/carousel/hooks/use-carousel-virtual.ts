import { useMemo } from 'react';

import { UseCarouselVirtualOptions, VirtualItem } from '../types/types';
import { mod } from './use-carousel-touch';

/**
 *  무한 캐러셀을 위한 가상화(virtualization) 훅
 *  화면에 당장 보여줄 슬라이드들만 렌더링하도록 합니다.
 *  스크롤로 오프셋이 무한히 커져도, 실제 데이터 인덱스는 mod 로 순환시켜 계속 반복 재생되는 효과를 냅니다.
 *
 * @param items 원본 데이터
 * @param slideWidthPercent 한 슬라이드의 너비(%)
 * @param offsetPercent 현재 캐러셀의 스크롤 오프셋(%)
 * @param overscan 앞뒤로 추가로 렌더할 여유 슬라이드 수(기본 2)
 * @param slidesPerView 한 화면에 보이는 슬라이드 개수
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
}: UseCarouselVirtualOptions<T>) {
  const totalItems = items.length;
  const cycleWidth = totalItems * slideWidthPercent; // 한 사이클 너비

  return useMemo(() => {
    // 빈 데이터 처리
    if (totalItems === 0) {
      return { cycleWidth, start: 0, displaySlides: [] as VirtualItem<T>[] };
    }

    // 현재 보이는 화면의 시작 인덱스 (무한정 증가 가능)
    const startFloat = offsetPercent / slideWidthPercent; // 슬라이드 단위로 몇칸인지 계산
    // 화면 좌측에 오게 될 첫 아이템의 절대 인덱스 (앞쪽 오버스캔만큼 더 앞에서 시작)
    const startIndex = Math.floor(startFloat) - overscan;
    // 트랙 내에서 현재 오프셋의 소수 부분만큼을 flex spacer로 보정
    const spacerWidthPercent =
      ((offsetPercent % slideWidthPercent) + slideWidthPercent) %
      slideWidthPercent;

    // 렌더할 항목 수 (화면에 보이는 수 + 앞뒤 오버스캔)
    const renderCount = slidesPerView + overscan * 2;

    // 가상 아이템 생성 (flex 흐름, 선행 spacer로 보정)
    const displaySlides: VirtualItem<T>[] = Array.from({
      length: renderCount,
    }).map((_, i) => {
      const absoluteIndex = startIndex + i; // 절대 인덱스 (무한정 증가)
      const dataIndex = mod(absoluteIndex, totalItems); // 실제 데이터 배열을 순환하도록 계산 (0..totalItems-1)

      return {
        key: `${absoluteIndex}-${dataIndex}`,
        index: absoluteIndex,
        dataIndex,
        data: items[dataIndex]!,
        style: {
          flex: '0 0 auto',
          width: `${slideWidthPercent}%`,
          height: '100%',
        },
      };
    });

    return { cycleWidth, start: startIndex, displaySlides, spacerWidthPercent };
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
