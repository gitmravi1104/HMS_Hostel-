import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HostelManagementService from '../service/HostelManagementService';
import { Modal } from 'react-bootstrap';

export default function StaffPayment() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const[paymentDetails, setPaymentDetails]=useState([]);
  

  
  const [paymentData, setPaymentData]=useState(
    {
    id:'',
    name:'',
    room:'',
    mobileno:'',
    email:'',
    designation:'',
    paymentDate:'',
    paymentAmount:'',
    paymentStatus: 'Unpaid'
    }
  );

  const HandleChange=(e)=>
    {
      const {name,value} = e.target;
      setPaymentData({...paymentData,[name]:value})
    }
  

  
  const [showPaymentModal, setShowPaymentModal]=useState(false)

  const HandlePaymentDetails=async()=>
  {
    try{
    const res = await HostelManagementService.getStaffPaymentDetailsByHostelName();
    setPaymentDetails(res.data);
    }
    catch(error)
    {
      console.log(error)
    }
  }
   
    useEffect(() => {
    HandlePaymentDetails();
      }, []);

      const handlePaymentStatus=async(item)=>
        {
          setPaymentData({
            
            id:item.id,
            name:item.name,
            mobileno:item.mobile,
            paymentStatus: item.paymentStatus,
            designation:item.designation
      
          }) 
          console.log(item)
      
          setShowPaymentModal(!showPaymentModal);
        }


  const HandleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
   

  const HandleSubmit= async(e)=>
    {
      e.preventDefault();
  
   
  
      const data={

        mobile:paymentData.mobileno,
        name:paymentData.name,
        designation:paymentData.designation,
        paymentStatus:paymentData.paymentStatus,
        paymentAmount:paymentData.paymentAmount,
        paymentDate:paymentData.paymentDate,
        hostel:{
          hostelName:"SSR"
        }
      }
      console.log(data)
      try {
        const res= await HostelManagementService.addStaffPayment(data);
        console.log(res.data)
      console.log(res.data)
      } catch (error) {
        console.log(error)
        // alert(error.response.data)
        
      }    
  
      handleClose();
      
      // handlePaymentDetails();
     
      
    }


    const results = searchTerm
      ? paymentDetails.filter(item => item.paymentDate.includes(searchTerm))
      : paymentDetails;


  // Determine if no results are found
  const notFound = searchTerm && results.length === 0;

  const handleClose=()=>
    {
      setShowPaymentModal(!showPaymentModal)
    }

  return (
    <>
      <div className='row'>
      <h3 className='fs-bold text-secondary text-center '>Payment History</h3>
      <div className='col-6 my-3  '>
          <p className='fw-semibold ms-lg-5 '>Total Number of Hostelers: <span className='fw-bold'> {results.length}</span></p>
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
        {notFound && <span className='text-danger  text-center '>No Hostelers Found.</span>}
          {searchTerm && !notFound && (
            <span className="text-dark m text-center">{results.length} Hosteler(s) Found.</span>
          )}
      </div>


      <div className='mt-2 ms-3'>
        <div className='ms-5 mt-3'>
          <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>Sl.No.</th>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile No.</th>
                <th className='text-primary'>DOJ</th>
                <th className='text-primary'>Amount</th>
                <th className='text-primary'>Payment Status</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.paymentDate}</td>
                  <th>{item.paymentAmount}</th>
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
          <label className="form-label fw-bold mt-1 col-5" htmlFor="designation">Designation:- </label>
                  <select className="form-control w-100 blurred" name="designation" id="designation" value={paymentData.designation} onChange={HandleChange} required>
                        <option value=''>Select</option>
                        <option value="cook">Cook</option>
                        <option value="Sweeper">Sweeper</option>
                        <option value='supervisor'>Supervisor</option>
                        <option value='Helper'>Helper</option>
                    </select>
          </div>
        </div>
        </div>
      <hr/>

      {/* Date & Room Details Section */}
      <div className='mb-3'>
        <h5 className='text-primary fw-bold text-center'>Date & Room Details</h5>
        <div className='row'>
     
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='dueDate'>Payment Date</label>
            <input
              type='date'
              name='paymentDate'
              id='paymentDate'
              className='form-control'
              value={paymentData.paymentDate}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
            <label className='form-label fw-bold' htmlFor='paymentAmount'>Amount:</label>
            <input
              type='text'
              name='paymentAmount'
              id='paymentAmount'
              className='form-control '
              value={paymentData.paymentAmount}
              onChange={HandleChange}
              required
            />
          </div>
          <div className='col-4'>
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
        <button className='btn btn-danger' type='button' onClick={handleClose} >Cancel</button>
        <button className='btn btn-success' type='submit'>Save</button>
      </div>
    </form>
  </Modal.Body>
</Modal>
    </>
  );
}
