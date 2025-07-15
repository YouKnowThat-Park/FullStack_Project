export interface User {
  id: number;
  email: string;
  name: string;
  phone_number: string;
  birth_date: string;
}

export interface PaginatedUserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}
