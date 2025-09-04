const Auth = "/auth";

export const ROUTE = {
  Root: "/",
  Home: `${Auth}/home`,
  ProdDetail: (id: number | string) => `${Auth}/product-detail/${id}`,
  ProdDetailPath: `${Auth}/product-detail/:id`,
  Cart: `${Auth}/cart`,
  Buy: `${Auth}/buy`,
  User : `${Auth}/user`,
} as const;
