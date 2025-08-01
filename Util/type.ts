export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  Clerkid: string;
  role: Role;
  name: string;
  reviews?: Review[];
  bills?: Bill[];
  charts?: Chart[];
}

export interface UserCreateInput
  extends Omit<User, "reviews" | "bills" | "charts"> {}
export interface UserUpdateInput extends Partial<UserCreateInput> {}

export interface Product {
  id: number;
  name: string;
  category: Category;
  categoryId: number;
  price: number;
  description: string;
  typesChoose?: any; // Json type in TypeScript
  quantity: number;
  discount: number;
  reviews?: Review[];
  availableSizes?: ProductSize[];
  chartItems?: ChartProduct[];
}

export interface ProductCreateInput
  extends Omit<Product, "id" | "reviews" | "availableSizes" | "chartItems"> {
  availableSizes?: ProductSizeCreateInput[];
}
export interface createNewProduct {
  name: string;
  price: string;
  description: string;
  discount: string;
  sizeValues: string[];
  categoryName: string;
  images: string[];
  quantity: string;
}
export interface ProductUpdateInput extends Partial<ProductCreateInput> {}

export interface ProductSize {
  id: number;
  productId: number;
  product?: Product;
  size: number;
  quantity: number;
  price?: number;
}

export interface ProductSizeCreateInput
  extends Omit<ProductSize, "id" | "product"> {}
export interface ProductSizeUpdateInput
  extends Partial<ProductSizeCreateInput> {}

export interface Review {
  id: number;
  like: number;
  userId: string;
  user?: User;
  productId: number;
  product?: Product;
}

export interface ReviewCreateInput
  extends Omit<Review, "id" | "user" | "product"> {}
export interface ReviewUpdateInput extends Partial<ReviewCreateInput> {}

export interface Bill {
  id: number;
  userId: string;
  user?: User;
  charts?: Chart[];
}

export interface BillCreateInput extends Omit<Bill, "id" | "user" | "charts"> {}
export interface BillUpdateInput extends Partial<BillCreateInput> {}

export interface Chart {
  id: number;
  userId: string;
  userowner?: User;
  orderAmount: number;
  discount: number;
  totalPayment: number;
  billId?: number;
  bill?: Bill;
  products?: ChartProduct[];
}

export interface ChartCreateInput
  extends Omit<Chart, "id" | "userowner" | "bill" | "products"> {
  products?: ChartProductCreateInput[];
}
export interface ChartUpdateInput extends Partial<ChartCreateInput> {}

export interface ChartProduct {
  id: number;
  chartId: number;
  chart?: Chart;
  productId: number;
  product?: Product;
  quantity: number;
}

export interface ChartProductCreateInput
  extends Omit<ChartProduct, "id" | "chart" | "product"> {}
export interface ChartProductUpdateInput
  extends Partial<ChartProductCreateInput> {}

export interface Category {
  id: number | null;
  name: string;
  products?: Product[];
}

export interface CategoryCreateInput
  extends Omit<Category, "id" | "products"> {}
export interface CategoryUpdateInput extends Partial<CategoryCreateInput> {}

export interface BillDetail {
  id: number;
  Invoice: string;
  images: [];
  date: Date;
}
