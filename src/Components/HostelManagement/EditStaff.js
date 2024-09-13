import React, { useState } from 'react'

const EditStaff = () => {
  const [editStaff,setEditStaff] = useState({
    name:'',
    fathername:'',
    mobileno:'',
    email:'',
    address:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setEditStaff({...editStaff,[name]:value})
  }

  return (
    <div className='container-fluid mt-3'>
      <h4 className='fs-semibold text-secondary'>Edit Staff</h4>
      <div className='mt-2 ms-3'>
        <form className='mt-3 ms-5'>
          <div className='row mb-3'>
          <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='mobileno'>Mobile No.</label>
              <input
                type='text'
                name='mobileno'
                id='mobileno'
                className='form-control w-25 ms-3'
                placeholder='Enter Mobile Number'
                value={editStaff.mobileno}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control w-75 ms-3'
                placeholder='Enter Staff Name'
                value={editStaff.name}
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
                value={editStaff.fathername}
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
                placeholder='Enter Maid id'
                value={editStaff.email}
                onChange={HandleChange}
              />
            </div>
            <div className='col d-flex'>
              <label className="form-check-label fw-bold ms-4" for="flexSwitchCheckChecked">Working / Left</label>
                <div className="form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                </div>
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
                value={editStaff.address}
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
              <label className='form-label fw-bold mt-2' htmlFor='availablerooms'>Designation</label>
              <select className='rounded ms-2 fw-semibold' name='availablerooms' id='availablerooms'>
                <option>Select</option>
                <option>Cook</option>
                <option>Sweeper</option>
                <option>Supervisor</option>
                <option>Helper</option>
              </select>
            </div>
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <button className='btn btn-danger'>Clear</button>
            <button className='btn btn-success'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStaff