package com.hostelservice.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString(exclude = "hostel")
public class Room 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String roomNumber;
	
	private String active;
	
	private String sharing;
	
	private String vacancy;
	
	@ManyToOne
	@JoinColumn(name="HostelId")
	@JsonBackReference
	private Hostel hostel;
}
