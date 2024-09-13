package com.hostelservice.dao;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostelservice.model.Hostel;

public interface HostelRepository extends JpaRepository<Hostel, Long> {

	Optional<Hostel> findByHostelName(String hostelName);

	

	 
}
