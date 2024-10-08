package com.hostelservice.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;


import lombok.Data;
import lombok.ToString;


@Data
@ToString(exclude = "hostel")
public class RoomDto 
{
	
	private long id;
	
	private String roomNumber;
	
	private String active;
	
	private String sharing;
	
	private String vacancy;
	
	@JsonBackReference
	private HostelDto hostel;
	
	
}
