import React from "react";

import { Navigate }
from "react-router-dom";

import { useSelector }
from "react-redux";

const Protected = ({
   children
}) => {

   const {

      loading,

      isAuthenticated

   } = useSelector(

      (state) => state.auth
   );

   if(loading){

      return (

         <h1>
            loading...
         </h1>
      )
   }

   if(!isAuthenticated){

      return (
         <Navigate to="/login" />
      )
   }

   return children;
};

export default Protected;