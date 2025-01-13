"use client";
import useGetPodProfile from "@/features/e/hooks/useGetPodProfile";
import useGetUserAddresses from "@/features/e/hooks/useGetUserAddresses";
import useGetFavoritesProducts from "@/features/e/hooks/useGetFavoritesProducts";

const Ecmp = () => {
  const { data: podProfileData } = useGetPodProfile();
  console.log("podProfileData :", podProfileData);

  const { data: userAddressesData } = useGetUserAddresses();
  console.log("userAddressesData :", userAddressesData);
  
  
  const { data: favoritesProducts } =useGetFavoritesProducts()
  console.log("favoritesProducts :", favoritesProducts);

  return (
    <div className="flex flex-col gap-4 w-full h-screen py-32 items-center">
      {podProfileData && <p>{podProfileData?.singleResult.name}</p>}
      {userAddressesData && (
        <p>{userAddressesData.result?.[0].simpleAddress}</p>
      )}
      {favoritesProducts && (
        <p>{!favoritesProducts.hasError && 'success_200'}</p>
      )}
    </div>
  );
};

export default Ecmp;
