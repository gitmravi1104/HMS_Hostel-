package com.hostelservice.dto;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hostelservice.model.Hostel;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class HostlerDto {
	
    private long hostlerId;
    
    private String hostlerMobile;
  
    private String hostlerName;

    private String hostlerEmail;

    private String hostlerFatherName;

    private String hostlerCollegeName;

    private String hostlerRoomNo;
   
    private LocalDate dateOfJoining;
    
	private LocalDate dueDate; 
	
    private String altmobile;
    
    private String houseno;
	
    private String street;
    
    private String city;
    
    private String state;
    
    private String pincode;
    
    private String hostelName;
    
    private String depositeAmount;

    
    
//  @NotBlank(message = "Hostel id is required")
    @ManyToOne
    @JoinColumn(name = "hostel_id")
    @JsonBackReference
    private Hostel hostel;
    
    
}