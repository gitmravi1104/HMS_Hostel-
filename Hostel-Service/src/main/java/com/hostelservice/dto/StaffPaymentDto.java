package com.hostelservice.dto;

import java.time.LocalDate;

import com.hostelservice.model.Hostel;

import lombok.Data;

@Data
public class StaffPaymentDto 
{	
	private String Name;
	
	private String Mobile; 
	 
	private String Email; 

//	private LocalDate Month;
	
	private String advPayment;
	
	private LocalDate paymentDate;
	
	private String designation; 

	private String paymentAmount; 

	private String paymentStatus ;
	
	private Hostel hostel;

	 

}
