export type Pagination = {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};

export type PaginatedResult<T> = {
  items: T[];
  metadata: Pagination;
};