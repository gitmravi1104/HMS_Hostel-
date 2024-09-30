package com.hostelservice.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.hostelservice.dto.HostelDto;
import com.hostelservice.dto.RoomDto;

public interface HostelService {

	ResponseEntity<List<HostelDto>> getAllHostels();

	ResponseEntity<String> addRoom(RoomDto roomDto);

	ResponseEntity<List<RoomDto>> getRoomsByHostelName(String hostelName);

//	ResponseEntity<String> updateRoomByroomNumber(String roomNumber, String hostelName, RoomDto roomDto);

//	ResponseEntity<String> deleteRoomByroomNumber(String hostelName, String roomNumber);

	ResponseEntity<String> updateRoomById(Long roomId, RoomDto roomDto);

	ResponseEntity<String> deleteRoomById(Long roomId);

	

	ResponseEntity<RoomDto> getRoomById(Long roomId);



}
