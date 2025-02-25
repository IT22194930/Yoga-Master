import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
   const {googleLogin} = useAuth();
   const navigate = useNavigate();
   const handleLogin = () => {
      googleLogin().then((userCredentials) => {
         const user = userCredentials.user;
         console.log(user);
         if(user){
            const userImp = {
               name: user?.displayName,
               email: user?.email,
               photoUrl: user?.photoURL,
               role: 'user',
               gender: "Is not specified",
               address: "Is not specified",
               phone: "Is not specified"
            };

            if(user.email && user.displayName) {
               return axios.post('http://localhost:3000/new-user', userImp).then(() => {
                  navigate('/');
                  return "Registration Successful !";
               }).catch((err) => {
                  throw new Error(err);
               })
            }
         }

      }).catch((error) => {
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorMessage)
       });
   }

   return (
    <div className="flex items-center justify-center my-3">
      <button onClick={() => handleLogin()} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
         <FcGoogle className="h-6 w-6 mr-2" />
         <span>Continue with Google</span>
      </button>
    </div>
  )
}

export default GoogleLogin