interface ICart {
  id?: number;
  image: string | undefined;
  food: IFood[] | [];
  quantity: number;
  totalAmount: number;
}
