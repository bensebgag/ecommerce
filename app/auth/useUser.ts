import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@clerk/clerk-expo";
import {getUser} from "@/services/apiUser";


export function useUser() {
    const {getToken}=useAuth()
   const {data,isLoading}=useQuery({
       queryKey:['user'],

       queryFn:async () => {
           const token=await getToken();
           return getUser(token)
       }
   })
    return {data,isLoading};

}