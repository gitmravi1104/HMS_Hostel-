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

import com.hostelservice.dto.HostelDto;
import com.hostelservice.dto.RoomDto;
import com.hostelservice.service.HostelService;

@CrossOrigin("*")
@RestController
@RequestMapping("/Room")
public class HostelController
{
	@Autowired
	HostelService hostelService;
	
	//To get All Hostels Data
	@GetMapping("/AllHostels")
	public ResponseEntity<List<HostelDto>> getAllHostels()
	{
		return hostelService.getAllHostels();
	}
	
	//To add the room
	@PostMapping("/addRoom")
	public ResponseEntity<String> addRoom(@RequestBody RoomDto roomDto)
	{
		return hostelService.addRoom(roomDto);
	}
	
	//To get Rooms based on hostelName
	@GetMapping("/RoomsByHostelName/{hostelName}")
	public ResponseEntity<List<RoomDto>> getRoomsByHostelName(@PathVariable String hostelName)
	{
		return hostelService.getRoomsByHostelName(hostelName);
	}
	
	//To get Room Details by Id
	@GetMapping("/getRoomById/{roomId}")
	public ResponseEntity<RoomDto> getRoomById(@PathVariable Long roomId)
	{
		return hostelService.getRoomById(roomId);
	}
	
//	//To Update the Room Details
//	@PutMapping("/updateRoom/{hostelName}/{roomNumber}")
//	public ResponseEntity<String> updateRoomByroomNumber(@PathVariable String hostelName,@PathVariable String roomNumber,@RequestBody RoomDto roomDto)
//	{
//		return hostelService.updateRoomByroomNumber(roomNumber,hostelName,roomDto);
//	}
	
	//To Update the Room Details
	@PutMapping("/updateRoom/{roomId}")
	public ResponseEntity<String> updateRoomById(@PathVariable Long roomId,@RequestBody RoomDto roomDto)
	{
		return hostelService.updateRoomById(roomId,roomDto);
	}
	
	// To Delete the room by roomNumber
	@DeleteMapping("/delete/{roomId}")
	public ResponseEntity<String> deleteRoomById(@PathVariable Long roomId)
	{
		return hostelService.deleteRoomById(roomId);
	}
	
	
	
	
	
}
