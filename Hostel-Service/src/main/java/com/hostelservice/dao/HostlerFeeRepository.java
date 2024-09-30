package com.hostelservice.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hostelservice.dto.HostlerFeeDto;
import com.hostelservice.model.HostlerFee;



@Repository
public interface HostlerFeeRepository extends JpaRepository<HostlerFee, Long>{

	Optional<HostlerFee> findByHostlerNameAndHostlerMobileAndHostlerEmail(String name, String mobile, String email);

	List<HostlerFee> findByHostlerMobile(String mobileNo);

	Optional<HostlerFee> findByHostlerMobileAndMonth(String mobileNo, String month);

	List<HostlerFee> findByHostelName(String hostelName);

	Optional<HostlerFee> findByHostlerMobileAndDueDate(String mobileNo, LocalDate dueDate);

	Optional<HostlerFee> findByHostelNameAndHostlerMobile(String hostelName, String mobileNo);

//	Optional<HostlerFee> findByHostlerMobileANDMonth(String mobileNo, String month);

//	Optional<HostlerFee> findByMonthAndHostlerMobile(String month, String mobileNo);
//
//	Optional<HostlerFee> findByMonth(String month);



}