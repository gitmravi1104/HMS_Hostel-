package com.hostelservice.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class StaffPayment
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String mobile; 
	 
	private String email; 

//	private String month;
	
	private String advPayment;
	
	private String paymentDate;
	
	private String designation; 

	private String paymentAmount; 

	private String paymentStatus;
	
	@ManyToOne
	@JoinColumn(name="hostelId")
	@JsonBackReference
	private Hostel hostel;
}
