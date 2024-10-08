package com.hostelservice.serviceimpl;

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
import com.hostelservice.dao.StaffPaymentRepository;
import com.hostelservice.dto.StaffPaymentDto;
import com.hostelservice.exception.InternalServerException;
import com.hostelservice.exception.ResourceNotFoundException;
import com.hostelservice.model.Hostel;
import com.hostelservice.model.StaffPayment;
import com.hostelservice.service.StaffPaymentService;

@Service
public class StaffPaymentServiceImpl implements StaffPaymentService 
{
	@Autowired
	ModelMapper modelMapper;

	@Autowired
	HostelRepository hostelRepo;

	@Autowired
	StaffPaymentRepository staffPaymentRepo;
	
	// To get the staff Payment Details by hostelName
	public ResponseEntity<List<StaffPaymentDto>> getAllPaymentsByhostelName(String hostelName) {
		
			List<StaffPayment> staffPaymentList = staffPaymentRepo.findByHostelName(hostelName);
			return ResponseEntity.status(HttpStatus.OK).body(staffPaymentList.stream()
					.map(sp -> modelMapper.map(sp, StaffPaymentDto.class)).collect(Collectors.toList()));

		

	}

	// To add the staff payment details
	public ResponseEntity<String> addStaffPayment(StaffPaymentDto staffPaymentDto) {
		Optional<Hostel> hostel = hostelRepo
				.findByHostelName(staffPaymentDto.getHostel().getHostelName());
		if (hostel.isEmpty()) {
			throw new ResourceNotFoundException(staffPaymentDto.getHostel().getHostelName() + " was not found");
		} else {
			
				StaffPayment stp= modelMapper.map(staffPaymentDto, StaffPayment.class);
				stp.setHostel(hostel.get());
				staffPaymentRepo.save(stp);
				return ResponseEntity.status(HttpStatus.CREATED).body("Staff Payment Uploaded successfully");
			
		}
	}
	
	public ResponseEntity<StaffPaymentDto> getStaffPaymentDetailsById(Long id)
	{
			Optional<StaffPayment> staffPayment= staffPaymentRepo.findById(id);
			if(staffPayment.isEmpty())
				throw new ResourceNotFoundException("Id not Found");
			else
				return ResponseEntity.status(HttpStatus.OK).body(modelMapper.map(staffPayment, StaffPaymentDto.class));
	}


//	//To update the staffpayment details by mobileNumber
//	public ResponseEntity<String> updateStaffPaymentByMobileNumber(String hostelName, String staffMobile,
//			StaffPaymentDto staffPaymentDto) {
//		Optional<Hostel> hostel = hostelRepo.findByHostelName(hostelName);
//		if (hostel.isEmpty()) {
//			throw new ResourceNotFoundException("hostelName Not Found");
//		} else {
//			Optional<StaffPayment> staffPayment = staffPaymentRepo.findByMobile(staffMobile);
//			if (staffPayment.isEmpty()) {
//				throw new ResourceNotFoundException("user not found with mobile number" + staffMobile);
//
//			} else {
//				StaffPayment sp = staffPayment.get();
//				sp.setAdvPayment(staffPaymentDto.getAdvPayment());
//				sp.setDesignation(staffPaymentDto.getDesignation());
//				sp.setPaymentAmount(staffPaymentDto.getPaymentAmount());
//				sp.setPaymentDate(staffPaymentDto.getPaymentDate());
//				sp.setPaymentStatus(staffPaymentDto.getPaymentStatus());
//				staffPaymentRepo.save(sp);
//				return ResponseEntity.status(HttpStatus.CREATED).body("Staff payment updated Successfully");
//			}
//		}
//
//	}
//	
	//To update Staff Payment Details by Id
	@Transactional
	public ResponseEntity<String> updateStaffPaymentById(Long staffPaymentId, StaffPaymentDto staffPaymentDto)
	{
			Optional<StaffPayment>	existingDetails=staffPaymentRepo.findById(staffPaymentId);
			if(existingDetails.isEmpty())
				throw new ResourceNotFoundException("ID not found: "+staffPaymentId);
			else {
				StaffPayment sp = existingDetails.get();
				sp.setAdvPayment(staffPaymentDto.getAdvPayment());
				sp.setDesignation(staffPaymentDto.getDesignation());
				sp.setPaymentAmount(staffPaymentDto.getPaymentAmount());
				sp.setPaymentDate(staffPaymentDto.getPaymentDate());
				sp.setPaymentStatus(staffPaymentDto.getPaymentStatus());
				staffPaymentRepo.save(sp);
				return ResponseEntity.status(HttpStatus.CREATED).body("Staff payment updated Successfully");
			}
	}

//	//To delete the staffPayment by mobileNumber
//	public ResponseEntity<String> deleteStaffPaymentByMobile(String hostelName, String staffMobile)
//	{
//		if(hostelRepo.findByHostelName(hostelName).isEmpty())
//		{
//			throw new ResourceNotFoundException("hostel name not found");
//		}
//		else {
//		 staffPaymentRepo.delete(staffPaymentRepo.findByMobile(staffMobile).get());
//		 return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Succesfully");
//		}
//	}
//	
	// To delete the staffPayment By Id
	@Transactional
	public ResponseEntity<String> deleteStaffPaymentById(Long staffPaymentId) {

		Optional<StaffPayment> existingDetails = staffPaymentRepo.findById(staffPaymentId);

		if (existingDetails.isEmpty())
			throw new ResourceNotFoundException("ID not found: " + staffPaymentId);
		else {
			staffPaymentRepo.delete(existingDetails.get());
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Succesfully");
		}

	}
	
}
