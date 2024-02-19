export interface IInventoryModel {
  id: string,
  lot: string;
  price: number;
  quantity: number;
  validity: string;
  productId: string;
  productName: string
}

export interface IAddInventoryBody {
  lot: string;
  price: number;
  quantity: number;
  validity: string;
  productId: string;
}

export interface IEditInventoryBody {
  lot: string,
  price: number,
  quantity: number,
  validity: string
}