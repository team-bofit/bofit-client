export type StatusType = '충분' | '부족' | '강력';
export type ChipColorType = 'primary600' | 'bofitOrange' | 'error' | 'gray800';

export interface Image {
  imageId?: number;
  imageUrl?: string;
}

export const STATUS_COLOR_MAP: Record<StatusType, ChipColorType> = {
  충분: 'primary600',
  부족: 'bofitOrange',
  강력: 'error',
};
