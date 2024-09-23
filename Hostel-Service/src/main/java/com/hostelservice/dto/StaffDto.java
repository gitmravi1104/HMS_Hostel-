package com.hostelservice.dto;

import java.time.LocalDate;

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
	
	private String houseno;
	
    private String street;
    
    private String city;
    
    private String state;
    
    private String pincode;
	
	private LocalDate dateOfJoining;
	
	private String designation;
	
	private Hostel hostel;
}
