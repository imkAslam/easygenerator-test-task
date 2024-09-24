interface ApiData {
  user_counts: string;
  mosque_counts: string;
  active_users: string;
  inactive_users: string;
}
export interface IStatsApiResponse {
  statusCode: number;
  message: string;
  data: ApiData;
}
