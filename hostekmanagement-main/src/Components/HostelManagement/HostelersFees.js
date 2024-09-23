import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import HostelManagementService from '../service/HostelManagementService';

export default function HostelersFees() {

  const [searchTerm, setSearchTerm] = useState('');
  const [roomData,setRoomData] = useState([]);
  const[paymentDetails, setPaymentDetails]=useState([]);
  

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

  const [paymentData, setPaymentData]=useState(
    {
    id:'',
    name:'',
    room:'',
    mobileno:'',
    email:'',
    dueDate:'',
    startDate:'',
    paymentAmount:'',
    paymentStatus: 'Unpaid'
    }
  );

  const HandleChange=(e)=>
    {
      const {name,value} = e.target;
      setPaymentData({...paymentData,[name]:value})
    }
  
      const handlePaymentDetails=async()=>
      {
        try {

          const res=await HostelManagementService.getPaymentDetailsByHostelName();
          setPaymentDetails(res.data);
          
        } catch (error) {
          console.log(error)
          // alert(error.response)
        }
      }
      
      useEffect(()=>
      {
        handlePaymentDetails();
      },[])
     


  const HandleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    
  };


    const results = searchTerm
      ? paymentDetails.filter(item => item.dueDate.includes(searchTerm))
      : paymentDetails;

 


  // Determine if no results are found
  const notFound = searchTerm && paymentDetails.length === 0;

  

 
  const [showPaymentModal, setShowPaymentModal]=useState(false)

  const handlePaymentStatus=async(item)=>
  {
    setPaymentData({
      
      id:item.id,
      name:item.hostlerName,
      room:item.hostlerRoomNo,
      mobileno:item.hostlerMobile,
      email:item.hostlerEmail,
      dueDate:item.dueDate,
      paymentStatus: item.paymentStatus,
      paymentAmount:item.paymentAmount,
      startDate:item.startDate
  

    }) 
    console.log(item)

    setShowPaymentModal(!showPaymentModal);
  }
  
  const handleClose=()=>
  {
    setShowPaymentModal(!showPaymentModal)
  }

  const HandleSubmit= async(e)=>
  {
    e.preventDefault();


    // setPaymentData({
      
    //   id:paymentData.id,
    //   name:paymentData.hostlerName,
    //   room:paymentData.hostlerRoomNo,
    //   mobileno:paymentData.hostlerMobile,
    //   email:paymentData.hostlerEmail,
    //   dueDate:paymentData.dueDate,
    //   paymentStatus: paymentData.paymentStatus,
    //   paymentAmount:paymentData.paymentAmount

    // }) 
 

    const data={
      id:paymentData.id,
      hostlerMobile:paymentData.mobileno,
      hostlertEmail:paymentData.email,
      hostlerName:paymentData.name,
      hostlerRoomNo:paymentData.room,
      paymentStatus:paymentData.paymentStatus,
      paymentAmount:paymentData.paymentAmount,
      dueDate:paymentData.dueDate,
      startDate:paymentData.startDate,
      hostelName:"SSR"
    }
    console.log(data)
    try {
      const id=data.id;
      const res= await HostelManagementService.updatePaymentDetails(id, data);
      console.log(res.data)
    console.log(res.data)
    } catch (error) {
      console.log(error)
      // alert(error.response.data)
      
    }    

    handleClose();
    
    handlePaymentDetails();
   
    
  }




  

  return (
    <>
       <div className='container-fluid mt-3'>
      <div className='row'>
      <h4 className=' text-primar my-2 rounded py-2 text-center text-light fw-bold bg-dark'>Payment History</h4>
      <div className='col-6 my-3  '>
          <p className='fw-semibold ms-lg-5 '>Total Number of Payments: <span className='fw-bold'> {paymentDetails.length}</span></p>
        </div>
        <div className='col-6 my-3 d-flex justify-content-end '>
          <input
            type="month"
            className="form-control w-50 me-lg-5"
            placeholder="Search by Month"
            value={searchTerm}
            onChange={HandleSearchChange}
          />
          
          
        </div>
        {notFound && <span className='text-danger  text-center '>No Payments Found.</span>}
          {searchTerm && !notFound && (
            <span className="text-dark m text-center">{results.length} Payment(s) Found.</span>
          )}
      </div>


      <div className='mt-2 ms-3'>
        <div className='ms-2 mt-3'>
          <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>Sl.No.</th>
                <th className='text-primary'>Room</th>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile</th>
                <th className='text-primary'>startDate</th>
                <th className='text-primary'>dueDate</th>
                <th className='text-primary'>Payment Status</th>
              </tr>
            </thead>
            <tbody className='text-center'>
                    {results.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.hostlerRoomNo}</td>
                        <td>{item.hostlerName}</td>
                        <td>{item.hostlerMobile}</td>
                        <td>{item.startDate}</td>
                        <td>{item.dueDate}</td>
                        <td>
                        <button
                          className={` btn btn-paymentStatus ${item.paymentStatus === 'Paid' ? 'btn-success px-5' : 'btn-danger px-4'}`}
                          onClick={() => handlePaymentStatus(item)}
                           >
                           {item.paymentStatus === 'Paid' ? 'Paid' : 'Pending'}
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>

          </table>
        </div>
      </div>

      <Modal show={showPaymentModal} onHide={handleClose} backdrop="static"   dialogClassName="custom-modal-dialog" 
  className="custom-modal">
  <Modal.Header closeButton>
    <Modal.Title className='text-secondary text-center'>Add Hosteler</Modal.Title>
  </Modal.Header>
  <Modal.Body className='mx-3'>
    <form className='ms-2 ' onSubmit={HandleSubmit}>
      {/* Personal Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary text-center fw-bold'>Personal Details</h5>
        <div className='row'>
          <div className='col-4 '>
            <label className='form-label fw-bold' htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-control blurred '
              placeholder='Enter Hosteler Name'
              value={paymentData.name}
              onChange={HandleChange}
              required
              readOnly
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='mobileno'>Mobile:</label>
            <input
              type='text'
              name='mobileno'
              id='mobileno'
              className='form-control blurred '
              placeholder='Enter Mobile Number'
              maxLength={10}
              value={paymentData.mobileno}
              onChange={HandleChange}
              onKeyPress={(e) => {
                const isValidInput = /[0-9]/;
                if (!isValidInput.test(e.key)) e.preventDefault();
              }}
              required
            />
          </div>
         
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='room'>Room Number:</label>
            <select
              className='form-control blurred '
              name='room'
              id='room'
              value={paymentData.room}
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
        </div>
        </div>
      <hr/>

      {/* Date & Room Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary fw-bold text-center'>Date & Room Details</h5>
        <div className='row'>
     
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='startDate'>End Date:</label>
            <input
              type='date'
              name='startDate'
              id='startDate'
              className='form-control'
              value={paymentData.startDate}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='paymentAmount'>Amount:</label>
            <input
              type='text'
              name='paymentAmount'
              id='paymentAmount'
              className='form-control'
              value={paymentData.paymentAmount}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='dueDate'>End Date:</label>
            <input
              type='date'
              name='dueDate'
              id='dueDate'
              className='form-control'
              value={paymentData.dueDate}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-3'>
          <label className="form-label fw-bold mt-1 " htmlFor="paymentStatus">Payment Status: </label>
                  <select className="form-control w-100" name="paymentStatus" id="paymentStatus" value={paymentData.paymentStatus} onChange={HandleChange} required>
                        <option value=''>Select</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid" >Unpaid</option>
                       
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
</div>
    </>
  );
}
