package com.hostelservice.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostelservice.model.Hostler;

public interface HostlerRepository extends JpaRepository<Hostler, Long>
{
	Optional<Hostler> findByHostlerNameAndHostlerMobile(String name, String mobile);

	Optional<Hostler> findByHostlerMobile(String mobile);

//	Optional<Hostler> findByHostlerNameAndHostlerMobileAndHostlerAddressAndHostlerEmail(String name, String mobile,
//			String address, String email);

	Optional<Hostler> findByHostlerMobileAndHostelName(String mobile, String hostelName);

	Optional<Hostler> findByHostlerNameAndHostlerMobileAndHostlerEmail(String name, String mobile, String email);

	List<Hostler> findByHostelName(String hostelName);
}
