package com.hostelservice.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Hostel 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String hostelName;
	
	private String address;
	
	@OneToMany(mappedBy = "hostel",orphanRemoval = true)
	@JsonManagedReference
	private List<Room> rooms;
	
	@OneToMany(mappedBy = "hostel", orphanRemoval = true)
	@JsonManagedReference
	private List<Staff> staff;
	
	@OneToMany(mappedBy = "hostel", orphanRemoval = true)
	@JsonManagedReference
	private List<StaffPayment> staffPayment;
			
}
