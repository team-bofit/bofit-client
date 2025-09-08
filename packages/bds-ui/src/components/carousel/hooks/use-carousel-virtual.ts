import { useMemo } from 'react';

import { mod } from './use-action-reducer';

type VirtualItem<T> = {
  key: string | number;
  index: number; // 실제 배치된 위치 인덱스 (무한정 증가 가능)
  dataIndex: number; // 실제 데이터 인덱스(0..totalItems-1)
  style: React.CSSProperties; // absolute 배치용 스타일
  data: T;
};

interface UseCarouselVirtualOptions<T> {
  items: T[]; // 원본 데이터(slideItems)
  slideWidthPct: number; // 100 / slidesPerView
  offsetPct: number; // 현재 오프셋(%) - 무한정 증가
  overscan?: number; // 앞/뒤 여유
  slidesPerView: number;
}

/**
 *  무한 캐러셀을 위한 가상화(virtualization) 훅
 *  화면에 당장 보여줄 슬라이드들만 렌더링하도록 합니다.
 *  스크롤로 오프셋이 무한히 커져도, 실제 데이터 인덱스는 mod 로 순환시켜 계속 반복 재생되는 효과를 냅니다.
 *
 * @param items 원본 데이터
 * @param slideWidthPct 한 슬라이드의 너비(%)
 * @param offsetPct 현재 캐러셀의 스크롤 오프셋(%)
 * @param overscan 앞뒤로 추가로 렌더할 여유 슬라이드 수(기본 2)
 * @param slidesPerView 한 화면에 보이는 슬라이드 개수
 * @returns
 *  cycleWidth: 한 사이클의 전체 너비(%),
 *  start: 현재 시작 인덱스,
 *  virtualItems: 렌더할 가상 아이템들
 */
export function useCarouselVirtual<T>({
  items,
  slideWidthPct,
  offsetPct,
  overscan = 2,
  slidesPerView,
}: UseCarouselVirtualOptions<T>) {
  const totalItems = items.length;
  const cycleWidth = totalItems * slideWidthPct; // 한 사이클 너비

  return useMemo(() => {
    // 빈 데이터 처리
    if (totalItems === 0) {
      return { cycleWidth, start: 0, virtualItems: [] as VirtualItem<T>[] };
    }

    // 현재 보이는 화면의 시작 인덱스 (무한정 증가 가능)
    const startFloat = offsetPct / slideWidthPct; // 슬라이드 단위로 몇칸인지 계산
    const startIndex = Math.floor(startFloat - overscan); // 앞쪽 여유 만큼 당겨서 렌더 시작 인덱스 정함.

    // 렌더할 항목 수 (화면에 보이는 수 + 앞뒤 오버스캔)
    const renderCount = slidesPerView + overscan * 2;

    // 가상 아이템 생성
    const virtualItems: VirtualItem<T>[] = Array.from({
      length: renderCount,
    }).map((_, i) => {
      const absoluteIndex = startIndex + i; // 절대 인덱스 (무한정 증가)
      const dataIndex = mod(absoluteIndex, totalItems); // 실제 데이터 배열을 순환하도록 계산 (0..totalItems-1)
      const leftPercent = absoluteIndex * slideWidthPct; // 요소 배치 위치 => 절대 위치로 계산

      return {
        key: `${absoluteIndex}-${dataIndex}`,
        index: absoluteIndex,
        dataIndex,
        data: items[dataIndex]!,
        style: {
          position: 'absolute',
          left: `${leftPercent}%`,
          top: 0,
          width: `${slideWidthPct}%`,
          height: '100%',
        },
      };
    });

    return { cycleWidth, start: startIndex, virtualItems };
  }, [
    items,
    slideWidthPct,
    offsetPct,
    overscan,
    slidesPerView,
    totalItems,
    cycleWidth,
  ]);
}
