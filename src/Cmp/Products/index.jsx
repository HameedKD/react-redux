import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/slices/products.slice";
import { addToCart } from "../../Redux/slices/cart.slice";

const Products = () =>{
    const dispatch = useDispatch();
    const products = useSelector(res=>res.productsSlice);

    useEffect(()=>{
        dispatch(getProducts())
    },[])

    return (
        <>
           {
            products.loading &&
            <div className="flex items-center justify-center bg-red-100 min-h-screen">
              <h1 className=" font-semibold text-2xl shadow-lg bg-white p-3 rounded-lg px-5 ">Loading...</h1>
            </div>
          }
          {
            (products.loading === false && products.data) &&
            <div>
                <div className="p-16 bg-red-100 grid md:grid-cols-4 gap-8">
                    {
                        products.data.map((item,index)=>(
                            <div key={index} className="animate__animated animate__zoomIn shadow-lg bg-white p-8 border rounded-lg">
                                <div className="flex tewms-center justify-center">
                                <img src={item.image} 
                                alt={item.title} 
                                style={{
                                    width : 225,
                                    height : 250,
                                }}
                                />
                                </div>
                                <div className="flex flex-col gap-2 mt-6">
                                    <h1 className="font-semibold text-lg">{item.title}</h1>
                                    <p className="text-gray-600">{item.description.slice(0,40)}...</p>
                                    <h1 className="font-semibold text-lg">Rs. {item.price}</h1>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <button
                                     className="px-2 py-2 bg-orange-500 text-white font-bold rounded
                                     hover:bg-orange-800"
                                     onClick={()=>dispatch(addToCart(item))}
                                     >Add To Cart</button>
                                    <button className="px-2 py-2 bg-green-500 text-white hover:bg-green-800 font-bold rounded">Buy Now</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
          }
          {
            (products.loading  === false && products.error) && 
            <div className="flex items-center justify-center bg-red-100 min-h-screen">
               <h1 className="font-semibold text-2xl shadow-lg bg-red-500 text-white p-3 rounded-lg px-5 ">Something Went Wrong...😡</h1>
            </div>
          }
        </>
    )
}
export default Products;