import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HostelersList = () => {

  const [hostelerData,setHostelerData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/gethostelers')
    .then(res =>{
      setHostelerData(res.data);
    })
  },[])

  return (
    <div className='container-fluid'>
      <h4 className='text-center text-primary fw-bold mt-3'>Hosteler's List</h4>
      <div>
        <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>Sl.No</th>
                <th className='text-primary'>Room Number</th>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile No.</th>
                <th className='text-primary'>Father Name</th>
                <th className='text-primary'>Mail-id</th>
                <th className='text-primary'>Address</th>
                <th className='text-primary'>Office Name</th>
              </tr>
            </thead>
            <tbody>
              {
                hostelerData.map((item,index) =>(
                  <tr className=''key={item.id}>
                    <td className='text-center'>{index+1}</td>
                    <td className='text-center'>{item.roomno}</td>
                    <td className='text-center'>{item.name}</td>
                    <td className='text-center'>{item.mobileno}</td>
                    <td className='text-center'>{item.fathername}</td>
                    <td className='text-center'>{item.email}</td>
                    <td className='text-center'>{item.address}</td>
                    <td className='text-center'>{item.workingname}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default HostelersList