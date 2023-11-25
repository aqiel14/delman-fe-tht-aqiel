export interface ApiType {
  message: string;
  data: UserType[] | undefined;
}

export interface UserType {
  active_device_mac: string;
  age: number;
  app_version: string;
  avatar: string;
  bitcoin_address: string;
  country_name: string;
  device_id: string;
  email: string;
  favorite_animal: string;
  favorite_music: string;
  favorite_quote: string;
  hmac_secret: string;
  id: string;
  invoice_email_address: string;
  job: string;
  latitude: string;
  locale: string;
  login_ip: string;
  longitude: string;
  material: string;
  name: string;
  notes: string;
  phone_number: string;
  primary_color: string;
  referral_id: string;
  secondary_color: string;
  shipping_address: string;
  timezone: string;
  twitter_username: string;
  zip_code: string;
}

export interface SaleType {
  consumen_name: string;
  id: number;
  item_id: number;
  name: string;
  qty: number;
  sales_id: string;
  transaction_date: string;
}

export interface CreateUserInputType {
  name: string;
  email: string;
}
