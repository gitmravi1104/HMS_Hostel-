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

import com.hostelservice.dto.StaffDto;
import com.hostelservice.service.StaffService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Hostel/Staff")
public class StaffController
{
		@Autowired
		StaffService staffService;
	
	
		//To get All staff Details 
		@GetMapping("/staffByHostelName/{hostelName}")
		public ResponseEntity<List<StaffDto>> getStaffDetails(@PathVariable String hostelName)
		{
			return staffService.getStaffDetails(hostelName);
		}
		
		//To add the staff 
		@PostMapping("/addStaff")
		public ResponseEntity<String> addStaff(@RequestBody StaffDto staffDto)
		{
			return staffService.addStaff(staffDto);
		}
		
		//To get Staff Details by Id
		@GetMapping("/getStaffDetailsById/{staffId}")
		public ResponseEntity<StaffDto> getStaffDetailsById(@PathVariable Long staffId)
		{
			return staffService.getStaffDetailsById(staffId);
		}
		
//		//To Update the staff by mobile number
//		@PutMapping("/updateStaff/{hostelName}/{staffMobile}")
//		public ResponseEntity<String> updateStaffByMobile(@PathVariable String hostelName, @PathVariable String staffMobile, @RequestBody StaffDto staffDto)
//		{
//			return staffService.updateStaffByMobile(hostelName, staffMobile, staffDto);
//		}
		
		//To Update the staff by Id
		@PutMapping("/updateStaff/{staffId}")
		public ResponseEntity<String> updateStaffById(@PathVariable Long staffId, @RequestBody StaffDto staffDto)
		{
			return staffService.updateStaffById(staffId, staffDto);
		}
		
//		//To Delete the staff By MobileNumber
//		@DeleteMapping("/delete/{hostelName}/{staffMobile}")
//		public ResponseEntity<String> deleteStaffByMobile(@PathVariable String hostelName,@PathVariable String staffMobile)
//		{
//			return staffService.deleteStaffByMobile(hostelName, staffMobile);
//		}
		
		//To Delete the staff By Id
		@DeleteMapping("/delete/{staffId}")
		public ResponseEntity<String> deleteStaffById(@PathVariable Long staffId)
		{
			return staffService.deleteStaffById(staffId);
		}
}
