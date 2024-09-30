package com.hostelservice.serviceimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hostelservice.dao.HostelRepository;
import com.hostelservice.dao.HostlerRepository;
import com.hostelservice.dao.RoomRepository;
import com.hostelservice.dao.StaffRepository;
import com.hostelservice.dto.HostelDto;
import com.hostelservice.dto.HostlerDto;
import com.hostelservice.dto.HostlerFeeDto;
import com.hostelservice.dto.RoomDto;
import com.hostelservice.exception.DuplicateEntryException;
import com.hostelservice.exception.InternalServerException;
import com.hostelservice.exception.ResourceNotFoundException;
import com.hostelservice.model.Hostel;
import com.hostelservice.model.Hostler;
import com.hostelservice.model.Room;
import com.hostelservice.service.HostelService;

@Service
public class HostelServiceimpl implements HostelService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	HostelRepository hostelRepo;

	@Autowired
	RoomRepository roomRepo;
	
	@Autowired
	StaffRepository staffRepo;
	
	@Autowired
	private HostlerRepository hostlerRepository;
	

	// To get All Hostels Data
	public ResponseEntity<List<HostelDto>> getAllHostels() {

		return ResponseEntity.status(HttpStatus.OK).body(hostelRepo.findAll().stream()
				.map(hostel -> modelMapper.map(hostel, HostelDto.class)).collect(Collectors.toList()));

	}

	// To add the room
	@Transactional
	public ResponseEntity<String> addRoom(RoomDto roomDto) {
		String hostelName = roomDto.getHostel().getHostelName();

		Optional<Hostel> hostel = hostelRepo.findByHostelName(hostelName);

		if (hostel.isEmpty()) {
			throw new ResourceNotFoundException("Hostel not found with name: " + hostelName);
		} else {

			if (roomRepo.findByHostelNameAndRoomNumber(roomDto.getRoomNumber(), roomDto.getHostel().getHostelName())
					.isEmpty()) {
				Room room = modelMapper.map(roomDto, Room.class);
				room.setHostel(hostel.get());
				roomRepo.save(room);
				return ResponseEntity.status(HttpStatus.CREATED).body("Room added successfully");
			} else {
				throw new DuplicateEntryException(
						"Room Number- " + roomDto.getRoomNumber() + " was already Exists in " + hostelName +" hostel");

			}
		}

	}

	// To get Rooms based on hostelName
	public ResponseEntity<List<RoomDto>> getRoomsByHostelName(String hostelName) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(roomRepo.findByHostelName(hostelName).stream()
					.map(room -> modelMapper.map(room, RoomDto.class)).collect(Collectors.toList()));
		} catch (Exception e) {
			e.printStackTrace();
			throw new InternalServerException("error while fetching Rooms based on HostelName");
		}

	}
	
	// To get Room Details By Id
	public ResponseEntity<RoomDto> getRoomById(Long roomId) {
		Optional<Room> room = roomRepo.findById(roomId);
		if (room.isEmpty())
			throw new ResourceNotFoundException("ID not found");
		else
			return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(room.get(), RoomDto.class));

	}

//	// To Update the Room Details (Dont give hostel details because already hostel Name was present in API)
//	@Transactional
//	public ResponseEntity<String> updateRoomByroomNumber(String roomNumber, String hostelName, RoomDto roomDto) {
//
//		List<Room> hostel = roomRepo.findByHostelName(hostelName);
//		if (hostel.isEmpty())
//			throw new ResourceNotFoundException("Hostel Not Found to update the Room " + hostelName);
//
//		else {
//
//			Optional<Room> room = hostel.stream().filter(r -> r.getRoomNumber().equals(roomNumber)).findFirst();
//
//			if (room.isPresent()) {
//				if (roomDto.getRoomNumber().equals(roomNumber)) {
//					Room rooms = room.get();
//					rooms.setNoOfBeds(roomDto.getNoOfBeds());
//					rooms.setRoomNumber(roomDto.getRoomNumber());
//					rooms.setStatus(roomDto.getStatus());
//					rooms.setVacancy(roomDto.getVacancy());
//					roomRepo.save(rooms);
//					return ResponseEntity.status(HttpStatus.CREATED)
//							.body("room details updated in " + hostelName + " with Room Number: " + roomNumber);
//				} else {
//					if (roomRepo.findByHostelNameAndRoomNumber(roomDto.getRoomNumber(), hostelName).isEmpty()) {
//						Room rooms = room.get();
//						rooms.setNoOfBeds(roomDto.getNoOfBeds());
//						rooms.setRoomNumber(roomDto.getRoomNumber());
//						rooms.setStatus(roomDto.getStatus());
//						rooms.setVacancy(roomDto.getVacancy());
//						roomRepo.save(rooms);
//						return ResponseEntity.status(HttpStatus.CREATED)
//								.body("room details updated in " + hostelName + " with Room Number: " + roomNumber);
//					} else {
//						throw new DuplicateEntryException(
//								"Room Number- " + roomDto.getRoomNumber() + " was already Exists in " + hostelName);
//					}
//				}
//
//			} else
//				throw new ResourceNotFoundException(
//						"roomNumber Not found with " + roomNumber + " in " + hostelName + " to update the room");
//
//		}
//
//	}
	
	// To update room details by Id
	@Transactional
	public ResponseEntity<String> updateRoomById(Long roomId, RoomDto roomDto) {
		Optional<Room> room = roomRepo.findById(roomId);
		if (room.isEmpty())
			throw new ResourceNotFoundException("ID not found: " + roomId);
		else {
			Room r = room.get();
			if(r.getRoomNumber().equals(roomDto.getRoomNumber())) {
				Integer sharing=Integer.parseInt(r.getSharing());
				Integer vacancy=Integer.parseInt(r.getVacancy());
				Integer newSharing=Integer.parseInt(roomDto.getSharing());
				Integer newVacany=newSharing-sharing+vacancy;
				if(newVacany<0) throw new DuplicateEntryException("Adjust the room members then change room sharing");
					r.setSharing(roomDto.getSharing());
					r.setRoomNumber(roomDto.getRoomNumber());
					r.setActive(roomDto.isActive());
					r.setVacancy(newVacany.toString());
					roomRepo.save(r);
					return ResponseEntity.status(HttpStatus.CREATED).body("room details updated");
			}
			else {
				
				if(roomRepo.findByHostelNameAndRoomNumber(roomDto.getRoomNumber(),roomDto.getHostel().getHostelName()).isPresent())
				{
					throw new DuplicateEntryException("room Already exists");
				}
				else {
					
					r.setSharing(roomDto.getSharing());
					r.setRoomNumber(roomDto.getRoomNumber());
					r.setActive(roomDto.isActive());
					r.setVacancy(roomDto.getVacancy());
					roomRepo.save(r);
					return ResponseEntity.status(HttpStatus.CREATED).body("room details updated");
					
				}
			}
//			else {
//				
//				throw new DuplicateEntryException("Room Number is Already exists "+roomDto.getRoomNumber());
//			}
			
			
		}

	}

//	// To Delete the room by roomNumber
//	public ResponseEntity<String> deleteRoomByroomNumber(String hostelName, String roomNumber) {
//
//		List<Room> hostel = roomRepo.findByHostelName(hostelName);
//		if (hostel.isEmpty())
//			throw new ResourceNotFoundException("Hostel Not Found to delete the room" + hostelName);
//
//		else {
//			Optional<Room> room = hostel.stream().filter(r -> r.getRoomNumber().equals(roomNumber)).findFirst();
//			if (room.isPresent()) {
//				roomRepo.delete(room.get());
//				return ResponseEntity.status(HttpStatus.CREATED)
//						.body("room delete in " + hostelName + " with Room Number: " + roomNumber);
//			} else
//				throw new ResourceNotFoundException(
//						"roomNumber Not found with " + roomNumber + " in " + hostelName + " to delete the room");
//
//		}
//	}
	
	
	// To Delete the Room Details by Id
	@Transactional
	public ResponseEntity<String> deleteRoomById(Long roomId)
	{
		Optional<Room> room=roomRepo.findById(roomId);
		if(room.isEmpty())
			throw new ResourceNotFoundException("ID not Found");
		else
		{
			roomRepo.delete(room.get());
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Room Details Deleted Succesfully");
		}
	}
	
//	@Override
//	public ResponseEntity<List<HostlerDto>> getHostlerByMobileNo(String mobileNo) {
//		if(mobileNo == null)
//		{
//			throw new ResourceNotFoundException("Mobile Number is Empty");
//		}
//		else 
//		{
//			Optional<Hostler> hostler = hostlerRepository.findByHostlerMobile(mobileNo);
//			if(hostler.isEmpty())
//			{
//				throw new ResourceNotFoundException("Mobile number with the Provided data is not available");
//			}
//			else
//			{
//				List<HostlerDto> hostlerDtos = hostler.stream()
//					    .map(h -> {
//					        HostlerDto hostlerDto = modelMapper.map(h, HostlerDto.class);
//					        // Assuming hostlerFee has a getDateOfJoining() method
//					        LocalDate dueDate = generateDueDate(h.getDateOfJoining());
//					        hostlerDto.setDueDate(dueDate); // Set the generated due date
//					        return hostlerDto;
//					    })
//					    .collect(Collectors.toList());
//
//					return ResponseEntity.status(HttpStatus.OK).body(hostlerDtos);
//				
//			}
//		}
//		
//	}
//	
//	 public LocalDate generateDueDate(LocalDate dateOfJoining) {
//	        LocalDate currentDate = LocalDate.now();
//	        return LocalDate.of(
//	            currentDate.getYear(), 
//	            currentDate.getMonth(), 
//	            dateOfJoining.getDayOfMonth()
//	        );
//	    }
//	
	
	
}

