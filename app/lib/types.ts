export type User = {
  user_id: string;
  name: string;
  email: string;
};
export type Wallet = {
  id: string;
  user_id: string;
  created_at: Date;
};
export type Account = {
  id: string;
  wallet_id: string;
  name: string;
  currency: string;
  type: "normal" | "cripto";
  created_at: Date;
  updated_at: Date;
};
export type Transaction = {
  id: string;
  wallet_id: string;
  account_id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  created_at: Date;
  category: string;
};
