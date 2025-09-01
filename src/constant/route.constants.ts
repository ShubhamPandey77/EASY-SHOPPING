const Auth = "/auth";

export const ROUTE = {
  Root: "/",
  Home: `${Auth}/home`,
  ProdDetail: (id: number | string) => `${Auth}/productdetail/${id}`,
  ProdDetailPath: `${Auth}/productdetail/:id`,
  Cart: `${Auth}/cart`,
  Buy: `${Auth}/buy`,
} as const;
