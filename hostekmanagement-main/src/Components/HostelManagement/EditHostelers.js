import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HostelManagementService from '../service/HostelManagementService';
import { useAccordionButton } from 'react-bootstrap';
import { HMContextCreater } from '../Context/Context';
import { RegexEmail, RegexHouseNo, RegexMobileNo, RegexName, RegexPincode } from './RegularEx';

const EditHostelers = () => {

  const {dataCon} = useContext(HMContextCreater);
  
  const hostelerId = dataCon.hostelerId;
 
  const [isEditable, setIsEditable] = useState(false);
 
  const [editHostler,setEditHostler] = useState({
    id:'',
    hostlerName:'',
    hostlerFatherName:'',
    hostlerMobile:'',
    altmobile:'',
    hostlerEmail:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    hostlerCollegeName:'', 
    depositeAmount:'',
    hostlerRoomNo:'',
    dateOfJoining:''
  })

  const [validationErrors,setValidationErrors] = useState({
    hostlerName:'',
    hostlerFatherName:'',
    hostlerMobile:'',
    altmobile:'',
    hostlerEmail:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    hostlerCollegeName:'', 
    depositeAmount:'',
    hostlerRoomNo:'',
    dateOfJoining:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setEditHostler({...editHostler,[name]:value})

    if(name === 'hostlerName'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Name must be 3 or more characters'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'hostlerFatherName'){
      if(!RegexName.test(value)){
        setValidationErrors({...validationErrors, [name]:'Father Name must be 3 or more characters'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'hostlerMobile'){
      if(!RegexMobileNo.test(value)){
        setValidationErrors({...validationErrors, [name]:'Mobile number is invalid!'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'altmobile'){
      if(!RegexMobileNo.test(value)){
        setValidationErrors({...validationErrors, [name]:'Mobile number is invalid!'})
      }else{
        setValidationErrors({...validationErrors,[name]:''})
      }
    }

    if(name === 'hostlerEmail'){
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

  const handleEditToggle = () => {
    setEditHostler(editHostler);
    setIsEditable(prevState => !prevState); // Toggle the editable state
  };
  

  const[HostlerData, setHostlerData]=useState([]);

  const fetchHostlerData = async () => {
    if (hostelerId) {
      try {
        const res = await HostelManagementService.GetHostlerById(hostelerId);
        setEditHostler(res.data);
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching staff data:", error);
        // alert(error.response?.data || "Error fetching data");
      }
    }

  };

  useEffect(() => {
    fetchHostlerData();
  }, []);

  const[roomData,setRoomData]=useState([])
  const GetAllRooms = async() =>{
    try {
      await HostelManagementService.getRoomsByHostelName().then(res=>{
        setRoomData(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    GetAllRooms();
  },[])

  const HostelerUpdateSubmit = async(e) =>{
    e.preventDefault();
    const updatedHosteler = {
      hostlerName : editHostler.hostlerName,
      hostlerFatherName : editHostler.hostlerFatherName,
      hostlerMobile : editHostler.hostlerMobile,
      altmobile : editHostler.altmobile,
      hostlerEmail : editHostler.hostlerEmail,
      hostlerCollegeName : editHostler.hostlerCollegeName,
      houseno : editHostler.houseno,
      street : editHostler.street,
      city : editHostler.city,
      state : editHostler.state,
      pincode : editHostler.pincode,
      hostlerRoomNo : editHostler.hostlerRoomNo,
      dateOfJoining:editHostler.dateOfJoining,
      depositeAmount:editHostler.depositeAmount,
      hostelName:"SSR"
    }
    try {
      console.log(updatedHosteler)
      await HostelManagementService.UpdateHostler(hostelerId,updatedHosteler).then(res =>{
        console.log(res.data);
        setIsEditable(false)
      })
    } catch (error) {
      console.error('There was an error updating the hosteler:', error);
    }

    fetchHostlerData();
  }
  const DeleteHosteler = () =>{
    try {
      alert("are you sure to delete....")
       HostelManagementService.DeleteHostler(hostelerId).then(res =>{
        console.log(res.data);
      })
    } catch (error) {
      console.log('error at delete' + error);
    }

    fetchHostlerData();
  }
  
  return (
    <div className='container-fluid mt-3'>
     <h4 className='fs-semibold text-primar my-2 rounded py-2 text-center text-light fw-bold bg-dark d-flex justify-content-center align-items-center position-relative '>
          Hostler Details
        <span className='position-absolute end-0 me-5 '>
           <i className="fa-solid fa-pen-to-square" onClick={handleEditToggle}></i>
           <i className="fa-solid fa-trash ms-2 text-danger ms-5" onClick={DeleteHosteler}></i>
        </span>
      </h4>
      <div className='mt-2 ms-3 my-5'>
      <form className='ms-2' >
      {/* Personal Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary text-center fw-bold '>Personal Details</h5>
        <div className='row'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='hostlerName'>Name:</label>
            <input
              type='text'
              name='hostlerName'
              id='hostlerName'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter hoster Name'
              // value={isEditable ? editHostler.hostlerName : HostlerData.hostlerName}
              value={editHostler.hostlerName}
              onChange={HandleChange}
              required
            />
            {validationErrors.hostlerName && <small className="text-danger">{validationErrors.hostlerName}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='hostlerFatherName'>Father's Name:</label>
            <input
              type='text'
              name='hostlerFatherName'
              id='hostlerFatherName'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Father`s Name'
              // value={isEditable ? editHostler.hostlerFatherName : HostlerData.hostlerFatherName}
              value={editHostler.hostlerFatherName }
              onChange={HandleChange}
              required
            />
            {validationErrors.hostlerFatherName && <small className="text-danger">{validationErrors.hostlerFatherName}</small>}
          </div>
          <div className='col-4'>
          <label className='form-label fw-bold' htmlFor='hostlerEmail'>Mail-Id:</label>
            <input
              type='text'
              name='hostlerEmail'
              id='hostlerEmail'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Mail id'
              // value={isEditable ? editHostler.hostlerEmail : HostlerData.hostlerEmail}
              value={editHostler.hostlerEmail}
              onChange={HandleChange}
              required
            />
            {validationErrors.hostlerEmail && <small className="text-danger">{validationErrors.hostlerEmail}</small>}
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='hostlerMobile'>Mobile No:</label>
            <input
              type='text'
              name='hostlerMobile'
              id='hostlerMobile' 
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Mobile Number'
              maxLength={10}
              // value={isEditable ? editHostler.hostlerMobile : HostlerData.hostlerMobile}
              value={editHostler.hostlerMobile}
              onChange={HandleChange}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            {validationErrors.hostlerMobile && <small className="text-danger">{validationErrors.hostlerMobile}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='altmobile'>Alternate Mobile No:</label>
            <input
              type='text'
              name='altmobile'
              id='altmobile'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Alternate Mobile Number'
              // value={isEditable ? editHostler.altmobile : HostlerData.altmobile}
              value={editHostler.altmobile}
              onChange={HandleChange}
              maxLength={10}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            {validationErrors.altmobile && <small className="text-danger">{validationErrors.altmobile}</small>}
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='hostlerCollegeName'>Office Name:</label>
            <input
              type='text'
              name='hostlerCollegeName'
              id='hostlerCollegeName'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              placeholder='Enter Office Name'
              // value={isEditable ? editHostler.hostlerCollegeName : HostlerData.hostlerCollegeName}
              value={editHostler.hostlerCollegeName}
              onChange={HandleChange}
              required
            />
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
              // value={isEditable ? editHostler.houseno : HostlerData.houseno}
              value={editHostler.houseno }
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
              // value={isEditable ? editHostler.street : HostlerData.street}
              value={editHostler.street}
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
              // value={isEditable ? editHostler.city : HostlerData.city}
              value={editHostler.city}
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
              // value={isEditable ? editHostler.state : HostlerData.state}
              value={editHostler.state}
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
              // value={isEditable ? editHostler.pincode : HostlerData.pincode}
               value={editHostler.pincode}
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
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='dateOfJoining'>Date of Joining:</label>
            <input
              type='date'
              name='dateOfJoining'
              id='dateOfJoining'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              // value={isEditable ? editHostler.dateOfJoining : HostlerData.dateOfJoining}
              value={editHostler.dateOfJoining}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='hostlerRoomNo'>Room No.:</label>
            <select
           className={`form-control ${!isEditable ? 'blurred' : ''}`}
              name='hostlerRoomNo'
              id='hostlerRoomNo'
              // value={isEditable ? editHostler.hostlerRoomNo : HostlerData.hostlerRoomNo}
              value={editHostler.hostlerRoomNo}
              onChange={HandleChange}
              required
            >
              <option value="">Select</option>
              {roomData.map((room, index) => (
                <option key={index} value={room.roomNumber}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='depositeAmount'>Amount</label>
            <input
              type='text'
              name='depositeAmount'
              id='depositeAmount'
              placeholder='Enter payment amount'
              className={`form-control ${!isEditable ? 'blurred' : ''}`}
              // value={isEditable ? editHostler.paymentAmount : HostlerData.paymentAmount}
              value={editHostler.depositeAmount}
              onChange={HandleChange}
              required 
            />
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
              onClick={HostelerUpdateSubmit} // Button to toggle edit mode
              >
              Save
              </button> :''}
              </div>
      
    </form>
      </div>
    </div>
  )
}

export default EditHostelers