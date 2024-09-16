/* import { RouterProvider,createBrowserRouter } from "react-router-dom"; */
import { 
  BrowserRouter,
  Routes,
  Route
 } from "react-router-dom";
import Home from "./Cmp/Home";
import Images from "./Cmp/Images";
import Layout from "./Cmp/Layout";
import Login from "./Cmp/Login";
import Profile from "./Cmp/Profile";
import Post from "./Cmp/Post";
import Protected from "./Protected";
import Products from "./Cmp/Products";
import Cart from "./Cmp/Cart";
import NotFound from "./Cmp/404";
import "animate.css";

/* const router = createBrowserRouter([
   {
     path : "/",
     element : <Layout><Home /></Layout>
   },
   {
    path : "/images",
    element : <Layout><Images /></Layout>
   },
   {
    path : "/login",
    element : <Layout><Login /></Layout>
   },
   {
    path : "/profile",
    element : <Layout><Profile /></Layout>
   },
   {
    path : "/*",
    element : <Layout><NotFound /></Layout>
   }
]); */
/* const App = () =>{
  return (
    <>
      <RouterProvider 
      router={router}
      />
    </>
  )
} */
const App = () =>{
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" 
            element={<Layout><Home /></Layout>} 
            />
            <Route path="/images" 
            element={<Layout><Images /></Layout>} 
            />
            <Route path="/products" 
            element={<Layout><Products /></Layout>} 
            />
            <Route element={<Protected />}>
              <Route path="/profile" 
              element={<Layout><Profile /></Layout>} 
              />
              <Route path="/post" 
              element={<Layout><Post /></Layout>} 
              />
               <Route path="/cart" 
              element={<Layout><Cart /></Layout>} 
              />
            </Route>
            <Route path="/login" 
            element={<Layout><Login /></Layout>} 
            />
            <Route path="/*" 
            element={<Layout><NotFound /></Layout>} 
            />
        </Routes>
    </BrowserRouter>
  )
}
export default App;