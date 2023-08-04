import { TStatus } from "./types";

export interface ISaleStage {
  id: number;
  name: string;
  enabled: TStatus;
  scotty_price_in_usd: string;
  hard_cap: string;
  claimed_scotty_amount: string;
  start_at: number;
  end_at: number;
}
