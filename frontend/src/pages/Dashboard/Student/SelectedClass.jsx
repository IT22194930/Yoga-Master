import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser"
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';
import { MdDeleteSweep } from "react-icons/md";
import { FiDollarSign} from "react-icons/fi";
import Swal from "sweetalert2";

const SelectedClass = () => {
   const {currentUser} = useUser();
   const [loading, setLoading] = useState(true);
   const [classes, setClasses] = useState([]);
   const [paginatedData, setPaginatedData] = useState([]);
   const [page, setPage] = useState(1);
   const itemsPerPage = 5;
   const totalPage = Math.ceil(classes.length / itemsPerPage);
   const navigate = useNavigate();
   const axiosSecure = useAxiosSecure();

   useEffect( () => {
      axiosSecure
         .get(`/cart/${currentUser?.email}`)
         .then((res) => {
            setClasses(res.data);
            setLoading(false);
         })
         .catch((error) => {
         console.error(error)
         setLoading(false);
      })
   }, []);

   const totalPrice = classes.reduce((acc, item) => acc + parseInt(item.price), 0);
   const totalTax = totalPage * 0.01;
   const price = totalPrice + totalTax;

   const handlePay = (id) => {
      const item = classes.find((item) => item._id === id);
      const price = item.price;
      navigate(`/dashboard/user/payment`, { state: { price: price, itemId: id }, });
   };

   const handleDelete = (id) => {
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      }).then((result) => {
      if (result.isConfirmed) {
         axiosSecure.delete(`/delete-cart-item/${id}`).then((res) => {
            if(res.data.deletedCount > 0) {
               Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
               });
               const newClasses = classes.filter((item) => item._id !== id);
               setClasses(newClasses);
            }  
         }).catch((error) => console.log(error))
      }
      });
   }

   if(loading) {
      return <h1>Loading...</h1>
   }

  return (
    <div>
      <div className="my-6">
         <h1 className="text-4xl text-center font-bold">My <span className="text-secondary">Selected</span> Class</h1>
      </div>

      <div className="h-screen py-8">
         <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart : </h2>
            <div className="flex flex-col md:flow-row gap-4">
               {/* left div */}
               <div className="md:w-3/4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                     <table className="w-full">
                        <thead>
                           <tr>
                              <th className="text-left font-semibold">#</th>
                              <th className="text-left font-semibold">Product</th>
                              <th className="text-left font-semibold">Price</th>
                              <th className="text-left font-semibold">Date</th>
                              <th className="text-left font-semibold">Actions</th>
                           </tr>
                        </thead>

                        {/* table body */}
                        <tbody>
                           {
                              classes.length === 0 ? <tr><td colSpan='5' className="text-center text-2xl font-bold">No Classes Found</td></tr> : 
                              classes.map((item, index) => {
                                 const letIndex = (page - 1) * itemsPerPage + index + 1;
                                 return <tr key={item._id}>
                                    <td className="py-4">{letIndex}</td>
                                    <td className="py-4">
                                       <div className="flex items-center">
                                          <img src={item.image} alt="" className="h-16 w-16 mr-4" />
                                          <span>{item.name}</span>
                                       </div></td>
                                       <td className="py-4">${item.price}</td>
                                       <td className="py-4">
                                          <p className="text-green-700 text-sm">
                                             {moment(item.submitted).format("MMMM Do YYYY")}
                                          </p>
                                       </td>
                                       <td className="py-4 flex pt-8 gap-2">
                                          <button onClick={() => handleDelete(item._id)} className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold"><MdDeleteSweep/></button>
                                          <button onClick={() => handlePay(item._id)} className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center"><FiDollarSign/> Pay</button>
                                       </td>
                                 </tr>
                              })
                           }
                        </tbody>
                     </table>
                  </div>
               </div>


               {/* right div */}
               <div className="md:w-1/5 fixed right-3">
                  <div className="bg-white rounded-lg shadow-md p-6">
                     <h2 className="text-lg font-semibold mb-4">Summary</h2>
                     <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                     </div>
                     <div className="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>${totalTax.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between mb-2">
                        <span>Extra Fees</span>
                        <span>$0</span>
                     </div>
                     <hr className="my-2" />
                     <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${price.toFixed(2)}</span>
                     </div>
                     <button disabled={price <= 0} onClick={() => navigate('/dashboard/user/payment', { state: { price: price, itemId: null } })} className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full">
                        Checkout
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default SelectedClass