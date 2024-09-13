import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HostelManagement from '../service/HostelManagementService'
import { Modal } from 'react-bootstrap'
import { RegexEmail, RegexHouseNo, RegexMobileNo, RegexName, RegexPincode } from './RegularEx'
import axios from 'axios'
import HostelManagementService from '../service/HostelManagementService'

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
    altmobileno:'',
    email:'',
    workingname:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    roomno:''
  })

  const [validationErrors,setValidationErrors] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    altmobileno:'',
    email:'',
    workingname:'',
    houseno:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    roomno:''
  })

  const HandleClose = () =>{
    setShowAddHosteler(false)
    setShowUpdateHosteler(false);
    setHosteler({
      hostelerid:'',
    name:'',
    fathername:'',
    mobileno:'',
    altmobileno:'',
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

  const HandleSubmit = async(e) => {
    e.preventDefault();

          const data = {
              hostlerName: hosteler.name,
              hostlerFatherName: hosteler.fathername,
              hostlerMobile: hosteler.mobileno,
              hostlerAltMobile: hosteler.altmobileno,
              hostlerEmail: hosteler.email,
              hostlerAddress: `${hosteler.houseno}, ${hosteler.street}, ${hosteler.city}, ${hosteler.state}, ${hosteler.pincode}`,
              hostlerCollegeName: hosteler.workingname,
              hostlerRoomNo: hosteler.roomno,
              hostel: {
                  id: "1" // Assuming you're sending a hostel ID to associate the hostler with a hostel
              }
          }
          
  
    try {
      await HostelManagement.AddNewHostler(data).then(res=>{
        console.log(res.data);
      })
      HandleClose();
      setHosteler('');
      alert('hosterler is added')
      FetchHostelers();
    } 
    catch (error) {
      console.log(error);
    }
  }

  const HandleUpdateHosteler = (hostler) =>{
    console.log(hostler.hostlerId);
    console.log(hostler.hostlerAddress.houseno)
    setHosteler({

      hostelerid :hostler.hostlerId,
      name : hostler.hostlerName,
      fathername : hostler.hostlerFatherName,
      mobileno : hostler.hostlerMobile,
      altmobileno : hostler.altmobile,
      email : hostler.hostlerEmail,
      workingname : hostler.hostlerCollegeName,
      houseno : hostler.houseno,
      street : hostler.hostlerAddress.street,
      city : hostler.hostlerAddress.city,
      state : hostler.hostlerAddress.state,
      pincode : hostler.hostlerAddress.pincode,
      roomno : hostler.hostlerRoomNo,
      
      
    })
    setShowUpdateHosteler(true);
    setShowAddHosteler(false)
  }

  const HostelerUpdateSubmit = async(e) =>{
    e.preventDefault();
    const updatedHosteler = {
      hostlerName : hosteler.name,
      hostlerFatherName : hosteler.fathername,
      hostlerMobile : hosteler.mobileno,
      altmobile : hosteler.altmobileno,
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
      console.log(hostlerid)
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
      const res= await HostelManagementService.GetAllHostlers();
      setHostelerData(res.data);
    }
    catch(error)
    {
        console.log(error.response.data)
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

  return (
    <div className='container-fluid mt-3'>
      <h3 className='fs-bold text-secondary'>Hosteler Management</h3>
      <div className='mt-2 ms-3'>
        <div className='ms-5 mt-3'>
          <button className='btn btn-info fw-semibold ms-5' onClick={HandleNewHosteler}>Add New Hosteler</button>
        </div>
        <div className='mt-2 ms-3'>
          <h5 className='fs-semibold text-secondary'>All Hosteler's Details</h5>
          <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>Sl.No.</th>
                <th className='text-primary'>Room Number</th>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile No.</th>
                <th className='text-primary'>Father Name</th>
                <th className='text-primary'>Mail-id</th>
                <th className='text-primary'>Address</th>
                <th className='text-primary'>Office Name</th>
                <th className='text-primary'>Actions</th>
              </tr>
            </thead>
            <tbody className=''>
              {
                hostelerData.map((item,index)=>(
                  <tr className=''>
                    <td>{index+1}</td>
                    <td>{item.hostlerRoomNo}</td>
                    <td>{item.hostlerName}</td>
                    <td>{item.hostlerEmail}</td>
                    <td>{item.hostlerFatherName}</td>
                    <td>{item.hostlerEmail}</td>
                    <td>{item.hostlerAddress}</td>
                    <td>{item.hostlerCollegeName}</td>
                    <td className='text-center'>
                    <div className='d-flex'>
                      <button className='btn btn-warning mx-2 px-2' onClick={()=>HandleUpdateHosteler(item)}>Edit <i className="fa-solid fa-pen-to-square ms-1"></i></button>
                      <button className='btn btn-danger mx-2 px-2' onClick={()=>DeleteHosteler(item.hostlerId)}>Delete <i className="fa-solid fa-trash ms-2"></i></button>
                    </div>
                  </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showAddHosteler} onHide={HandleClose} backdrop="static" className=''>
          <Modal.Header closeButton  >
            <Modal.Title className='text-secondary'>Add Hosteler</Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form className='ms-2' onSubmit={HandleSubmit}>
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
                    placeholder='Enter Mobile Number'
                    value={hosteler.altmobileno}
                    onChange={HandleChange}
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
                    value={hosteler.email}
                    onChange={HandleChange}
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
                  />
                </div>
                <small className='ms-5'>{validationErrors.pincode && <span className="text-danger">{validationErrors.pincode}</span>}</small>
              </div>
              <div className='row my-1'>
                <div className='d-flex'>
                  <label className='form-label fw-bold mt-2 col-4' htmlFor='roomno'>Room No.</label>
                  <select
                    className="rounded fw-semibold col-8 w-50"
                    name="roomno"
                    id="roomno"
                    value={hosteler.roomno}
                    onChange={HandleChange}
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
              <div className='d-flex justify-content-around mt-3'>
                <button className='btn btn-danger' type='clear' onClick={HandleClose}>Cancel</button>
                <button className='btn btn-success' type='submit'>Save</button>
              </div>
            </form>
          </Modal.Body>
      </Modal>
      {/* from here update */}
      <Modal show={showUpdateHosteler} onHide={HandleClose} backdrop="static" className=''>
          <Modal.Header closeButton  >
            <Modal.Title className='text-secondary'>Add Hosteler</Modal.Title>
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
                    placeholder='Enter Mobile Number'
                    value={hosteler.altmobileno}
                    onChange={HandleChange}
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
                    value={hosteler.email}
                    onChange={HandleChange}
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