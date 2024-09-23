import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login,logout } from "../../Redux/slices/auth.slice";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { eraseRemember, setRemember } from "../../Redux/slices/remember.slice";

const Login = () =>{
    const auth = useSelector(res=>res.authSlice);
    const remember = useSelector(res=>res.rememberSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user,setUser] = useState({
        email : remember.email,
        password : remember.password 
    });
    // username emilys 
    // password emilyspass
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const handleInput = (e) =>{
       let input = e.target;
       let key = input.name;
       setUser({...user,[key] : input.value})
    }

    useEffect(()=>{
       if(error)
         setTimeout(()=>setError(null),3000)
    },[error])

    const onSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
         try{
             const {data} = await axios({
                method : "post",
                url  :"https://dummyjson.com/auth/login",
                data : {
                    username : user.email,
                    password : user.password
                }
             });
             setError(null);
             setLoading(false);
             dispatch(login(data));
             navigate("/profile");
         }
         catch(error)
         {
            setError(error.response.data.message);
            setLoading(false);
            dispatch(logout());
         }
    }

    const rememberMe = (e) =>{
        if(e.target.checked)
        {
           dispatch(setRemember(user))
        }
        else
        {
           dispatch(eraseRemember())
        }
    }
    return auth.user ? 
    <Navigate to="/profile" />
    :
    (
        <>
          <div 
          className=" flex-col gap-y-4 flex justify-center items-center
          min-h-screen bg-red-100"
          >
            {
                error && 
                <div className="rounded-lg bg-red-400 p-4 w-96 border border-white">
                    <h1 className="font-semibold text-white">{error}</h1>
               </div>
            }
             <div className=" flex flex-col gap-y-4 bg-white rounded-lg px-8 py-6 w-96 shadow-lg">
                <h1 className="text-2xl font-semibold text-slate-800">Login</h1>
               {/*  <label>{JSON.stringify(user)}</label> */}
                <form 
                onSubmit={onSubmit}
                className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label className="text-slate-600 font-samibold">Username</label>
                        <input 
                        type="text" 
                        required
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        placeholder="user@gmail.com"
                        className="p-2 border border-slate-200 rounded"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="text-slate-600 font-samibold">Password</label>
                        <input 
                        type="password" 
                        required
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="*********"
                        className="p-2 border border-slate-200 rounded"
                        />
                    </div>
                    <div className=" mt-1 flex justify-between items-center">
                        <div className="flex gap-x-2 items-center">
                            <input 
                            type="checkbox" 
                            name="remember"
                            onChange={(e)=>rememberMe(e)} 
                            checked={remember.checked}
                            disabled={(user.email.length && user.password.length) === 0}
                            />
                            <label className="text-slate-600 font-semibold">Remember Me!</label>
                        </div>
                        {
                            loading ?
                            <button disabled className="bg-gray-400 px-6 py-2 text-white font-semibold">Loading</button>
                            :
                            <button className="bg-indigo-500 px-6 py-2 text-white font-semibold">Login</button>
                        }
                    </div>
                </form>
             </div>
          </div>
        </>
    )
}
export default Login;