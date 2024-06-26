export interface IInventoryModel {
  id: string;
  lot: string;
  price: number;
  quantity: number;
  validity: string;
  productId: string;
  productName: string;
}

export interface IAddInventoryBody {
  lot: string;
  price: number;
  quantity: number;
  validity: string;
  productId: string;
}

export interface IEditInventoryBody {
  lot: string;
  price: number | string;
  quantity: number;
  validity: string;
}

export interface IActionInventoryBody {
  customerPaymentType: string;
  customerName: string;
  quantity: number;
  type: "input" | "output";
  price: number;
}
