"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRQFetcher } from "@/hooks/useRQFetcher";
import { ApiRoutes } from "@/features/A/constants/ApiRoutes";
import { CommonRes } from "@/interfaces/commonRes";
import { PodProfileResponse } from "@/features/A/interfaces/PodProfileResponse";
import { useEffect } from "react";

const useGetPodProfile = () => {
  const podProfile = useRQFetcher<
    CommonRes<PodProfileResponse[]>,
    CommonRes<any>
  >({
    url: ApiRoutes.podProfile,
    // baseURL: ,
    queryKey: [`podProfile`],
  });

  const { data, isError } = podProfile;
  useEffect(() => {
    if (isError) {
      console.log(data);
    }
  }, [isError, data]);

  return podProfile;
};

export default useGetPodProfile;
