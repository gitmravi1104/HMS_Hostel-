import React, { useState } from 'react'

const HostelersFees = () => {

  const [editHosteler,setEditHosteler] = useState({
    name:'',
    mobileno:'',
    email:'',
    roomno:''
  })

  const HandleChange = (e) =>{
    const {name,value} = e.target;
    setEditHosteler({...editHosteler,[name]:value})
  }

  return (
    <div className='container-fluid mt-3'>
      <h4 className='fs-semibold text-secondary'>Hosteler's fee</h4>
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
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='availablerooms'>Room No.</label>
              <select className='rounded ms-2 fw-semibold' name='availablerooms' id='availablerooms'>
                <option>Select</option>
                <option>room no:1</option>
              </select>
            </div>
            {/* <div className='col d-flex'>
              <label className="form-check-label fw-bold ms-4" for="flexSwitchCheckChecked">Living / Left</label>
                <div className="form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                </div>
            </div> */}
          </div>
          <div className='row mt-2'>
              <div className='col d-flex'>
                <label className='form-label fw-bold mt-2' htmlFor='month'>Month</label>
                <select className='rounded ms-2 fw-semibold' name='month' id='month'>
                  <option>Select</option>
                  <option>January</option>
                  <option>Febraury</option>
                  <option>March</option>
                  <option>April</option>
                  <option>may</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <div className='col d-flex'>
                <label className='form-label fw-bold mt-2' htmlFor='paymentstatus'>Payment Status</label>
                <select className='rounded ms-2 fw-semibold'>
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </div>
          </div>
          <div className='row mt-2'>
            <div className='col d-flex'>
              <label className='form-label fw-bold mt-2' htmlFor='topay'>Amount to pay</label>
              <input
                type='text'
                name='topay'
                id='topay'
                className='form-control w-25 ms-3'
                placeholder=''
                value={editHosteler.topay}
                onChange={HandleChange}
              />
            </div>
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <button className='btn btn-danger'>Clear</button>
            <button className='btn btn-success'>save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HostelersFees