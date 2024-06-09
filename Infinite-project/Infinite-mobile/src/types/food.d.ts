interface IFood {
  id?: number;
  image: string | undefined;
  name: string;
  price: number;
  like: boolean;
  rate: string;
  shortDescription: string;
  description: string;
}

interface IFoodCategory {
  id?: number;
  image: string | undefined;
  name: string;
}
