package com.hostelservice.dto;

import java.time.LocalDate;

import com.hostelservice.model.Hostel;

import lombok.Data;

@Data
public class StaffPaymentDto 
{	
	private String name;
	
	private String mobile; 
	 
	private String email; 

//	private LocalDate Month;
	
	private String advPayment;
	
	private String paymentDate;
	
	private String designation; 

	private String paymentAmount; 

	private String paymentStatus ;
	
	private Hostel hostel;

	 

}
