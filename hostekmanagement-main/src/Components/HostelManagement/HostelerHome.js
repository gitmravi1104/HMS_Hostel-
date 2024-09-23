import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HostelManagement from '../service/HostelManagementService'
import { Modal } from 'react-bootstrap'
import { RegexEmail, RegexHouseNo, RegexMobileNo, RegexName, RegexPincode } from './RegularEx'
import axios from 'axios'
import HostelManagementService from '../service/HostelManagementService'
import EditHostelers from './EditHostelers'
import Draggable from 'react-draggable';

const HostelerHome = () => {

  const [showAddHosteler,setShowAddHosteler] = useState(false);
  const [hostelerData,setHostelerData] = useState([]);
  const [showUpdateHosteler,setShowUpdateHosteler] = useState(false);
  const [roomData,setRoomData] = useState([]);

  const [hosteler,setHosteler] = useState({
    hostelerid:'',
    name:'',
    fathername:'',
    mobileno:'',
    altmobile:'',
    email:'',
    workingname:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    roomno:'',
    month:'',
    depositeAmount:''
  })

  const [validationErrors,setValidationErrors] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    altmobile:'',
    email:'',
    workingname:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    roomno:'',
    depositeAmount:''
  })

  const HandleClose = () =>{
    setShowAddHosteler(false)
    setShowUpdateHosteler(false);
    setHosteler({
      hostelerid:'',
    name:'',
    fathername:'',
    mobileno:'',
    altmobile:'',
    email:'',
    workingname:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    roomno:''
    })
  }

  const HandleNewHosteler = () =>{
    setShowAddHosteler(true)
  }



  const HandleChange = (e) =>{
    
    const {name,value} = e.target;
    setHosteler({...hosteler,[name]:value})

    

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

    if(name === 'altmobile'){
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

  const HandleSubmit = async(e) => {
    e.preventDefault();

          const data = {
              hostlerName: hosteler.name,
              hostlerFatherName: hosteler.fathername,
              hostlerMobile: hosteler.mobileno,
              altmobile: hosteler.altmobile,
              hostlerEmail: hosteler.email,
              houseno:hosteler.houseno,
              street:hosteler.street,
              city:hosteler.city,
              state:hosteler.state,
              pincode:hosteler.pincode,
              hostlerCollegeName: hosteler.workingname,
              hostlerRoomNo: hosteler.roomno,
              dateOfJoining:hosteler.month,
              depositeAmount:hosteler.depositeAmount,
              hostelName:"SSR",
              hostel: {
                  id: "1" // Assuming you're sending a hostel ID to associate the hostler with a hostel
              }
          }
          
  
    try {
      await HostelManagementService.AddNewHostler(data).then(res=>{
        console.log(res.data);
      })
      HostelManagementService.addPaymentDetails(data).then(res=>{
        console.log(res.data);
      })
      HandleClose();
      setHosteler('');
      alert('hosterler is added')
      FetchHostelers();
    } 
    catch (error) {
      console.log(error);
      alert(error.response.data)
      
    }
  }

  const HandleUpdateHosteler = (item) =>{
    // console.log(hostler.hostlerId);

    // setHosteler({

    //   hostelerid :hostler.hostlerId,
    //   name : hostler.hostlerName,
    //   fathername : hostler.hostlerFatherName,
    //   mobileno : hostler.hostlerMobile,
    //   altmobile : hostler.altmobile,
    //   email : hostler.hostlerEmail,
    //   workingname : hostler.hostlerCollegeName,
    //   houseno : hostler.houseno,
    //   street : hostler.street,
    //   city : hostler.city,
    //   state : hostler.state,
    //   pincode : hostler.pincode,
    //   roomno : hostler.hostlerRoomNo,
      
      
    // })
    // setShowUpdateHosteler(true);
    // setShowAddHosteler(false)

    const hostelerId=item.hostlerId;
    navigate("/edithostelers",{state:{hostelerId}});
  }

  const HostelerUpdateSubmit = async(e) =>{
    e.preventDefault();
    const updatedHosteler = {
      hostlerName : hosteler.name,
      hostlerFatherName : hosteler.fathername,
      hostlerMobile : hosteler.mobileno,
      altmobile : hosteler.altmobile,
      hostlerEmail : hosteler.email,
      hostlerCollegeName : hosteler.workingname,
      houseno : hosteler.houseno,
      street : hosteler.street,
      city : hosteler.city,
      state : hosteler.state,
      pincode : hosteler.pincode,
      hostlerRoomNo : hosteler.roomno
    }

    try {
      await HostelManagement.UpdateHostler(hosteler.hostelerid,updatedHosteler).then(res =>{
        console.log(res.data);
        FetchHostelers();
      })
    } catch (error) {
      console.error('There was an error updating the hosteler:', error);
    }
    HandleClose();
  }

  const DeleteHosteler = async(hostlerid) =>{
    try {
      alert("are you sure to delete....")
      await HostelManagement.DeleteHostler(hostlerid).then(res =>{
        console.log(res.data);
      })
    } catch (error) {
      console.log('error at delete' + error);
    }
    FetchHostelers();
  }

  const FetchHostelers =async () =>{
    try{
      const res= await HostelManagementService.getHostlerByHostelName();
      setHostelerData(res.data);
    }
    catch(error)
    {
        console.log(error)
    }

  }

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
    FetchHostelers();
    GetAllRooms();
  },[])

  const [searchTerm,setSearchTerm] = useState('');
  const HandleSearchChange = (e) =>{
    setSearchTerm(e.target.value);

  }

  const filteredData = searchTerm 
    ? hostelerData.filter(data =>
    data.name.includes(searchTerm) || data.mobileno.includes(searchTerm) || data.roomno.includes(searchTerm))
    : hostelerData;

    console.log(filteredData)
  
  const notFound = searchTerm && hostelerData.length === 0

  const navigate = useNavigate();

  return (
    <div className='container-fluid mt-3'>
      <h4 className=' text-primar my-2 rounded py-2 text-center text-light fw-bold bg-dark'>Hosteler Management</h4>
      <div className='mt-2 ms-3'>
      <div className=" mt-3 d-flex justify-content-between">
            <button className="btn btn-info fw-bold px-3 ms-5" onClick={HandleNewHosteler}>Add Hostler</button>
            <button className='btn btn-info fw-bold px-3 me-5' onClick={()=> navigate("/hostelersfees")}>Payment Details</button>
        </div>
        <div className='mt-2 ms-3'>
          <h5 className='fs-semibold  fw-bold text-center'>All Hosteler's Details</h5>
          <div className='row'>
            <div className='col-6 my-3'>
            <p className='fw-semibold fs-5 me-lg-3'>Total Number of Hostelers : <span className='fw-bold'> &nbsp;{hostelerData.length}</span></p>
              
              {notFound && <h5 className='text-danger mt-3 text-center'>No Hostelers Found.</h5>}
              {searchTerm && !notFound && (
                <h5 className="text-dark mt-3 text-center">{filteredData.length} Hosteler Found.</h5>
                )}
            </div>
            <div className='col-6 my-3 d-flex justify-content-end'>
            <input
                type="search"
                className="form-control w-75 ms-lg-5"
                placeholder="Search by Name or Mobile No. or Room No."
                value={searchTerm}
                onChange={HandleSearchChange}
              />
            </div>
          </div>
       
          <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>SI.No.</th>
                <th className='text-primary'>Room</th>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile</th>
                <th className='text-primary'>More Details</th>
              </tr>
            </thead>
            <tbody className='text-center'>
            {!notFound && filteredData.length > 0 && (
                filteredData.map((item,index)=>(
                  <tr >
                    <td>{index+1}</td>
                    <td>{item.hostlerRoomNo}</td>
                    <td>{item.hostlerName}</td>
                    <td>{item.hostlerMobile}</td>
                    <td><button className='rounded-circle' onClick={()=>HandleUpdateHosteler(item)}  ><i class="fa-solid fa-ellipsis"></i></button></td>
                  </tr>
                ))
              )}
              
            </tbody>
           
          </table>
         {/* {filteredData.length===0 &&  <h3 className='text-center fw-bold '>No Data Found. Please Add Guest Details</h3>  } */}
        
             
        </div>
       
      </div>
      <Modal show={showAddHosteler} onHide={HandleClose} backdrop="static"   dialogClassName="custom-modal-dialog" 
  className="custom-modal">
  <Modal.Header closeButton className='custom-modal-header '>
    <Modal.Title className='fw-bold text-center'>Add Hosteler</Modal.Title>
  </Modal.Header>
  <Modal.Body className='mx-3 custom-modal-body'>
    <form className='ms-2' onSubmit={HandleSubmit}>
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
              placeholder='Enter Hosteler Name'
              value={hosteler.name}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='fathername'>Father's Name:</label>
            <input
              type='text'
              name='fathername'
              id='fathername'
              className='form-control'
              placeholder='Enter Father`s Name'
              value={hosteler.fathername}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='email'>Mail-Id:</label>
            <input
              type='text'
              name='email'
              id='email'
              className='form-control'
              placeholder='Enter Mail id'
              value={hosteler.email}
              onChange={HandleChange}
              required
            />
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='mobileno'>Mobile No.:</label>
            <input
              type='text'
              name='mobileno'
              id='mobileno'
              className='form-control'
              placeholder='Enter Mobile Number'
              maxLength={10}
              value={hosteler.mobileno}
              onChange={HandleChange}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='altmobile'>Alternate Mobile No.:</label>
            <input
              type='text'
              name='altmobile'
              id='altmobile'
              className='form-control'
              placeholder='Enter Alternate Mobile Number'
              value={hosteler.altmobile}
              onChange={HandleChange}
              maxLength={10}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
            </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='workingname'>Office Name:</label>
            <input
              type='text'
              name='workingname'
              id='workingname'
              className='form-control'
              placeholder='Enter Office Name'
              value={hosteler.workingname}
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
              className='form-control'
              placeholder='Enter House Number'
              value={hosteler.houseno}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='street'>Street Name:</label>
            <input
              type='text'
              name='street'
              id='street'
              className='form-control'
              placeholder='Enter Street Name'
              value={hosteler.street}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='city'>City:</label>
            <input
              type='text'
              name='city'
              id='city'
              className='form-control'
              placeholder='Enter City Name'
              value={hosteler.city}
              onChange={HandleChange}
              required
            />
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
              value={hosteler.state}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='pincode'>PinCode:</label>
            <input
              type='text'
              name='pincode'
              id='pincode'
              className='form-control'
              placeholder='Enter Pincode'
              value={hosteler.pincode}
              onChange={HandleChange}
              maxLength={6}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
          </div>
        </div>
      </div>
      <hr/>

      {/* Date & Room Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary fw-bold text-center'>Date & Room Details</h5>
        <div className='row'>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='month'>DOJ:</label>
            <input
              type='date'
              name='month'
              id='month'
              className='form-control'
              value={hosteler.month}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='roomno'>Room No.:</label>
            <select
              className='form-control'
              name='roomno'
              id='roomno'
              value={hosteler.roomno}
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
            <label className='form-label fw-bold' htmlFor='depositeAmount'>Deposite Amount</label>
            <input
              type='text'
              name='depositeAmount'
              id='depositeAmount'
              placeholder='Enter Deposit amount'
              className='form-control '
              value={hosteler.depositeAmount}
              onChange={HandleChange}
              required
            />
          </div>
      
      </div>
      </div>

      <div className='d-flex justify-content-around mt-3'>
        <button className='btn btn-danger' type='button' onClick={HandleClose}>Cancel</button>
        <button className='btn btn-success' type='submit'>Save</button>
      </div>
    </form>
  </Modal.Body>
</Modal>



      

      {/* from here update */}
      <Modal show={showUpdateHosteler} onHide={HandleClose} backdrop="static" className=''>
          <Modal.Header closeButton  >
            <Modal.Title className='text-secondary'>Update Hosteler</Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form className='ms-2' onSubmit={HostelerUpdateSubmit}>
              <div className='row'>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='name'>Name :</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control w-50 col-7'
                    placeholder='Enter Hosteler Name'
                    value={hosteler.name}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <small className='ms-5'>{validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}</small>
                <div className='d-flex my-1'>
                <label className='form-label fw-bold mt-2 col-5' htmlFor='fathername'>Father's Name :</label>
                  <input
                    type='text'
                    name='fathername'
                    id='fathername'
                    className='form-control w-50 col-7'
                    placeholder='Enter Father`s Name'
                    value={hosteler.fathername}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <small className='ms-5'>{validationErrors.fathername && <span className="text-danger">{validationErrors.fathername}</span>}</small>
              </div>
              <div className='row'>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='mobileno'>Mobile No. :</label>
                  <input
                    type='text'
                    name='mobileno'
                    id='mobileno'
                    className='form-control w-50 col-7'
                    placeholder='Enter Mobile Number'
                    value={hosteler.mobileno}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <small className='ms-5'>{validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}</small>
                <div className='d-flex my-1'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='altmobile'>Alternate Mobile No. :</label>
                  <input
                    type='text'
                    name='altmobile'
                    id='altmobile'
                    className='form-control w-50 col-7'
                    placeholder='Enter Mobile Number'
                    value={hosteler.altmobile}
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
                <small className='ms-5'>{validationErrors.altmobile && <span className="text-danger">{validationErrors.altmobile}</span>}</small>
                <div className='d-flex my-1'>
                <label className='form-label fw-bold mt-2 col-5' htmlFor='email'>Mail-Id :</label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    className='form-control w-50 col-7'
                    placeholder='Enter Mail id'
                    value={hosteler.email}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <small className='ms-5'>{validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}</small>
              </div>
              <div className='row my-1'>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='workingname'>Office Name :</label>
                  <input
                    type='text'
                    name='workingname'
                    id='workingname'
                    className='form-control w-50 col-7'
                    placeholder='Enter office Name'
                    value={hosteler.workingname}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>
              <div className='my-1'>
                <h5 className='text-secondary fw-bold'>Address</h5>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-2 col-5' htmlFor='houseno'>House No. :</label>
                  <input
                    type='text'
                    name='houseno'
                    id='houseno'
                    className='form-control w-50 col-7 mb-1'
                    placeholder='Enter House Number'
                    value={hosteler.houseno}
                    onChange={HandleChange}
                    required
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
                    value={hosteler.street}
                    onChange={HandleChange}
                    required
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
                    value={hosteler.city}
                    onChange={HandleChange}
                    required
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
                    value={hosteler.state}
                    onChange={HandleChange}
                    required
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
                    value={hosteler.pincode}
                    onChange={HandleChange}
                    maxLength={6}
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                      }
                      }}
                      required
                  />
                </div>
                <small className='ms-5'>{validationErrors.pincode && <span className="text-danger">{validationErrors.pincode}</span>}</small>
              </div>
              <div className='row my-1'>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-2 col-4' htmlFor='availablerooms'>Room No.</label>
                  <select
                    className="rounded fw-semibold col-8 w-50"
                    name="roomno"
                    id="roomno"
                    value={hosteler.roomno}
                    onChange={HandleChange}
                    required
                  >
                    <option value="">Select</option>
                    {roomData.map((room, index) => (
                      <option key={index} value={room.roomNumber}> {/* Adjust 'room.roomNo' to match your API structure */}
                        {room.roomNumber} {/* Display the room number */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <input type='month' />
              </div>
              <div className='d-flex justify-content-around mt-3'>
                <button className='btn btn-danger' type='clear' onClick={HandleClose}>Cancel</button>
                <button className='btn btn-success' type='submit'>Save</button>
              </div>
            </form>
          </Modal.Body>
      </Modal>

     


    </div>
    
  )
}

export default HostelerHome