import axios from 'axios';
import React, { useState } from 'react'

const NewStaff = () => {
  const [staff,setStaff] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    email:'',
    address:'',
    designation:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setStaff({...staff,[name]:value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    try {
      axios.post('http://localhost:4000/addstaff',staff)
      .then(res=>{
        console.log(res.data);
      })
      setStaff('')
    } catch (error) {
      console.log('error :' + error)
    }
  }

  return (
    <div className='container-fluid mt-3'>
      <h4 className='fs-semibold text-secondary'>Add New Staff</h4>
      <div className='mt-2 ms-3'>
        <form className='mt-3 ms-5' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control w-75 ms-3'
                placeholder='Enter Staff Name'
                value={staff.name}
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
                placeholder='Enter Father Name'
                value={staff.fathername}
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
                value={staff.mobileno}
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
                placeholder='Enter Maid id'
                value={staff.email}
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
                value={staff.address}
                onChange={HandleChange}
              />
            </div>
          </div>
          {/* <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='workingname'>Office / College Name</label>
              <input
                type='text'
                name='workingname'
                id='workingname' 
                className='form-control w-50 ms-3'
                placeholder='Enter Father`s Name'
                value={staff.workingname}
                onChange={HandleChange}
              />
            </div>
          </div> */}
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='designation'>Designation</label>
              <select className='rounded ms-2 fw-semibold' name='designation' id='designation' value={staff.designation} onChange={HandleChange}>
                <option value=''>Select</option>
                <option value='Cook'>Cook</option>
                <option value='Sweeper'>Sweeper</option>
                <option value='SuperVisor'>Supervisor</option>
                <option value='Helper'>Helper</option>
              </select>
            </div>
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <button className='btn btn-danger'>Clear</button>
            <button className='btn btn-success' type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewStaff