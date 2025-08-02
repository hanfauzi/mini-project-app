export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PageableRespones<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PagiantionQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}
