export interface PaginatedResponse<T> {
  items: T[]; // List of items returned for the current page
  totalItems: number; // Total number of items available
  totalPages: number; // Total number of pages
  currentPage: number; // Current page number
}

export {};
