"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRQFetcher } from "@/hooks/useRQFetcher";
import { ApiRoutes } from "@/features/e/constants/ApiRoutes";
import { CommonRes } from "@/interfaces/commonRes";
import { useEffect } from "react";
import { FavoritesProductsResponse } from "@/features/e/interfaces/FavoritesProductsResponse";

const useGetFavoritesProducts = () => {
  const favoritesProducts = useRQFetcher<
    CommonRes<FavoritesProductsResponse[], any>
  >({
    url: `${ApiRoutes.favoritesProducts}?offset=1&size=10`,
    queryKey: [`favoritesProducts`],
  });

  const { data, isError } = favoritesProducts;
  useEffect(() => {
    if (isError) {
      console.log(data);
    }
  }, [isError, data]);

  return favoritesProducts;
};

export default useGetFavoritesProducts;
