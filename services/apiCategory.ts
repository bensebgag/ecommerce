import {api} from "@/api/axios";
import {Category, Product} from "@/Util/type";


export const getGategories=async (token:string|null):Promise<Category[]> =>{
    try {

     const res=await api.get('getAllCategories',
         {
             headers:{
                 Authorization: `Bearer ${token}`,
             }
         }
         );
      return res.data;

    }catch(err){

      throw err;

    }

}