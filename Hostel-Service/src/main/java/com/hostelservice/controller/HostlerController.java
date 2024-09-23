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

import com.hostelservice.dto.HostlerDto;
import com.hostelservice.service.HostlerService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/hostler")
public class HostlerController {

	@Autowired
	private HostlerService service;

	// to get All Hostlers :
	@GetMapping("/findAll")
	public ResponseEntity<List<HostlerDto>> getAll() {

		return service.getAll();
	}

	// to get Hostlers Data By Mobile No:
	@GetMapping("/findByMobileNo/{mobileNo}")
	public ResponseEntity<HostlerDto> getHostlerByMobileNo(@PathVariable String mobileNo) {

		return service.getHostlerByMobileNo(mobileNo);
	}

	// to get All Hostler Data By Id:
	@GetMapping("/findById/{id}")
	public ResponseEntity<HostlerDto> getById(@PathVariable long id) {
		return service.getById(id);
	}

	// to post or create a hostler
	@PostMapping("/createHostler")
	public ResponseEntity<String> createHostler(@Valid @RequestBody HostlerDto hostlerDto) {
		return service.createHostler(hostlerDto);
	}

	// to edita hostler with id

	@PutMapping("/editHostler/{id}")
	public ResponseEntity<String> editHostler(@PathVariable long id, @RequestBody HostlerDto hostlerDto) {
		System.err.println(hostlerDto);
		return service.editHostlerById(id, hostlerDto);
	}

	// to delete a hostler
	@DeleteMapping("/deleteHostler/{id}")
	public ResponseEntity<String> deleteHostler(@PathVariable long id) {
		return service.deleteHostler(id);
	}
	
	// to get  Hostlers Data By Hostelname :
	@GetMapping("/findByHostelName/{hostelName}")
	public ResponseEntity<List<HostlerDto>>  getHostlerByHostelName(@PathVariable  String hostelName )
	{
		return service.getHostlerByHostelName(hostelName);
	}
}
