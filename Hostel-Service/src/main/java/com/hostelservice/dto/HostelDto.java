package com.hostelservice.dto;

import java.util.List;

import lombok.Data;

@Data
public class HostelDto 
{
	private String hostelName;
	
	private String address;
	
	private List<RoomDto> rooms;
	
	private List<StaffDto> staffDto;
	
	private List<StaffPaymentDto> staffPaymentDto;
}
