import {useQuery} from "@tanstack/react-query";
import {Category} from "@/Util/type";
import {getGategories} from "@/services/apiCategory";
import {useAuth} from "@clerk/clerk-expo";


export  function useGategories(){
   const {getToken}=useAuth();


    const {isLoading,data,isError,error}=useQuery<Category[]>({
        queryKey:['category'],
        queryFn:async ()=>{
            const token=await getToken();
            return getGategories(token);
        }
    });

    return {isLoading,data ,isError,error};

}