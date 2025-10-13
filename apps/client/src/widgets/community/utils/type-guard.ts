import { components } from '@shared/types/schema';

/**
 * 이미지 객체의 유효성을 검사하는 타입 가드 함수입니다.
 *
 * API 스키마에서 `imageId`와 `imageUrl`은 `undefined`일 수 있도록 정의되어 있습니다.
 * 이로 인해 실제로 이미지가 존재하지 않는 경우에도 `|| []` 같은 불필요한 방어 로직이 들어가거나,
 * 이미지가 존재하지 않아야 할 상황에서 잘못된 값이 렌더링되는 문제가 발생했습니다.
 *
 * 이 타입 가드는 `imageId`와 `imageUrl`이 모두 올바르게 존재하는 경우만을 통과시켜,
 * `undefined` 가능성을 제거하고 코드 전반에서 보다 명확하고 안전하게 이미지 데이터를 다룰 수 있도록 합니다.
 *
 * @param image - 검사할 이미지 객체
 * @returns `image`가 유효한 이미지(`imageId`와 `imageUrl`을 모두 가진 경우)라면 `true`
 */
export function isValidImage(
  image: components['schemas']['PostDetailImageResponse'],
): image is { imageId: number; imageUrl: string } {
  return (
    typeof image.imageId === 'number' &&
    typeof image.imageUrl === 'string' &&
    image.imageUrl.trim().length > 0
  );
}
