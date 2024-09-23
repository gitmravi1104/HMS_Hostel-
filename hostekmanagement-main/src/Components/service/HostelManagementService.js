import axios from "axios";

    const Base_URI_Room="http://localhost:8080/Room";

    const Base_URI_Guest="http://localhost:8080/api/hostler";

    const Base_URI_Staff="http://localhost:8080/Hostel/Staff";

    const Base_URI_Staff_Payment="http://localhost:8080/Hostel/staffPayment";

    const Base_URI_Guest_Payment="http://localhost:8080/api/hostlerFee"

class HostelManagementService {

    
// Room Management API's

    addNewRoom(roomData)
    {
        return axios.post(Base_URI_Room+"/addRoom",roomData)
    }

    getRoomsByHostelName()
    {
        return axios.get(Base_URI_Room+"/RoomsByHostelName/SSR") // Need to provide Dynamic HstlName in place of SSR
    }

    getRoomDetailsById(roomId)
    {
        return axios.get(Base_URI_Room+"/getRoomById/"+roomId);
    }

    updateRoomById(roomId, values)
    {
        return axios.put(Base_URI_Room+"/updateRoom/"+roomId, values);
    }

    deleteRoom(roomId) {
       
        return axios.delete(Base_URI_Room+"/delete/"+roomId);
    }


   
// Hostler Management API's
   
    AddNewHostler(values)
    {
        return axios.post(Base_URI_Guest+"/createHostler", values, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
     });
   }


   
     UpdateHostler(hostlerId, values) {
        
        return axios.put(Base_URI_Guest+"/editHostler/"+hostlerId, values);
    }


    DeleteHostler(hostlerId) 
    {  
        return axios.delete(Base_URI_Guest+"/deleteHostler/"+hostlerId);
    }

   
    GetAllHostlers() 
    {
        return axios.get(Base_URI_Guest+"/findAll");
    }


    GetHostlerById(hostlerId) 
    {
        return axios.get(Base_URI_Guest+"/findById/"+hostlerId);
    }

    getHostlerByHostelName()
    {
        return axios.get(Base_URI_Guest+"/findByHostelName/SSR")
    }

    // Guest Payment API's

    addPaymentDetails(paymentData)
    {
        return axios.post(Base_URI_Guest_Payment+"/createHostlerFee", paymentData)
    }

    getPaymentDetailsByMobile(mobileNo)
    {
        return axios.get(Base_URI_Guest_Payment+"/findByMobileNumber/"+mobileNo)
    }

    getPaymentDetailsByHostelName()
    {
        return axios.get(Base_URI_Guest_Payment+"/findByHostelname/SSR")
    }

    updatePaymentDetails(id, data)
    {
      return   axios.put(Base_URI_Guest_Payment+"/editHostlerFee/"+id, data)
    }

  


    
    // Staff Management API's

    addNewStaff(staffDetails)
    {
        return axios.post(Base_URI_Staff+"/addStaff",staffDetails);
    }

    getAllStaff()
    {
        return axios.get(Base_URI_Staff+"/staffByHostelName/SSR") // need to update the hostel name dynamically
    }

    UpdateStaff(staffId,updatedStaffData)
    {
        return axios.put(Base_URI_Staff+"/updateStaff/"+staffId, updatedStaffData)
    }

    DeleteStaff(staffid){
        return axios.delete(Base_URI_Staff+'/delete/'+staffid);
    }

    getStaffById(staffId)
    {
        return axios.get(Base_URI_Staff+"/getStaffDetailsById/"+staffId);
    }

    //Staff Paymnet API's
    getStaffPaymentDetailsByHostelName()
    {
        return axios.get(Base_URI_Staff_Payment+"/getStaffPaymentByHostelName/SSR")
    }


    addStaffPayment(data)
    {
        return axios.post(Base_URI_Staff_Payment+"/addStaffPayment", data)
    }

    
    






}
export default new HostelManagementService();