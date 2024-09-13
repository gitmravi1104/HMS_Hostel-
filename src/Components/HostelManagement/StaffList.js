import React from 'react'

const StaffList = () => {
  return (
    <div className='container-fluid'>
      <h4 className='text-center text-primary fw-bold mt-3'>Staff's List</h4>
      <div>
        <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
            <thead className='text-center'>
              <tr>
                <th className='text-primary'>Name</th>
                <th className='text-primary'>Mobile No.</th>
                <th className='text-primary'>Mail-id</th>
                <th className='text-primary'>Address</th>
                <th className='text-primary'>Designation</th>
              </tr>
            </thead>
          </table>
      </div>
    </div>
  )
}

export default StaffList