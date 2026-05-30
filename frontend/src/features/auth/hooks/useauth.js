import { useDispatch, useSelector } from "react-redux";
import { login , register ,getme ,logoutme} from "../service/auth.api";
import { authStart , authFailure , authSuccess ,logout } from "../slice/auth.slice";
import { useEffect } from "react";

export function useauth(){
const dispatch = useDispatch()
const auth = useSelector(
   (state) => state.auth
)
async function handlelogin(username , password){
try{
dispatch(authStart())
const  res = await login(username , password)
dispatch(authSuccess(res))
return res

}
catch(err){
  dispatch(
        authFailure(
          err.response?.data?.message ||"Login failed"
        ))
}

}
async function handleregister(username ,email , password ){
try{
  dispatch(authStart())
    const res = await register(username , email , password)
  dispatch(authSuccess(res))
return res
  
}
catch(err){
      dispatch(
        authFailure(
          err.response?.data?.message || "register failed"
        ))
}
}
async function handlegetme(){
  try{
dispatch(authStart())
const res = await getme()
dispatch(authSuccess(res.user))
return res ;


  }
  catch(err){
 dispatch(
        authFailure(
          err.response?.data?.message ||"extract failed"
        ))

  }
}
async function handlelogout(){
try{

  const res = await logoutme()
    dispatch(logout())
  return res
}
catch(err){ dispatch( authFailure(err.response?.data?.message ||"logout failed" ))
}
}




return {
handlelogin , handleregister , ... auth , handlegetme
};
    
}










