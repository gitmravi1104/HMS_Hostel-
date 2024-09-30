package com.hostelservice.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hostelservice.model.Hostel;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class HostlerFeeDto {

	private long id;

	private String hostlerMobile;

	private String hostlerEmail;

	private String hostlerName;

	private String hostelName;

	private String hostlerRoomNo;

	private LocalDate dueDate;
	
	private LocalDate dateOfJoining;
	
	private String month;

	private String paymentStatus;

	private String paymentAmount;
	
	private LocalDate startDate;

	@ManyToOne
	@JoinColumn(name = "hostel_id")
	@JsonBackReference
	private Hostel hostel;

}