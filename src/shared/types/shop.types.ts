import { IProduct } from './product.types';

export interface IShop {
  id: string;
  name: string;
  slug: string;
  email: string;
  address: string;
  verified: boolean;
  phone: string;
  coverPicture: string;
  profilePicture: string;
  socialLinks: ILinks;
  products: IProduct[];
}

export interface ILinks {
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
}
