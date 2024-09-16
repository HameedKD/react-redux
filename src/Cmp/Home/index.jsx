import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {addImage,removeImage,resetImage} from "../../Redux/slices/images.slice";


const Home = () =>{
    const dispatch = useDispatch();
    const imagesSlice = useSelector(res=>res.imagesSlice);
    const onSubmit = (e) =>{
        e.preventDefault();
        const url = e.target[0].value;
        dispatch(addImage(url));
    }
    return(
        <>
           <div className="flex justify-center items-center bg-amber-50 min-h-screen">
               <div className="flex flex-col gap-y-6 w-6/12">
                    <h1 className="text-6xl font-bold text-violet-600">
                        Pase Image URL
                    </h1>
                    <div>
                        <form 
                            onSubmit={onSubmit}
                            className="flex flex-col gap-y-4">
                             <input
                              required
                              className="border border-violet-600 rounded-lg w-full p-3"
                              placeholder="http://localhost:3000"
                              type="url" 
                              />
                             <div className="flex items-center gap-x-3">
                                <button
                                className="bg-violet-600 text-white rounded px-6 py-2.5"
                                >SUBMIT</button>
                                <button
                                type="button"
                                className="bg-violet-600 text-white rounded px-6 py-2.5"
                                onClick={()=>dispatch(resetImage())}
                                >RESET</button>
                                <Link
                                className="font-semibold text-gray-500"
                               to='/images'>View</Link>
                             </div>
                             <div className="grid grid-cols-3 gap-6">
                             {
                                imagesSlice.map((item,index)=>(
                                  <img
                                  onClick={()=>dispatch(removeImage(index))} 
                                  key={index}
                                  src={item}
                                  width={400}
                                  alt={item}
                                  />
                                )) 
                             }
                             </div>
                        </form>
                    </div>
               </div>
           </div>
        </>
    )
}
export default Home;