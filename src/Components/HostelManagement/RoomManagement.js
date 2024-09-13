import React, { useEffect, useState } from 'react'
import HostelManagement from '../service/HostelManagementService';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import HostelManagementService from '../service/HostelManagementService';

const RoomManagement = () => {

  const [showAddRoom,setShowAddRoom] = useState(false);
  const [showUpdateRoom,setShowUpdateRoom] = useState(false);
  const [roomsData,setRoomsData] = useState([]);

  const [roomField,setRoomField] = useState({
    roomId:'',
    roomNumber:'',
    sharing:'',
    vacancy:'',
    active:false
  })

  const handleClose = () => {
    setShowAddRoom(false);
    setShowUpdateRoom(false);
    setRoomField({ roomId: '', roomNumber: '', sharing: '',vacancy:'', active: false });
  }

  const HandleNewRoom = () => {
    setShowAddRoom(true);
    setShowUpdateRoom(false)
  }
  
  const HandleUpdateRoom = () =>{
    setShowUpdateRoom(true);
    setShowAddRoom(false);
  }

  const HandleRoomChange = (e) => {
    const { name, value } = e.target;
    
    setRoomField(prevState => ({
      ...prevState,
      [name]: value,
      vacancy: name === 'sharing' ? value : prevState.vacancy
    }));
  };

  const HandleCheckboxChange = (e) => {
    setRoomField({ ...roomField, active: e.target.checked });
  };


  const handleAddRoomSubmit = async (e) => {
    e.preventDefault();
    const roomData = {
      roomNumber: roomField.roomNumber,
      sharing: roomField.sharing,
      vacancy: roomField.vacancy,
      active: roomField.active,
      hostel:{
         hostelName:"SSR", // need to provide the dynamic hstlName
      }
    };
  
    try {

      const response = await HostelManagementService.addNewRoom(roomData);
      console.log('Room added:', response.data);
      setRoomField({ roomNumber: '', sharing: '', vacancy:'', active: false });
      FetchRooms();
    } catch (error) {
      console.error('There was an error adding the room:', error);
      alert(error.response.data+"\n Please Contact Owner of this Page ")
    }
    handleClose();
  };
  

  const handleEditRoom = (room) => {
    setRoomField({
      roomId: room.id,
      roomNumber: room.roomNumber,
      sharing: room.sharing,
      vacancy:room.vacancy,
      active: room.active
    });
    setShowUpdateRoom(true);
    setShowAddRoom(false);
  };

  const handleUpdateRoomSubmit = async (e) => {
    e.preventDefault();
    const updatedRoomData = {
      roomId:roomField.roomId,
      roomNumber: roomField.roomNumber,
      sharing: roomField.sharing,
      vacancy:roomField.vacancy,
      active: roomField.active,
      hostel:{
        hostelName:"SSR",  // need to provide the dynamic hstlName
      }
    };

    try {
      // const res1 =await HostelManagementService.getRoomDetailsById(roomField.roomId);
      // console.log(res1.data)
        const res= await HostelManagementService.updateRoomById(roomField.roomId, updatedRoomData); // need to provide the dynamic hstlName
        console.log(res.data);
        FetchRooms();
    } catch (error) {
      console.error('There was an error updating the room:', error);
      alert(error.response.data+"\n Please Contact the Owner of this page")
    }
    handleClose();
  };

  const handleDeleteRoom = async (item) => {
    try {
      alert("Do you want to delete room Number : "+item.roomNumber)
          const res =  await HostelManagementService.deleteRoom(item.id);
     
      console.log(res.data);
      FetchRooms();
    } catch (error) {
      console.error('There was an error deleting the room:', error);
      alert(error+"\n Please contact Owner of this page");
    }
  };


  async function FetchRooms() {
    try {
      const response = await HostelManagementService.getRoomsByHostelName(); // we need to give dynamic hstlName
      if (Array.isArray(response.data)) {
        setRoomsData(response.data);
      } else {
        setRoomsData([]);
        console.error("Expected array but got:", response.data);
        
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRoomsData([]);
      alert(error+" \n Please contact the owner of this Page"); 
    }
  }
  
  useEffect(() => {
    FetchRooms();
  }, []);


  return (
    <div className='container-fluid mt-3'>
      <h3 className='fs-bold text-secondary'>Room Management</h3>
      <div className='mt-2 ms-3'>
        <div className='ms-5 mt-3'>
          <button className='btn btn-info fw-semibold ms-5' onClick={HandleNewRoom}>Add New Room <i className="fa-solid fa-plus ms-2"></i></button>
        </div>
      </div>
      <div className='mt-2 ms-3'>
        <h5 className='fs-semibold text-secondary'>All Room Details</h5>
        <table className='table table-striped-columns table-bordered table-hover border-dark mt-lg-4'>
          <thead className='text-center'>
            <tr>
              <th className='text-primary'>Sl.No.</th>
              <th className='text-primary'>Room Number</th>
              <th className='text-primary'>Sharing</th>
              <th className='text-primary'>Status</th>
              <th className='text-primary'>Vacancy</th>
              <th className='text-primary'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              roomsData.map((item,index) => (
                <tr key={item.id} className='text-dark'>
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-center'>{item.roomNumber}</td>
                  <td className='text-center'>{item.sharing}</td>
                  <td className='text-center'>{item.active ? 'Active' : 'Inactive'}</td>
                  <td className='text-center'>{item.vacancy}</td>
                  <td className='text-center'>
                    <>
                      <button className='btn btn-warning mx-2 py-1' onClick={() => handleEditRoom(item)}>Edit <i className="fa-solid fa-pen-to-square ms-1"></i></button>
                      <button className='btn btn-danger mx-2 py-1' onClick={() => handleDeleteRoom(item)}>Delete <i className="fa-solid fa-trash ms-2"></i></button>
                    </>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='container-fluid'>
      <Modal show={showAddRoom} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton  >
            <Modal.Title> Add New Room </Modal.Title>
          </Modal.Header>
          <Modal.Body className='mx-3'>
            <form onSubmit={handleAddRoomSubmit}>
              <div className='ms-3'>
                <div className='d-flex'>
                  <label className='mt-2 mx-2 fw-bold' htmlFor='roomNumber'>Room No.</label>
                  <input
                    type='text'
                    id='roomNumber'
                    name='roomNumber'
                    placeholder='Enter Room Number'
                    className='form-control w-50'
                    value={roomField.roomNumber}
                    onChange={HandleRoomChange}
                    maxLength={4}
                    required
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='mx-2 my-3 form-group'>
                  <label className='fw-bold' htmlFor='sharing'>No. of Sharing</label>
                  <select className='rounded ms-2 fw-semibold' name='sharing' id='sharing' value={roomField.sharing} onChange={HandleRoomChange} required>
                    <option value=''>Select</option>
                    <option value='1'>1 sharing</option>
                    <option value='2'>2 sharing</option>
                    <option value='3'>3 sharing</option>
                    <option value='4'>4 sharing</option>
                    <option value='5'>5 sharing</option>
                    <option value='6'>6 sharing</option>
                    <option value='7'>7 sharing</option>
                    <option value='8'>8 sharing</option>
                    <option value='9'>9 sharing</option>
                    <option value='10'>10 sharing</option>
                  </select>
                </div>
                <div className='my-2 d-flex'>
                  <label className='mt-2 mx-2 fw-bold'>Vacancy</label>
                  <input
                    type='text'
                    name='vacancy'
                    className='form-control w-50 fw-semibold'
                    placeholder='Enter Vacancy'
                    value={roomField.vacancy}
                    onChange={HandleRoomChange}
                    readOnly
                  />
                </div>
                <div className='my-3 d-flex'>
                  <label className="form-check-label fw-bold mx-2" for="flexSwitchCheckChecked">Active / Deactive</label>
                  <div className="form-check form-switch mx-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch" 
                      id="flexSwitchCheckChecked"
                      checked={roomField.active}
                      onChange={HandleCheckboxChange}
                      />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-around mt-4'>
                <button type='' className='btn btn-danger' onClick={handleClose}>Cancel</button>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={showUpdateRoom} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleUpdateRoomSubmit}>
              <div className='ms-3'>
                <div className='d-flex my-3'>
                  <label className='mt-2 mx-2 fw-bold'>Room No.</label>
                  <input
                    type='text'
                    name='roomNumber'
                    placeholder='Enter Room Number'
                    className='form-control w-50'
                    value={roomField.roomNumber}
                    onChange={HandleRoomChange}
                    maxLength={5}
                    required
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className='mx-2 my-3 form-group'>
                  <label className='fw-bold'>No. of Sharing</label>
                  <select className='rounded ms-2 fw-semibold' name='sharing' value={roomField.sharing} onChange={HandleRoomChange}>
                    <option value=''>Select</option>
                    <option value='1'>1 sharing</option>
                    <option value='2'>2 sharing</option>
                    <option value='3'>3 sharing</option>
                    <option value='4'>4 sharing</option>
                    <option value='5'>5 sharing</option>
                    <option value='6'>6 sharing</option>
                    <option value='7'>7 sharing</option>
                    <option value='8'>8 sharing</option>
                    <option value='9'>9 sharing</option>
                    <option value='10'>10 sharing</option>
                  </select>
                </div>
                <div className='my-3 d-flex'>
                  <label className="form-check-label fw-bold mx-2" for="flexSwitchCheckChecked">Active / Deactive</label>
                  <div className="form-check form-switch mx-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      role="switch" 
                      id="flexSwitchCheckChecked"
                      checked={roomField.active}
                      onChange={HandleCheckboxChange}
                      />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-around mt-4'>
                <button type='' className='btn btn-danger' onClick={handleClose}>Cancel</button>
                <button type='submit' className='btn btn-primary'>Save</button>
              </div>
            </form>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  )
}

export default RoomManagement;

{/* {
  showAddRoom && 
  <form onSubmit={handleAddRoomSubmit}>
    <div className='mt-4 ms-5 d-flex'>
      <label className='mt-1 mx-2 fw-bold'>Room No.</label>
      <input
        type='text'
        name='newroom'
        placeholder='Enter Room Number'
        className='w-25 form-control '
        value={roomField.newroom}
        onChange={HandleRoomChange}
        maxLength={5}
        onKeyPress={(e) => {
          const isValidInput = /[0-9]/;
          if (!isValidInput.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
      <div className='ms-5 form-group'>
        <label className='fw-bold'>No. of Sharing</label>
        <select className='rounded ms-2 fw-semibold' name='sharing' value={roomField.sharing} onChange={HandleRoomChange}>
          <option value=''>Select</option>
          <option value='1 sharing'>1 sharing</option>
          <option value='2 sharing'>2 sharing</option>
          <option value='3 sharing'>3 sharing</option>
          <option value='4 sharing'>4 sharing</option>
          <option value='5 sharing'>5 sharing</option>
          <option value='6 sharing'>6 sharing</option>
          <option value='7 sharing'>7 sharing</option>
          <option value='8 sharing'>8 sharing</option>
          <option value='9 sharing'>9 sharing</option>
          <option value='10 sharing'>10 sharing</option>
        </select>
      </div>
        <label className="form-check-label fw-bold ms-4" for="flexSwitchCheckChecked">Active / Deactive</label>
      <div className="form-check form-switch ms-3">
        <input 
          className="form-check-input" 
          type="checkbox" 
          role="switch" 
          id="flexSwitchCheckChecked"
          checked={roomField.active}
          onChange={HandleCheckboxChange}
        />
      </div>
    </div>
    <div className='d-flex justify-content-center mt-4'>
      <button type='submit' className='btn btn-primary'>Save</button>
    </div>
  </form>
} */}
{/* <div className='ms-5 mt-3'>
  <button className='btn btn-info fw-semibold ms-5' onClick={HandleUpdateRoom}>Update Room</button>
</div> */}
{/* {
  showUpdateRoom && 
  <form>
    <div className='mt-4 ms-5 d-flex'>
      <label className='mt-1 mx-2 fw-bold'>Room No.</label>
      <input
        type='text'
        name='updateroom'
        placeholder='Enter Room Number'
        className='w-25 form-control '
        value={roomField.updateroom}
        onChange={HandleRoomChange}
        maxLength={5}
        onKeyPress={(e) => {
          const isValidInput = /[0-9]/;
          if (!isValidInput.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
      <div className='ms-5 form-group'>
        <label className='fw-bold'>No. of Sharing</label>
        <select className='rounded ms-2 fw-semibold'>
          <option>Select</option>
          <option>1 sharing</option>
          <option>2 sharing</option>
          <option>3 sharing</option>
          <option>4 sharing</option>
          <option>5 sharing</option>
          <option>6 sharing</option>
          <option>7 sharing</option>
          <option>8 sharing</option>
          <option>9 sharing</option>
          <option>10 sharing</option>
        </select>
      </div>
        <label className="form-check-label fw-bold ms-4" for="flexSwitchCheckChecked">Active / Deactive</label>
      <div className="form-check form-switch ms-3">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
      </div>
    </div>
    <div className='d-flex justify-content-around mt-4'>
      <button className='btn btn-danger'>Delete</button>
      <button className='btn btn-primary'>Update</button>
    </div>
  </form>
} */}