package com.hostelservice.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.hostelservice.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

	@Query("SELECT s FROM Staff s WHERE s.hostel.hostelName = :hostelName")
	List<Staff> findByHostelName(String hostelName);

	@Query("SELECT r FROM Staff r WHERE r.mobile = :mobile AND r.hostel.hostelName = :hostelName")
	Optional<Staff> findByHostelNameAndMobile(@Param("hostelName") String hostelName,@Param("mobile") String mobile);

	@Query("SELECT r FROM Staff r WHERE r.email = :email AND r.hostel.hostelName = :hostelName")
	Optional<Staff> findByHostelNameAndEmail(@Param("hostelName") String hostelName,@Param("email") String email);

}
