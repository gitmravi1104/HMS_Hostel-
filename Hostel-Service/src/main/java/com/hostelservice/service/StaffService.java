package com.hostelservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hostelservice.dto.StaffDto;

public interface StaffService {

	ResponseEntity<List<StaffDto>> getStaffDetails(String hostelName);

	ResponseEntity<String> addStaff(StaffDto staffDto);

//	ResponseEntity<String> updateStaffByMobile(String hostelName, String staffMobile, StaffDto staffDto);

//	ResponseEntity<String> deleteStaffByMobile(String hostelName, String staffMobile);

	ResponseEntity<String> updateStaffById(Long staffId, StaffDto staffDto);

	ResponseEntity<String> deleteStaffById(Long staffId);

	ResponseEntity<StaffDto> getStaffDetailsById(Long staffId);

}
