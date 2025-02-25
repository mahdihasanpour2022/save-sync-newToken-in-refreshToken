export interface FavoritesProductsResponse {
  id: number;
  entityId: number;
  name: string;
  templateCode: string;
  productTypeUniqueId: string;
  productTypeName: string;
  preview: string;
  availableCount: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  fakePrice: number;
  numOfLikes: number;
  numOfFavorites: number;
  numOfComments: number;
  sellerId: number;
  sellerName: string;
}
