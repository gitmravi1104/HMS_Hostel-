package com.hostelservice.dto;

import java.util.Date;

import com.hostelservice.model.Hostel;

import lombok.Data;

@Data
public class StaffDto 
{
private long id;
	
	private String name;
	
	private String fatherName;
	
	private String mobile;
	
	private String altmobile;
	
	private String email;
	
	private String permanantAddress;
	
	private Date dateOfJoining;
	
	private String designation;
	
	private Hostel hostel;
}
