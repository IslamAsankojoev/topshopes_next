import { IProduct } from './product.types';

export interface IShop {
  id: string;
  name: string;
  slug: string;
  email: string;
  address: string;
  verified: boolean;
  phone: string;
  cover_picture: string;
  profile_picture: string;
  socialLinks: ILinks;
  products: IProduct[];
}

export interface ILinks {
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
}
