import {  useNavigate } from "react-router-dom";

function ErrorPage(){

const navigate=useNavigate();
  return(
 <div className="d-flex justify-content-center align-items-center flex-column "
      style={{height:"100vh"}}>
        <h1 style={{color:'red'}}>Oops!</h1>
        <p>page is not found Please Go Back</p>
        <button onClick={()=>navigate(-1)}>GO back</button>
      </div>)
}
export default ErrorPage;