import { IImage } from './image.interface';

export interface IBook {
  title: string;
  author: string;
  description: string;
  price: number;
  isAvailable: boolean;
  images?: IImage[];
}
