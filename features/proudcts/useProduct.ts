import {useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import {fetchProductById} from "@/services/apiProducts";
import {useAuth} from "@clerk/clerk-expo";
import {Product} from "@/Util/type";


export function useProduct(){
      const {getToken}=useAuth()
    const { id } = useLocalSearchParams();

    const {data,isLoading}=useQuery<Product>({
        queryKey:['product'],
        queryFn:async ()=>{
            const token = await getToken();
            return fetchProductById(+id,token)
        }
    })

 return {isLoading,data};

}