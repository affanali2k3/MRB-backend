export class UpdateUserPreferenceDto {
  state?: string;
  city?: string;
  minTimeAmount?: number;
  maxTimeAmount?: number;
  minCost?: number;
  maxCost?: number;
  clientType?: string;
  houseType?: string;
  userId: number;
}
