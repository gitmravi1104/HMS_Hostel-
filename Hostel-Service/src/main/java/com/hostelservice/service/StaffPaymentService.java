package com.hostelservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hostelservice.dto.StaffPaymentDto;

public interface StaffPaymentService {

	ResponseEntity<List<StaffPaymentDto>> getAllPaymentsByhostelName(String hostelName);

	ResponseEntity<String> addStaffPayment(StaffPaymentDto staffPaymentDto);

//	ResponseEntity<String> updateStaffPaymentByMobileNumber(String hostelName, String staffMobile,
//			StaffPaymentDto staffPaymentDto);

//	ResponseEntity<String> deleteStaffPaymentByMobile(String hostelName, String staffMobile);

	ResponseEntity<String> updateStaffPaymentById(Long staffPaymentId, StaffPaymentDto staffPaymentDto);

	ResponseEntity<String> deleteStaffPaymentById(Long staffPaymentId);

	ResponseEntity<StaffPaymentDto> getStaffPaymentDetailsById(Long id);

	
}
