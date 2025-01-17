import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";
const Protected = () =>{
    const auth = useSelector(res=>res.authSlice);
    const {user} = auth;
    
   return user ? <Outlet /> : <Navigate to="/login" />
}
export default Protected;