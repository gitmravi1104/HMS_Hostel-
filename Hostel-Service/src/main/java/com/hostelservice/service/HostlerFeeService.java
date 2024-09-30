package com.hostelservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hostelservice.dto.HostlerFeeDto;


public interface HostlerFeeService {

	ResponseEntity<List<HostlerFeeDto>> getAll();

	ResponseEntity<HostlerFeeDto> getById(long id);

	ResponseEntity<String> createHostlerFee(HostlerFeeDto hostlerFeeDto);

	ResponseEntity<String> editHostlerFeeById(long id, HostlerFeeDto hostlerFeeDto);

	ResponseEntity<String> deleteHostlerFee(long id);

	ResponseEntity<List<HostlerFeeDto>> getByMobileNumber(String mobileNo);

	ResponseEntity<List<HostlerFeeDto>> getByHostelName(String hostelName);

}