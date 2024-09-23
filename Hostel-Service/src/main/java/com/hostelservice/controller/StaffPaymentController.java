package com.hostelservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostelservice.dto.StaffPaymentDto;
import com.hostelservice.service.StaffPaymentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Hostel/staffPayment")
public class StaffPaymentController 
{
	@Autowired
	StaffPaymentService staffPaymentService;
	
	// To get the staff Payment Details by hostelName
	@GetMapping("/getStaffPaymentByHostelName/{hostelName}")
	public ResponseEntity<List<StaffPaymentDto>> getAllPaymentsByhostelName(@PathVariable String hostelName)
	{
		return staffPaymentService.getAllPaymentsByhostelName(hostelName);
	}
	
	// To add the staff payment details
	@PostMapping("/addStaffPayment")
	public ResponseEntity<String> addStaffPayment(@RequestBody StaffPaymentDto staffPaymentDto)
	{
		return staffPaymentService.addStaffPayment(staffPaymentDto);
	}
	
//	//To update the staffpayment details by mobileNumber
//	@PutMapping("/updateStaffPayment/{hostelName}/{staffMobile}")
//	public ResponseEntity<String> updateStaffPaymentByMobileNumber(@PathVariable String hostelName, @PathVariable String staffMobile, @RequestBody StaffPaymentDto staffPaymentDto)
//	{
//		return staffPaymentService.updateStaffPaymentByMobileNumber(hostelName,staffMobile,staffPaymentDto);
//	}
	
	//To update the staffpayment details by mobileNumber
	@PutMapping("/updateStaffPayment/{staffPaymentId}")
	public ResponseEntity<String> updateStaffPaymentById(@PathVariable Long staffPaymentId, @RequestBody StaffPaymentDto staffPaymentDto)
	{
		return staffPaymentService.updateStaffPaymentById(staffPaymentId,staffPaymentDto);
	}
	
	@GetMapping("/getStaffPaymentDetailsById/{id}")
	public ResponseEntity<StaffPaymentDto> getStaffPaymentDetailsById(@PathVariable Long id)
	{
		return staffPaymentService.getStaffPaymentDetailsById(id);
	}
	
//	//To delete the staffPayment by mobileNumber
//	@DeleteMapping("/deleteStaffPayment/{hostelName}/{staffMobile}")
//	public ResponseEntity<String> deleteStaffPaymentByMobile(@PathVariable String hostelName, @PathVariable String staffMobile)
//	{
//		return staffPaymentService.deleteStaffPaymentByMobile(hostelName,staffMobile);
//	}
//	
	
	//To delete the staffPayment by Id
	@DeleteMapping("/deleteStaffPayment/{staffPaymentId}")
	public ResponseEntity<String> deleteStaffPaymentById(@PathVariable Long staffPaymentId)
	{
		return staffPaymentService.deleteStaffPaymentById(staffPaymentId);
	}
		
}
