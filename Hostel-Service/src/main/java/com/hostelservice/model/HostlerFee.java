package com.hostelservice.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class HostlerFee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String hostlerName;
	private String hostlerMobile;
	private String hostlerEmail;
	private String hostelName;
	private String hostlerRoomNo;
	private LocalDate dueDate;
	private String month;
	private String paymentStatus;
	private String paymentAmount;
	private LocalDate dateOfJoining;
	private LocalDate startDate;
	
	@ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;
	
//	@ManyToOne
//	@JoinColumn(name = "hostler_id")
//	private Hostler hostler;
	
	
	
}