import { useSelector,useDispatch } from "react-redux";
import {removeCart,removeAllCart} from "../../Redux/slices/cart.slice"

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(res => res.cartSlice)
    return (
        <>
            <div className="flex justify-center">
                <div className=" flex flex-col mt-5 p-16 bg-red-100 w-3/4 gap-8">
                <div>
                   {
                    cart.length > 0 ?
                    <button 
                    className="px-2 py-2 bg-rose-500 
                    text-white hover:bg-rose-700 
                    font-bold rounded
                    "
                    onClick={()=>dispatch(removeAllCart())}
                    >Remove All Cart</button>
                    :
                    <h1 className="text-center font-bold text-4xl mt-5">Your Cart Is Empty !</h1>
                   }
                </div>
                    {
                        cart.map((item, index) => (
                            <div key={index} className=" flex gap-x-8 animate__animated animate__zoomIn shadow-lg bg-white p-8 border rounded-lg">
                                <div className="flex tewms-center justify-center">
                                    <img src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: 225,
                                            height: 250,
                                        }}
                                    />
                                </div>
                                <div>
                                <div className="flex flex-col gap-2 mt-5">
                                    <h1 className="font-semibold text-lg">{item.title}</h1>
                                    <p className="text-gray-600">{item.description.slice(0, 40)}...</p>
                                    <h1 className="font-semibold text-lg">Rs. {item.price}</h1>
                                </div>
                                <div className="flex items-start gap-4 mt-5">
                                    <button 
                                    className="px-2 py-2 bg-green-500 
                                    text-white hover:bg-green-800 
                                    font-bold rounded">Buy Now</button>
                                    <button 
                                    className="px-2 py-2 bg-rose-500 
                                    text-white hover:bg-rose-700 
                                    font-bold rounded
                                    "
                                    onClick={()=>dispatch(removeCart(index))}
                                    >Remove</button>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Cart;