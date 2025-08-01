import {User} from "@/Util/type";
import {api} from "@/api/axios";


export const getUser = async (token:string|null):Promise<User> => {
   try {
       const res=await api.get("roleUser",{
           headers:{
               Authorization: `Bearer ${token}`,
           }
       })
     return res.data;
   }catch(err){
       throw err;
   }
}