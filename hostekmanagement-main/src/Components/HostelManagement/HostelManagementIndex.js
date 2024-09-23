import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RoomManagement from './RoomManagement'
import NewHosteler from './NewHosteler'
import EditHostelers from './EditHostelers'
import HostelersFees from './HostelersFees'
import HostelersList from './HostelersList'
import PreviousHostelers from './PreviousHostelers'
import NewStaff from './NewStaff'
import EditStaff from './EditStaff'
import StaffPayment from './StaffPayment'
import StaffList from './StaffList'
import PreviousStaff from './PreviousStaff'
import HostelerHome from './HostelerHome'
import StaffHome from './StaffHome'
import '../../App.css';


const HostelManagementIndex = () => {

  const [activeButton, setActiveButton] = useState('');

  const HandleActive = (buttonName) => {
    setActiveButton(buttonName);
    sessionStorage.setItem('activeButton', buttonName);
  }

  useEffect(() => {
    const storedButton = sessionStorage.getItem('activeButton');
    if (storedButton) {
      setActiveButton(storedButton);
    }
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <BrowserRouter>
          <div>
            <h2 className='fw-bold text-center my-1 text-primary'>Hostel Management <i className="fa-solid fa-bed ms-2"></i></h2>
          </div>
          <div className='col-2 p-3 border border-dark border-4'>
            <div className='my-1'>
              <Link 
                to='/' 
                className={`btn w-100 px-1 ${activeButton === 'roommanagement' ? 'btn-primary underline-active' : 'btn-outline-primary text-dark'}`} 
                onClick={() => { HandleActive('roommanagement') }}>
                  Room Management <i className="fa-solid fa-house"></i>
              </Link>
            </div>
            <hr/>
            <div className='my-1'>
              <Link 
                to='/hostelerhome' 
                className={`btn w-100 px-2 ${activeButton === 'hostelmanagement' ? 'btn-primary underline-active' : 'btn-outline-primary text-dark'}`} 
                onClick={() => { HandleActive('hostelmanagement') }}>
                  Hosteler Management
              </Link>
            </div>
            <hr/>
            <div className='my-1'>
              <Link 
                to='/staffhome' 
                className={`btn w-100 px-1 ${activeButton === 'staffmanagement' ? 'btn-primary underline-active' : 'btn-outline-primary text-dark'}`} 
                onClick={() => { HandleActive('staffmanagement') }}>
                  Staff Management <i className="fa-solid fa-user ms-1"></i>
              </Link>
            </div>
          </div>
          <div className='col-10 border border-dark border-4 '>
            <Routes>
              <Route path='/' element={<RoomManagement/>}/>
              <Route path='/newhostler' element={<NewHosteler/>}/>
              <Route path='/edithostelers' element={<EditHostelers/>}/>
              <Route path='/hostelersfees' element={<HostelersFees/>}/>
              <Route path='/hostelerslist' element={<HostelersList/>}/>
              <Route path='/previoushostelers' element={<PreviousHostelers/>}/>
              <Route path='/newstaff' element={<NewStaff/>}/>
              <Route path='/editstaff' element={<EditStaff/>}/>
              <Route path='/staffpayment' element={<StaffPayment/>}/>
              <Route path='/stafflist' element={<StaffList/>}/>
              <Route path='/previousstaff' element={<PreviousStaff/>}/>
              <Route path='/hostelerhome' element={<HostelerHome/>}/>
              <Route path='/staffhome' element={<StaffHome/>}/>
              {/* <Route path='/paymenthistory' element={<PaymentHistory/>}/> */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default HostelManagementIndex;
