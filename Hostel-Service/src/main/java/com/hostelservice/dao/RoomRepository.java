package com.hostelservice.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hostelservice.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

	@Query("SELECT s FROM Room s WHERE s.hostel.hostelName = :hostelName")
	List<Room> findByHostelName(String hostelName);

	@Query("SELECT r FROM Room r WHERE r.roomNumber = :roomNumber AND r.hostel.hostelName = :hostelName")
	Optional<Room> findByHostelNameAndRoomNumber(@Param("roomNumber") String roomNumber, @Param("hostelName") String hostelName);

	Optional<Room> findByRoomNumber(String hostlerRoomNo);

	 
//	List<Room> findByHostel(String hostelName);

	

}
