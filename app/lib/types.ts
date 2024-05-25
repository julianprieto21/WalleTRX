export type User = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};
export type Account = {
  id: string;
  user_id: string;
  name: string;
  currency: string;
  type: string;
  color: string;
};
export type Transaction = {
  id: string;
  user_id: string;
  account_id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  created_at: Date;
  category: string;
  transfer_id: string;
};
export type Category = {
  id: string;
  color: string;
};
export type UserConfig = {
  user_id: string;
  defaultCurrency: string;
  locale: string;
};
