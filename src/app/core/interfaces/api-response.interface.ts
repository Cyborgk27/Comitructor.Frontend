export interface ApiResponse<T> {
  success?: boolean;
  message?: string | null;
  data?: any | null;
  timestamp?: string;
}
