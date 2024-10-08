package com.hostelservice.model;



import java.util.Date;

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
public class Staff
{
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String fatherName;
	
	private String mobile;
	
	private String altmobile;
	
	private String email;
	
	private String permanantAddress;
	
	private Date dateOfJoining;
	
	private String designation;
	
	@ManyToOne
	@JoinColumn(name="hostelId")
	@JsonBackReference
	private Hostel hostel;
}
