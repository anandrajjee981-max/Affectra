import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:3000",

    withCredentials: true
});

// LOGIN
export async function login( identifier, password) {
try {
      const payload = {
         password
      };
      if(identifier.includes("@")){
         payload.email = identifier;

      }
      else{
         payload.username = identifier; }
      const res = await api.post( "/api/auth/login",
         payload
      );
      return res.data;

   } catch (err) {

      console.log(err);

      throw err;
   }
}

// REGISTER
export async function register( username, email, password) {
    try {
        const res = await api.post(
            "/api/auth/register",{ username,email, password}
        );
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function getme(){
   try{
      const res = api.get("/api/auth/getme")
      return res.data 

   }
   catch(err){
      throw err ,
      console.log(err)
   }
}
export async function logoutme(){
try{
const res = api.post("/api/auth/logout")
return res.data 

}
catch(err){
console.log(err)

}


}











