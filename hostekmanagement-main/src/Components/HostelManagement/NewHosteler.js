import React, { useState } from 'react'
import HostelManagement from '../service/HostelManagementService';

const NewHosteler = () => {

  const [hosteler,setHosteler] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    email:'',
    address:'',
    workingname:'',
    roomno:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setHosteler({...hosteler,[name]:value})
  }

  const HandleSubmit = async(e) => {
    e.preventDefault();
    try {
      HostelManagement.AddNewHosteler(hosteler).then(res=>{
        console.log(res.data);
      })
      setHosteler('');
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='container-fluid mt-3'>
      <h4 className='fs-semibold text-secondary'>Add New Hosteler</h4>
      <div className='mt-2 ms-3'>
        <form className='mt-3 ms-5' onSubmit={HandleSubmit}>
          <div className='row'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control w-75 ms-3'
                placeholder='Enter Hosteler Name'
                value={hosteler.name}
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
                value={hosteler.fathername}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='mobileno'>Mobile No.</label>
              <input
                type='text'
                name='mobileno'
                id='mobileno'
                className='form-control w-50 ms-3'
                placeholder='Enter Mobile Number'
                value={hosteler.mobileno}
                onChange={HandleChange}
              />
            </div>
            <div className='col d-flex'>
            <label className='form-label fw-bold mt-2' htmlFor='email'>Mail-Id</label>
              <input
                type='text'
                name='email'
                id='email'
                className='form-control w-75 ms-3'
                placeholder='Enter Mail id'
                value={hosteler.email}
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
                value={hosteler.address}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='workingname'>Office / College Name</label>
              <input
                type='text'
                name='workingname'
                id='workingname'
                className='form-control w-50 ms-3'
                placeholder='Enter office Name'
                value={hosteler.workingname}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='availablerooms'>Room No.</label>
              <select className='rounded ms-2 fw-semibold' name='roomno' id='availablerooms' value={hosteler.roomno} onChange={HandleChange}>
                <option>Select</option>
                <option value='room no : 306'>room no:306</option>
                <option value='room no : 307'>room no:307</option>
                <option value='room no : 308'>room no:308</option>
                <option value='room no : 309'>room no:309</option>
              </select>
            </div>
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <button className='btn btn-danger' type='clear'>Clear</button>
            <button className='btn btn-success' type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewHosteler