import { useDispatch,useSelector } from "react-redux";
import { getPost } from "../../Redux/slices/post.slice";
import { useEffect } from "react";
const Post = () =>{
    const dispatch = useDispatch();
    const post = useSelector(res=>res.postSlice);
    console.log(post)
    useEffect(()=>{
       dispatch(getPost());
    },[])

    return (
        <>
          {
            post.loading &&
            <div className="flex items-center justify-center bg-red-100 min-h-screen">
              <h1 className=" font-semibold text-2xl shadow-lg bg-white p-3 rounded-lg px-5 ">Loading...</h1>
            </div>
          }
          {
           ( post.loading === false && post.data) &&
            <div className="flex flex-col gap-y-4 px-0 md:p-8 md:py-16 items-center bg-red-100 min-h-screen">
               {
                  post.data.map((item,index)=>(
                     <div key={index} className="md:w-3/4 p-5 bg-white
                      rounded-lg shadow-lg animate__animated animate__zoomIn">
                        <h1 className="font-semibold text-2xl">{item.title}</h1>
                        <p className=" text-slate-500">{item.body}</p>
                     </div>
                  ))
               }
            </div>
          }
          {
            (post.loading  === false && post.error) && 
            <div className="flex items-center justify-center bg-red-100 min-h-screen">
               <h1 className="font-semibold text-2xl shadow-lg bg-red-500 text-white p-3 rounded-lg px-5 ">Something Went Wrong...😡</h1>
            </div>
          }
        </>
    )
}
export default Post;