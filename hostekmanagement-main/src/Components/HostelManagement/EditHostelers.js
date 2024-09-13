import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditHostelers = () => {

  const [hostelerData,setHostelerData] = useState([])

  const [editHosteler,setEditHosteler] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    email:'',
    address:'',
    workingname:''
  })

  
  const mobileNumber = editHosteler.mobileno;
  const FetchHostelerData = async () => {
    try {
      console.log('Sending mobile number:', mobileNumber);
      const response = await axios.post('http://localhost:4000/edithosteler', { mobileNumber });
      console.log('Received data:', response.data);
      setHostelerData(response.data);
    } catch (error) {
      console.error('Error fetching hosteler data:', error);
    }
  };

 const HandleData=(e)=>{
  e.preventDefault();
  FetchHostelerData()
 }

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setEditHosteler({...editHosteler,[name]:value})
  }
  return (
    <div className='container-fluid mt-3'>
      <h4 className='fs-semibold text-secondary'>Edit Hosteler</h4>
      <div className='mt-2 ms-3'>
        <form className='mt-3 ms-5'>
        <div className='row my-2'>
            <div className='col d-flex'>
            <label className='form-label fw-bold mt-2' htmlFor='mobileno'>Hosteler Mobile No.</label>
              <input
                type='text'
                name='mobileno'
                id='mobileno'
                className='form-control w-50 ms-3'
                placeholder='Enter Mobile Number'
                value={editHosteler.mobileno}
                onChange={HandleChange}
              />
            </div>
            <div className='col'>
              <button className='btn btn-primary' onClick={HandleData}>click</button>
            </div>
          </div>
          <div className='row'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control w-75 ms-3'
                placeholder='Enter Hosteler Name'
                value={editHosteler.name}
                onChange={HandleChange}
              />
            </div>
            <div className='col d-flex'>
            <label className='form-label fw-bold mt-2' htmlFor='fathername'>Father's Name</label>
              <input
                type='text'
                name='fathername'
                id='fathername'
                className='form-control w-50 ms-3'
                placeholder='Enter Father`s Name'
                value={editHosteler.fathername}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
            <label className='form-label fw-bold mt-2' htmlFor='email'>Mail-Id</label>
              <input
                type='text'
                name='email'
                id='email'
                className='form-control w-75 ms-3'
                placeholder='Enter mail-id'
                value={editHosteler.email}
                onChange={HandleChange}
              />
            </div>
            <div className='col d-flex'>
            <label className='form-label fw-bold mt-2' htmlFor='workingname'>Office / College Name</label>
              <input
                type='text'
                name='workingname'
                id='workingname'
                className='form-control w-50 ms-3'
                placeholder='Enter Office Name'
                value={editHosteler.workingname}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-12 d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='address'>Permanent Address</label>
              <textarea
                name='address'
                id='address'
                rows='3'
                className='w-50 ms-3'
                value={editHosteler.address}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='availablerooms'>Room No.</label>
              <select className='rounded ms-2 fw-semibold' name='availablerooms' id='availablerooms'>
                <option>Select</option>
                <option>room no:1</option>
              </select>
            </div>
            <div className='col d-flex'>
              <label className="form-check-label fw-bold ms-4" for="flexSwitchCheckChecked">Living / Left</label>
                <div className="form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                </div>
            </div>
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <button className='btn btn-info'>Clear</button>
            <button className='btn btn-danger'>Delete</button>
            <button className='btn btn-success'>Update</button>
          </div>
        </form>
        <div>
        {Array.isArray(hostelerData) ? (
          hostelerData.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
            </div>
          ))
        ) : (
          <div>
            <h3>{hostelerData.name}</h3>
            {/* Render other properties as needed */}
            <p>{hostelerData.fathername}</p>
            <p>{hostelerData.email}</p>
            {/* Add more fields as required */}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default EditHostelers