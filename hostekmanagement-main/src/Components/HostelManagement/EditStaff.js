import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HostelManagementService from '../service/HostelManagementService';
import { useAccordionButton } from 'react-bootstrap';
import { RegexEmail, RegexHouseNo, RegexMobileNo, RegexName, RegexPincode } from './RegularEx';

const EditStaff = () => {
  
  const { state } = useLocation();
  const staffId = state?.staffId;
  
  
  const [editStaff,setEditStaff] = useState({
    id:'',
    name:'',
    fatherName:'',
    mobile:'',
    altmobile:'',
    email:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    designation:'',
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
    designation:''
    })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setEditStaff({...editStaff,[name]:value})

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

  const[staffData, setStaffData]=useState([]);


    const fetchStaffData = async () => {
      if (staffId) {
        try {
          const res = await HostelManagementService.getStaffById(staffId);
          setEditStaff(res.data);
          console.log(res.data)
        } catch (error) {
          console.log("Error fetching staff data:", error);
          // alert(error.response?.data || "Error fetching data");
        }
      }
    };
    useEffect(()=>
    {
      fetchStaffData();
    },[staffId])



  const [isEditable, setIsEditable] = useState(false);

  const handleEditToggle = () => {
    setEditStaff(editStaff);
    setIsEditable(prevState => !prevState); // Toggle the editable state
  };
  

  const StaffUpdateSubmit = async(e) =>{
    e.preventDefault();

 
    const updatedStaff = {
      name:editStaff.name,
      fatherName:editStaff.fatherName,
      mobile:editStaff.mobile,
      altmobile:editStaff.altmobile,
      email:editStaff.email,
      houseno:editStaff.houseno,
      street:editStaff.street,
      city:editStaff.city,
      state:editStaff.state,
      pincode:editStaff.pincode,
      designation:editStaff.designation,
      dateOfJoining:editStaff.dateOfJoining,
      hostel:{
        hostelName:"SSR"
      }
    }

    try {
    
      await HostelManagementService.UpdateStaff(staffId,updatedStaff).then(res =>{
        console.log(res.data);
        setIsEditable(false)
      })
    } catch (error) {
      console.error('There was an error updating the Staff:', error);
    }

    fetchStaffData();
  }
  
  const DeleteHosteler = () =>{
    try {
      alert("are you sure to delete....")
       HostelManagementService.DeleteStaff(staffId).then(res =>{
        console.log(res.data);
      })
    } catch (error) {
      console.log('error at delete' + error);
    }

    fetchStaffData();
  }


  


  return (
    <div className='container-fluid mt-3'>
       <h4 className='fs-semibold text-primar my-2 rounded py-2 text-center text-light fw-bold bg-dark d-flex justify-content-center align-items-center position-relative '>
          Staff Details
        <span className='position-absolute end-0 me-5 '>
           <i className="fa-solid fa-pen-to-square" onClick={handleEditToggle}></i>
           <i className="fa-solid fa-trash ms-2 text-danger ms-5" onClick={DeleteHosteler}></i>
        </span>
      </h4>
      <div className='mt-2 ms-3'>
      <form className='ms-2 my-4' >
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter staff Name'
              value={editStaff.name}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Father`s Name'
              value={editStaff.fatherName}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Mail id'
              value={editStaff.email }
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Mobile Number'
              maxLength={10}
              value={editStaff.mobile}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Alternate Mobile Number'
              value={editStaff.altmobile}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter House Number'
              value={ editStaff.houseno }
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Street Name'
              value={editStaff.street }
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter City Name'
              value={editStaff.city }
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter State Name'
              value={editStaff.state}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Pincode'
              value={editStaff.pincode}
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
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              value={editStaff.dateOfJoining}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-6'>
          <label className="form-label fw-bold mt-1 col-5" htmlFor="designation">Designation:- </label>
                  <select className={`form-control ${!isEditable ? 'blurred' : ''}`} name="designation" id="designation"  value={editStaff.designation} onChange={HandleChange} required>
                        <option value=''>Select</option>
                        <option value="cook">Cook</option>
                        <option value="Sweeper">Sweeper</option>
                        <option value='supervisor'>Supervisor</option>
                        <option value='Helper'>Helper</option>
                    </select>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between me-5'>

    
{isEditable && (
          <button
            type='button'
            className='btn btn-danger fw-bold  ms-5 '
            onClick={() => setIsEditable(false)}  // Button to cancel edit
          >
            Cancel
          </button>
        )}
{isEditable ? <button
          type='button'
          className='btn btn-success fw-bold px-3' 
        onClick={StaffUpdateSubmit} // Button to toggle edit mode
        >
        Save
        </button> :''}
        </div>


      
    </form>

      </div>
    </div>
  )
}

export default EditStaff