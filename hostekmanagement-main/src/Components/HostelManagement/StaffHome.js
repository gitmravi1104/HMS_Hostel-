import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { RegexEmail, RegexHouseNo, RegexMobileNo, RegexName, RegexPincode } from './RegularEx';
import axios from 'axios';
import HostelManagementService from '../service/HostelManagementService';
import { Navigate, useNavigate } from 'react-router-dom';


const StaffHome = () => {

  const [showAddStaff,setshowAddStaff] = useState(false);
  const [showUpdateStaff,setShowUpdateStaff] = useState(false);
  const [staffData,setStaffData] = useState([]);


  const HandleNewStaff = () => {
    setshowAddStaff(true);
    setShowUpdateStaff(false)
  }
  
  const [staff,setStaff] = useState({
    id:'',
    name:'',
    fathername:'',
    mobileno:'',
    altmobileno:'',
    email:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    designation:'',
    dateOfJoining:''
  })

  const [validationErrors,setValidationErrors] = useState({
    id:' ',
    name:'',
    fathername:'',
    mobileno:'',
    altmobileno:'',
    email:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    designation:'',
    dateOfJoining:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setStaff({...staff,[name]:value})

    // from here validations

    if(name === 'name'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Name must be 3 or more characters'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }
    
    if(name === 'fathername'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Father Name must be 3 or more characters'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'mobileno'){
      if(!RegexMobileNo.test(value)){
        setValidationErrors({...validationErrors, [name]:'Mobile number is invalid!'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'altmobileno'){
      if(!RegexMobileNo.test(value)){
        setValidationErrors({...validationErrors, [name]:'Mobile number is invalid!'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'email'){
      if(!RegexEmail.test(value)){
        setValidationErrors({...validationErrors, [name]:'Email-id is invalid!'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'houseno'){
      if(!RegexHouseNo.test(value)){
        setValidationErrors({...validationErrors, [name]:'Please enter valid house no.'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'street'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Please enter valid street name'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'city'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Please enter valid city'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'state'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Please enter valid state'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'pincode'){
      if(!RegexPincode.test(value)){
        setValidationErrors({...validationErrors, [name]:'Please enter valid pincode'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }
  }

  

  const handleClose = (e) =>{
    setshowAddStaff(false);
    setShowUpdateStaff(false)
      setStaff({ id:'', name:'', fathername:'', mobileno:'', altmobileno:'', email:'', houseno:'', street:'', city:'', state:'', pincode:'', designation:'', });
    }
  

  useEffect(()=>{
    getStaffDetails();
  },[])


  const addStaffHandler=async(e)=>
    {  
       e.preventDefault();
  
      const staffDetails={
        name:staff.name,
        fatherName:staff.fathername,
        mobile:staff.mobileno,
        altmobile:staff.altmobileno,
        email:staff.email,
        houseno:staff.houseno,
        street:staff.street,
        city:staff.city,
        state:staff.state,
        pincode:staff.pincode,
        designation:staff.designation,
        dateOfJoining:staff.dateOfJoining,
        hostel:{
          hostelName:"SSR"
        }
  
      }
   
      try{
        const res= await HostelManagementService.addNewStaff(staffDetails);
        const res1=await HostelManagementService.addStaffPayment(staffDetails)
        console.log(res1.data)
        console.log(res.data);
        handleClose();
        getStaffDetails();
      }
      catch(error)
      {
        console.log(error);
        alert(error.response.data);
      }
  
  
        
    }

  const getStaffDetails=async()=>
  {
    try {
      await HostelManagementService.getAllStaff().then(res=>{
        setStaffData(res.data)
      })
    } catch (error) {
      console.log(error)
      // alert(error.response);
    }
  }


  const HandleUpdateStaff = (item) =>{
  
    // setStaff({
    //   id:item.id,
    //   name:item.name,
    //   fathername:item.fatherName,
    //   mobileno:item.mobile,
    //   altmobileno:item.altmobile,
    //   email:item.email,
    //   houseno:item.houseno,
    //   street:item.street,
    //   city:item.city,
    //   state:item.state,
    //   pincode:item.pincode,
    //   designation:item.designation,
    // })
    // setShowUpdateStaff(true);
    // setshowAddStaff(false);

    const staffId = item.id;
    navigate("/editstaff", { state: { staffId } });
    
    
  }

  const updateStaffHandler=async(e)=>
  {
    e.preventDefault();
    const updatedStaffData={
      id:staff.id,
      name:staff.name,
      fatherName:staff.fathername,
      mobile:staff.mobileno,
      altmobileno:staff.altmobileno,
      email:staff.email,
      houseno:staff.houseno,
      street:staff.street,
      city:staff.city,
      state:staff.state,
      pincode:staff.pincode,
      designation:staff.designation,
      hostel:{
        hostelName:"SSR" // need to update the hostelName 
      }
    };
    
    try {
      await HostelManagementService.UpdateStaff(staff.id,updatedStaffData).then(res=>{
      console.log(res.data);
      getStaffDetails();
    })
    } catch (error) {
      alert(error.response.data)
    }
    handleClose();
      
  }

  const DeleteStaff = async(staffId) =>{
    try {
      alert("Do you want Delete")
      await HostelManagementService.DeleteStaff(staffId).then(res=>{
        console.log(res.data);
        getStaffDetails();
      })
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data)
    }
  }

  const [searchTerm,setSearchTerm] = useState('');
  const HandleSearchChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  const trimmedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredData = trimmedSearchTerm 
  ? staffData.filter(data =>
    (data.name && data.name.toLowerCase().includes(trimmedSearchTerm)) ||
    (data.mobile && data.mobile.toLowerCase().includes(trimmedSearchTerm)) ||
    (data.designation && data.designation.toLowerCase().includes(trimmedSearchTerm))
  )
  : staffData;

  const notFound = searchTerm && filteredData === 0
    
  const navigate =useNavigate(); 


  return (
    <div className='container-fluid mt-3'>
      <h4 className='text-primar my-2 rounded py-2 text-center text-light fw-bold bg-dark'>Staff Management</h4>
      <div className='mt-2 ms-3'>
        <div className=" mt-3 d-flex justify-content-between">
            <button className="btn btn-info fw-bold px-3 ms-5" onClick={HandleNewStaff}>Add Staff</button>
            <button className='btn btn-info fw-bold px-3 me-5' onClick={()=> navigate("/staffpayment")}>Payment Details</button>
        </div>
        <div className='mt-2 ms-3'>
            <h5 className='fs-semibold fw-bold text-center '>All Staff Details</h5>
            <div className='row'>
              <div className='col-6 my-3'>
              <input
                  type="search"
                  className="form-control w-75 ms-lg-5"
                  placeholder="Search by Name or Mobile No. or Designation"
                  value={searchTerm}
                  onChange={HandleSearchChange}
                />
                {notFound && <h5 className='text-danger mt-3 text-center'>No Staff Found.</h5>}
                {searchTerm && !notFound && (
                  <h5 className="text-dark mt-3 text-center">{filteredData.length} Staff Found.</h5>
                  )}
              </div>
              <div className='col-6 my-3 d-flex justify-content-end'>
                <p className='fw-semibold fs-5 me-lg-3'>Total Number of Staff : <span className='fw-bold'> &nbsp;{staffData.length}</span></p>
              </div>
            </div>
           
            <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
                <tr>
                  <th className='text-primary'>SI.NO</th>
                  <th className='text-primary'>Name</th>
                  <th className='text-primary'>Mobile</th>
                  <th className='text-primary'>Designation</th>
                  <th className='text-primary'>More Details</th>
                </tr>
            </thead>
            <tbody className='text-center'>
            {!notFound && filteredData.length > 0 && (
                staffData.map((item,index)=>(
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.designation}</td>
                    <td><button className='rounded-circle' onClick={()=>HandleUpdateStaff(item)} ><i class="fa-solid fa-ellipsis"></i></button></td>
                
                  </tr>
                ))
              )}
            </tbody>
            </table>
            {/* {staffData.length===0 && <h3 className='text-center fw-bold '>No Data Found. Please Add Staff Details</h3>  } */}

        </div>
        </div>
     <Modal show={showAddStaff} onHide={handleClose} backdrop="static"   dialogClassName="custom-modal-dialog" 
  className="custom-modal">
  <Modal.Header closeButton className='custom-modal-header'>
    <Modal.Title className='fw-bold text-center'>Add staff</Modal.Title>
  </Modal.Header>
  <Modal.Body className='mx-3 custom-modal-body '>
    <form className='ms-2' onSubmit={addStaffHandler}>
      {/* Personal Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary text-center fw-bold'>Personal Details</h5>
        <div className='row'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-control'
              placeholder='Enter staff Name'
              value={staff.name}
              onChange={HandleChange}
              required
            />
            {validationErrors.name && <small className="text-danger">{validationErrors.name}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='fathername'>Father's Name:</label>
            <input
              type='text'
              name='fathername'
              id='fathername'
              className='form-control'
              placeholder='Enter Father`s Name'
              value={staff.fathername}
              onChange={HandleChange}
              required
            />
            {validationErrors.fathername && <small className="text-danger">{validationErrors.fathername}</small>}
          </div>
          <div className='col-4'>
          <label className='form-label fw-bold' htmlFor='email'>Mail-Id:</label>
            <input
              type='text'
              name='email'
              id='email'
              className='form-control'
              placeholder='Enter Mail id'
              value={staff.email}
              onChange={HandleChange}
              required
            />
            {validationErrors.email && <small className="text-danger">{validationErrors.email}</small>}
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='mobileno'>Mobile No:</label>
            <input
              type='text'
              name='mobileno'
              id='mobileno'
              className='form-control'
              placeholder='Enter Mobile Number'
              maxLength={10}
              value={staff.mobileno}
              onChange={HandleChange}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            {validationErrors.mobileno && <small className="text-danger">{validationErrors.mobileno}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='altmobileno'>Alternate Mobile No:</label>
            <input
              type='text'
              name='altmobileno'
              id='altmobileno'
              className='form-control'
              placeholder='Enter Alternate Mobile Number'
              value={staff.altmobileno}
              onChange={HandleChange}
              maxLength={10}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            {validationErrors.altmobileno && <small className="text-danger">{validationErrors.altmobileno}</small>}
          </div>
        </div>
       
      </div>
      <hr/>

      {/* Address Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary fw-bold text-center'>Address Details</h5>
        <div className='row'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='houseno'>House No.:</label>
            <input
              type='text'
              name='houseno'
              id='houseno'
              className='form-control'
              placeholder='Enter House Number'
              value={staff.houseno}
              onChange={HandleChange}
              required
            />
            {validationErrors.houseno && <small className="text-danger">{validationErrors.houseno}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='street'>Street Name:</label>
            <input
              type='text'
              name='street'
              id='street'
              className='form-control'
              placeholder='Enter Street Name'
              value={staff.street}
              onChange={HandleChange}
              required
            />
            {validationErrors.street && <small className="text-danger">{validationErrors.street}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='city'>City:</label>
            <input
              type='text'
              name='city'
              id='city'
              className='form-control'
              placeholder='Enter City Name'
              value={staff.city}
              onChange={HandleChange}
              required
            />
            {validationErrors.city && <small className="text-danger">{validationErrors.city}</small>}
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='state'>State:</label>
            <input
              type='text'
              name='state'
              id='state'
              className='form-control'
              placeholder='Enter State Name'
              value={staff.state}
              onChange={HandleChange}
              required
            />
            {validationErrors.state && <small className="text-danger">{validationErrors.state}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='pincode'>PinCode:</label>
            <input
              type='text'
              name='pincode'
              id='pincode'
              className='form-control'
              placeholder='Enter Pincode'
              value={staff.pincode}
              onChange={HandleChange}
              maxLength={6}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            {validationErrors.pincode && <small className="text-danger">{validationErrors.pincode}</small>}
          </div>
        </div>
        
      </div>
      <hr/>

      {/* Date & Room Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary fw-bold text-center'>Other Details</h5>
        <div className='row'>
          <div className='col-6'>
            <label className='form-label fw-bold' htmlFor='dateOfJoining'>Date of Joining:</label>
            <input
              type='date'
              name='dateOfJoining'
              id='dateOfJoining'
              className='form-control'
              value={staff.dateOfJoining}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-6'>
          <label className="form-label fw-bold mt-1 col-5" htmlFor="designation">Designation:- </label>
                  <select className="form-control w-100" name="designation" id="designation" value={staff.designation} onChange={HandleChange} required>
                        <option value=''>Select</option>
                        <option value="cook">Cook</option>
                        <option value="Sweeper">Sweeper</option>
                        <option value='supervisor'>Supervisor</option>
                        <option value='Helper'>Helper</option>
                    </select>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-around mt-3'>
        <button className='btn btn-danger' type='button' onClick={handleClose}>Cancel</button>
        <button className='btn btn-success' type='submit'>Save</button>
      </div>
    </form>
  </Modal.Body>
</Modal>




      <Modal show={showUpdateStaff} onHide={handleClose} backdrop="static" className=''>
          <Modal.Header closeButton  >
            <Modal.Title className='text-secondary'>Update Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form className='ms-2' onSubmit={updateStaffHandler} >
              <div className='row'>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='name'>Name :</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control w-50 col-7"
                    placeholder="Enter Staff Name"
                    value={staff.name}
                    onChange={HandleChange}
                    maxLength={30}
                    required
                    onKeyPress={(e) => {
                        const isValidInput = /[A-Za-z]/;
                        if (!isValidInput.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                  />
                </div>
                <small className='ms-5'>{validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}</small>
                <div className='d-flex my-1'>
                    <label className='form-label fw-bold mt-2 col-5' htmlFor='fathername'>Father's Name :</label>
                    <input
                        type="text"
                        name="fathername"
                        id="fathername"
                        className="form-control w-50 col-7"
                        placeholder="Enter Father's Name"
                        value={staff.fathername}
                        onChange={HandleChange}
                        maxLength={30}
                        onKeyPress={(e) => {
                            const isValidInput = /[A-Za-z]/;
                                if (!isValidInput.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        required
                    />
                </div>
                <small className='ms-5'>{validationErrors.fathername && <span className="text-danger">{validationErrors.fathername}</span>}</small>
              </div>
              <div className='row'>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='mobileno'>Mobile No. :</label>
                  <input
                    type="text"
                    name="mobileno"
                    id="mobileno"
                    className="form-control w-50 col-7"
                    placeholder="Enter Mobile Number"
                    value={staff.mobileno}
                    onChange={HandleChange}
                    maxLength={10}
                    onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                            e.preventDefault();
                        }
                        }}
                    required
                    />
                </div>
                <small className='ms-5'>{validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}</small>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='altmobileno'>Alternate Mobile No. :</label>
                  <input
                    type='text'
                    name='altmobileno'
                    id='altmobileno'
                    className='form-control w-50 col-7'
                    placeholder='Enter Altetnate Mobile Number'
                    value={staff.altmobileno}
                    onChange={HandleChange}
                    maxLength={10}
                    onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                            e.preventDefault();
                        }
                        }}
                  />
                </div>
                <small className='ms-5'>{validationErrors.altmobileno && <span className="text-danger">{validationErrors.altmobileno}</span>}</small>
                <div className='d-flex my-1'>
                <label className='form-label fw-bold mt-2 col-5' htmlFor='email'>Mail-Id :</label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    className='form-control w-50 col-7'
                    placeholder='Enter Mail id'
                    value={staff.email}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <small className='ms-5'>{validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}</small>
              </div>
              <div className='my-1 row'>
                <h5 className='text-secondary fw-bold'>Address</h5>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='houseno'>House No. :</label>
                  <input
                    type='text'
                    name='houseno'
                    id='houseno'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter House Number'
                    value={staff.houseno}
                    onChange={HandleChange}
                  />
                </div>
                <small className='ms-5'>{validationErrors.houseno && <span className="text-danger">{validationErrors.houseno}</span>}</small>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-1 col-5' htmlFor='street'>Street Name :</label>
                  <input
                    type='text'
                    name='street'
                    id='street'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter Street Name'
                    value={staff.street}
                    onChange={HandleChange}
                  />
                </div>
                <small className='ms-5'>{validationErrors.street && <span className="text-danger">{validationErrors.street}</span>}</small>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-1 col-5' htmlFor='city'>City :</label>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter City Name'
                    value={staff.city}
                    onChange={HandleChange}
                  />
                </div>
                <small className='ms-5'>{validationErrors.city && <span className="text-danger">{validationErrors.city}</span>}</small>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-1 col-5' htmlFor='state'>State :</label>
                  <input
                    type='text'
                    name='state'
                    id='state'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter State Name'
                    value={staff.state}
                    onChange={HandleChange}
                  />
                </div>
                <small className='ms-5'>{validationErrors.state && <span className="text-danger">{validationErrors.state}</span>}</small>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-1 col-5' htmlFor='pincode'>PinCode :</label>
                  <input
                    type='text'
                    name='pincode'
                    id='pincode'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter Pincode Name'
                    value={staff.pincode}
                    onChange={HandleChange}
                    maxLength={6}
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                      }
                      }}
                  />
                </div>
                <small className='ms-5'>{validationErrors.pincode && <span className="text-danger">{validationErrors.pincode}</span>}</small>
              </div>
              <div className='row my-1'>
                <div className='d-flex'>
                  <label className="form-label fw-bold mt-1 col-5" htmlFor="availablerooms">Designation:- </label>
                  <select className="form-control w-100" name="availablerooms" id="availablerooms" value={staff.designation} required>
                        <option>Select</option>
                        <option>Cook</option>
                        <option>Sweeper</option>
                        <option>Supervisor</option>
                        <option>Helper</option>
                    </select>
                </div>
              </div>
              <div className='d-flex justify-content-around mt-3'>
                <button className='btn btn-danger' type='clear' onClick={handleClose}>Cancel</button>
                <button className='btn btn-success' type='submit'>Save</button>
              </div>
            </form>
          </Modal.Body>
      </Modal>
        
    </div>
  )
}

export default StaffHome

// import React from 'react'
// import { Link } from 'react-router-dom'

// const StaffHome = () => {
//   return (
//     <div className='container-fluid'>
//         <div className='my-1'>
//               <Link to='/newstaff' className='btn btn-primary w-100'>New Staff</Link>
//             </div>
//             <div className='my-1'>
//               <Link to='/editstaff' className='btn btn-primary w-100'>Edit Staff</Link>
//             </div>
//             <div className='my-1'>
//               <Link to='/staffpayment' className='btn btn-primary w-100'>Staff Payment</Link>
//             </div>
//             <div className='my-1'>
//               <Link to='/stafflist' className='btn btn-primary w-100'>Staff's List</Link>
//             </div>
//             <div className='my-1'>
//               <Link to='/previousstaff' className='btn btn-primary w-100'>Previous Staff</Link>
//             </div>
//     </div>
//   )
// }

// export default StaffHome
