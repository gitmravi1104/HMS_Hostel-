package com.hostelservice.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hostelservice.model.StaffPayment;

public interface StaffPaymentRepository extends JpaRepository<StaffPayment,Long> {

	@Query("SELECT s FROM StaffPayment s WHERE s.hostel.hostelName = :hostelName")
	List<StaffPayment> findByHostelName(String hostelName);

//  @Query("SELECT r FROM StaffPayment r WHERE r.Mobile = :Mobile AND r.hostel.hostelName = :hostelName")
//	Optional<StaffPayment> findByMobileAndMonth(String Mobile, LocalDate localDate);

	Optional<StaffPayment> findByMobile(String staffMobile);

}
