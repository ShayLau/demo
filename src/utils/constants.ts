export const PRODUCT_CATEGORIES = [
  '电子产品',
  '服装',
  '图书',
  '家居园艺',
  '运动',
  '美妆',
  '玩具',
  '汽车用品',
] as const;

export const ORDER_STATUS = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  delivered: '已送达',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_CURRENT_PAGE: 1,
};

export const SORT_OPTIONS = [
  { label: '价格: 从低到高', value: 'price_asc' },
  { label: '价格: 从高到低', value: 'price_desc' },
  { label: '最新上架', value: 'date_desc' },
  { label: '最受欢迎', value: 'popularity' },
] as const;