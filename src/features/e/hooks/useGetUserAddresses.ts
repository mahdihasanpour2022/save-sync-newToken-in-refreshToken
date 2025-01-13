"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRQFetcher } from "@/hooks/useRQFetcher";
import { ApiRoutes } from "@/features/e/constants/ApiRoutes";
import { CommonRes } from "@/interfaces/commonRes";
import { useEffect } from "react";
import { UserAddresses } from "@/features/e/interfaces/UserAddresses";

const useGetUserAddresses = () => {
  const userAddresses = useRQFetcher<CommonRes<UserAddresses[], any>>({
    url: `${ApiRoutes.addresses}?offset=1&size=10`,
    queryKey: [`userAddresses`],
  });

  const { data, isError } = userAddresses;
  useEffect(() => {
    if (isError) {
      console.log(data);
    }
  }, [isError, data]);

  return userAddresses;
};

export default useGetUserAddresses;
