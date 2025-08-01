import {api} from "@/api/axios";
import {createNewProduct, Product} from "@/Util/type";


export const fetchProducts = async (id:number|null=null,token:string|null):Promise<Product[]> => {
  try {

      const res=await api.get(`getAllProducts/${id}`,{
          headers:{
         Authorization:`Bearer ${token}`
          }
      })
      return res.data;

  } catch (err){
      throw err
  }
}
export const fetchProductById = async (id:number,token:string|null):Promise<Product> => {
   try {
       const res=await api.get(`getProductById/${id}`,{
           headers:{
               Authorization:`Bearer ${token}`
           }
       })
       return res.data;

   }catch (err){
       throw err
   }
}
export const createProduct = async (token: string | null, product: FormData): Promise<Product> => {
    try {
        const res = await api.post(`createNewProduct`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        return res.data;
    } catch (err) {
        throw err;
    }
}
