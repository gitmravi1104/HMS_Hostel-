package com.hostelservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hostelservice.dto.HostlerDto;

public interface HostlerService {
	public ResponseEntity<List<HostlerDto>> getAll();

	public ResponseEntity<HostlerDto> getById(long id);

	public ResponseEntity<String> createHostler(HostlerDto hostlerDto);

	public ResponseEntity<String> deleteHostler(long id);

	public ResponseEntity<String> editHostlerById(long id,HostlerDto hostlerDto);

	public ResponseEntity<HostlerDto> getHostlerByMobileNo(String mobileNo);

	public ResponseEntity<List<HostlerDto>> getHostlerByHostelName(String hostelName);


}
