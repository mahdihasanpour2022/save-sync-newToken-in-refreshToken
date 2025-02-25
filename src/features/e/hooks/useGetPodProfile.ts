"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRQFetcher } from "@/hooks/useRQFetcher";
import { ApiRoutes } from "@/features/e/constants/ApiRoutes";
import { CommonRes } from "@/interfaces/commonRes";
import { useEffect } from "react";
import { PodProfileResponse } from "@/features/e/interfaces/PodProfileResponse";

const useGetPodProfile = () => {
  const podProfile = useRQFetcher<CommonRes<any, PodProfileResponse>>({
    url: ApiRoutes.podProfile,
    // baseURL: ,
    queryKey: [`podProfile`],
  });

  // console.log("kollllle data", podProfile);
  const { data, isError } = podProfile;
  useEffect(() => {
    if (isError) {
      console.log(data);
    }
  }, [isError, data]);

  return podProfile;
};

export default useGetPodProfile;
