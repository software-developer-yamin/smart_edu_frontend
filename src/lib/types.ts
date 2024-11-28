export type IQueryResult<T> = {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type IQueryFilter = {
  sortBy: string;
  projectBy: string;
  limit: number;
  page: number;
  populate: string;
};

export type IErrorResponse = {
  code: number;
  message: string;
};
