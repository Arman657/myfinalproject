import React, { useEffect, useState } from 'react'
import { backend_url, server } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

import {MdOutlineTrackChanges, MdTrackChanges} from "react-icons/md"
import { deleteUserAddress, loadUser, updateUserInformation, updatUserAddress } from '../../redux/actions/user';
import { toast } from "react-toastify";
import axios from 'axios';
import {RxCross1} from "react-icons/rx";
import {Country, State} from "country-state-city";
import { getAllOrdersOfUser } from '../../redux/actions/order';



const ProfileContent = ({active}) => {
    const {user,error,successMessage,isAuthenticated} = useSelector((state)=>state.user);
    const [name,setName] =useState(user && user.name);
    const [email,setEmail] =useState(user && user.email);
    const [phoneNumber,setPhoneNumber] =useState(user && user.phoneNumber);
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch({type: "clearErrors"});
      }
      if(successMessage){
        toast.success(successMessage)
      }
    },[error,successMessage])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name,email,password,phoneNumber));
        toast.success("User Details updated successfully!")
    }


    const handleImage =async(e) => {

        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();

        formData.append("avatar",file);

        await axios.put(`${server}/user/update-avatar`, formData,{
          headers: {
            "Content-Type" : "multipart/form-data",
          },
          withCredentials: true,
        }).then((response) => {
          dispatch(loadUser());
          toast.success("avatar updated successfully!")
        }).catch((error)=>{
          toast.error(error);
        })
    }

    



  return (
    <div className='w-full'>
        {/* profile page */}
        {
            active === 1 && (
                <>
                <div className='flex justify-center w-full '>
                    <div className="relative">
                        <img src={`${user?.avatar?.url}`} alt="" className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'/>

                        <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                          <input type="file" id="image" className='hidden' onChange={handleImage} />
                           <label htmlFor="image">
                           <AiOutlineCamera/>
                           </label>
                        </div>
                    </div>
                </div>
                <br />
                <br />

<div className='w-full px-5'>
<form onSubmit={handleSubmit} aria-required={true}>
    <div className='w-full pb-3 800px:flex block'>
        <div className='w-[100%] 800px:w-[50%]'>
            <label htmlFor="" className='block pb-2'>Full Name</label>
            <input type="text" name='name'  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='w-[100%] 800px:w-[50%]'>
            <label htmlFor="" className='block pb-2'>Email Address</label>
            <input type="email" name='email'  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} required value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        </div>
    </div>


    <div className='w-full pb-3 800px:flex block'>
        <div className='w-[100%] 800px:w-[50%]'>
            <label htmlFor="" className='block pb-2'>Phone Number</label>
            <input type="number" name='phoneNumber'  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </div>

        <div className='w-[100%] 800px:w-[50%]'>
            <label htmlFor="" className='block pb-2'>Enter Your Password</label>
            <input type="password" name='password'  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
     
    </div>

    <input type="submit" className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update"/>
</form>
</div>
</>
            )
        }

        {/* order page */}
        {
            active === 2 &&(
                <div>
                    <AllOrders/>
                </div>
            )
        }


        {/* refund page */}
        {
            active === 3 &&(
                <div>
                    <AllRefundOrders/>
                </div>
            )
        }

        {/* track order page*/}
        {
            active === 5 &&(
                <div>
                    <TrackOrder/>
                </div>
            )
        }

        {/* ChangePassword*/}
        {
            active === 6 &&(
                <div>
                    <ChangePassword/>
                </div>
            )
        }

         {/* Address*/}
         {
            active === 7 &&(
                <div>
                    <Address/>
                </div>
            )
        }
    </div>
  )
}


const AllOrders = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  const {orders} = useSelector((state)=>state.order);

  useEffect(()=>{
    dispatch(getAllOrdersOfUser(user._id))
  },[])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            // return params.getValue(params.id, "status") === "Delivered"
             return params.row.status === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20}/>
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];

      orders && orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

    
    return (
        <div className="pl-8 pt-1 ">
        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
        </div>
    )
}


const AllRefundOrders = () =>{
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  const {orders} = useSelector((state)=>state.order);

  useEffect(()=>{
    dispatch(getAllOrdersOfUser(user._id))
  },[]);

  const eligibleOrders = orders && orders.filter((item)=> item.status === "Processing refund");

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            // return params.getValue(params.id, "status") === "Delivered"
             return params.row.status === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20}/>
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];

      eligibleOrders && eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  
      return (
        <div className="pl-8 pt-1">
         <DataGrid rows={row} columns={columns} pageSize={10} autoHeight disableSelectionOnClick/>
      </div>
      )
}

const TrackOrder = () =>{
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  const {orders} = useSelector((state)=>state.order);

  useEffect(()=>{
    dispatch(getAllOrdersOfUser(user._id))
  },[])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            // return params.getValue(params.id, "status") === "Delivered"
             return params.row.status === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/user/track/order/${params.id}`}>
                  <Button>
                    <MdTrackChanges size={20}/>
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];

      orders && orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
      return (
        <div className="pl-8 pt-1">
          <DataGrid row={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
      </div>
      )
}

const ChangePassword =()=>{
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");


  const passwordChangeHandler =async(e) => {
      e.preventDefault();
      await axios.put(`${server}/user/update-user-password`, {oldPassword, newPassword, confirmPassword}, {withCredentials:true}).then((res) =>{ 
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }).catch((error)=>{
          toast.error(error.response.data.message)
        })
  }

 
  return (
    <div className='w-full px-5'>
     
        <h1 className='block text-center text-[25px] font-[600] text-[#000000ba] pb-2'>
        Change Password
        </h1>
        <div className='w-full'>
          <form aria-required onSubmit={passwordChangeHandler} className='flex flex-col items-center'>
              <div className='w-[100%] 800px:w-[50%] mt-5'>
                <label htmlFor="" className='block pb-2'>Enter your old Password</label>
                <input type="password"  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
             </div>


             <div className='w-[100%] 800px:w-[50%] mt-2'>
                <label htmlFor="" className='block pb-2'>Enter your new Password</label>
                <input type="password"  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
             </div>


             <div className='w-[100%] 800px:w-[50%] mt-2'>
                <label htmlFor="" className='block pb-2'>Enter your Confirm Password</label>
                <input type="password"  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <input type="submit" className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update"/>
             </div>
          </form>
        </div>

       </div>
  
  )
}


const Address =()=>{
  const [open,setOpen] = useState(false);
  const [country,setCountry] = useState("");
  const [city,setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const {user} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const addressTypeData =[
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(addressType ==="" || country ==="" || city ===""){
      toast.error("Please fill all the fields!");
    }else{
      dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType));
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
      setZipCode(null); 
    }
  }

const handleDelete = (item) =>{
  dispatch(deleteUserAddress(item._id))
}

  return (
    <div className='w-full px-5'>
      {
        open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className='800px:w-[35%] w-[75%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll '>
              <div className='w-full flex justify-end p-3'>
              <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)}/>
              </div>
              <h1 className='text-center text-[25px] font-Poppins'>Add New Address</h1>
              <div className='w-full'>
                <form aria-required onSubmit={handleSubmit} className='w-full'>
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2">
                        Country
                      </label>
                      <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className='w-[95%] border h-[40px] rounded-[5px]'>
                        <option value="" className='block border pb-2'>
                          choose your country
                        </option>
                        {
                          Country && Country.getAllCountries().map((item) => (
                           <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                            {item.name}
                           </option> 
                          ))
                        }
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">
                        choose your City
                      </label>
                      <select name="" id="" value={city} onChange={(e) => setCity(e.target.value)} className='w-[95%] border h-[40px] rounded-[5px]'>
                        <option value="" className='block border pb-2'>
                          choose your City
                        </option>
                        {
                          State && State.getStatesOfCountry(country).map((item) => (
                           <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                            {item.name}
                           </option> 
                          ))
                        }
                      </select>
                    </div>


                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input type="address" className={`${styles.input}`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                      
                    </div>
                    <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input type="address" className={`${styles.input}`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>

                    <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input type="number" className={`${styles.input}`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">
                        Address Type
                      </label>
                      <select name="" id="" value={addressType} onChange={(e) => setAddressType(e.target.value)} className='w-[95%] border h-[40px] rounded-[5px]'>
                        <option value="" className='block border pb-2'>
                          choose your Address Type
                        </option>
                        {
                          addressTypeData && addressTypeData.map((item) => (
                           <option className='block pb-2' key={item.name} value={item.name}>
                            {item.name}
                           </option> 
                          ))
                        }
                      </select>
                    </div>

                    <div className='w-full pb-2'>
                      <input type="submit" className={`${styles.input} mt-5 cursor-pointer`} required readOnly/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
        My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`} onClick={()=> setOpen(true)}>
          <span className='text-[#fff]'>Add New</span>
        </div>
      </div>
      <br />
     {
      user && user.addresses.map((item,index)=>(
        <div className='w-full bg-white 800px:h-[70px] h-auto  rounded-[4px] flex items-center 800px:flex-row flex-col px-3 shadow 800px:py-0 py-8 justify-between pr-10 mb-5' key={index}>
        <div className='flex items-center'>
    
          <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>{item.address1} {item.address2}</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>{user && user.phoneNumber}</h6>
        </div>
        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={25} className='cursor-pointer' onClick={()=> handleDelete(item)}/>
        </div>
      </div>
      ))
     }

     {user && user.addresses.length === 0 && (
      <h5 className='text-center pt-8 text-[18px]'>
        You not have any saved address!
      </h5>
     )}
    </div>
  )
}



export default ProfileContent;