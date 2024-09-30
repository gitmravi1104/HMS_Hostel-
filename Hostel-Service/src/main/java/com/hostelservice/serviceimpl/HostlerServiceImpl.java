package com.hostelservice.serviceimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hostelservice.dao.HostlerRepository;
import com.hostelservice.dao.RoomRepository;
import com.hostelservice.dto.HostlerDto;
import com.hostelservice.exception.DuplicateEntryException;
import com.hostelservice.exception.ResourceNotFoundException;
import com.hostelservice.model.Hostler;
import com.hostelservice.model.Room;
import com.hostelservice.service.HostlerService;

@Service
public class HostlerServiceImpl implements HostlerService {

	@Autowired
	private HostlerRepository hostlerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RoomRepository roomRepository;

	@Override
	@ReadOnlyProperty
	@Transactional
	public ResponseEntity<List<HostlerDto>> getAll() {
		List<Hostler> hostlers = hostlerRepository.findAll();
//		if (hostlers.isEmpty()) {
//			// 404
//			throw new ResourceNotFoundException("Hostlers Details are Not Existed");
//		}
		List<HostlerDto> hostlerDtos = hostlers.stream().map(hostler -> modelMapper.map(hostler, HostlerDto.class))
				.collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(hostlerDtos);
	}

	@Override
	@ReadOnlyProperty
	@Transactional
	public ResponseEntity<HostlerDto> getById(long id) {

		Optional<Hostler> hostler = hostlerRepository.findById(id);
		if (hostler.isEmpty()) {
			// 404
			throw new ResourceNotFoundException("Provided Id Was Not Found");
		}
		HostlerDto hostlerDto = modelMapper.map(hostler.get(), HostlerDto.class);
		return ResponseEntity.status(HttpStatus.OK).body(hostlerDto);
	}

	@Override
	@Transactional
	public ResponseEntity<String> createHostler(HostlerDto hostlerDto) {

		String hostelName = hostlerDto.getHostelName();
		String mobile = hostlerDto.getHostlerMobile();
		
		Optional<Hostler> existingHostler = hostlerRepository.findByHostlerMobileAndHostelName(mobile,hostelName);
		
		if(existingHostler.isPresent()) {
			throw new DuplicateEntryException("Hostler with the provided details already exists");
		}
		Optional<Room> room = roomRepository.findByRoomNumber(hostlerDto.getHostlerRoomNo());
		Room rooms = room.get();
		if (rooms.getVacancy().equals("0"))
			throw new DuplicateEntryException(hostlerDto.getHostlerRoomNo() + " has filled");
		
//		Optional<Hostler> existingHostler = hostlerRepository.findByHostlerMobile(mobile);
//		if (existingHostler.isPresent()) {
//			throw new DuplicateEntryException("Hostler with the provided details already exists");
//		}
//		
		Hostler hostler = modelMapper.map(hostlerDto, Hostler.class);
		hostlerRepository.save(hostler);

		rooms.setVacancy(String.valueOf(Long.parseLong(rooms.getVacancy()) - 1));
		roomRepository.save(rooms);

		return ResponseEntity.status(HttpStatus.CREATED).body("Hostler created successfully");
	}

	@Override
	@Transactional
	public ResponseEntity<String> deleteHostler(long id) {

		Optional<Hostler> hostler = hostlerRepository.findById(id);
		Hostler h= hostler.get();

		Optional<Room> room = roomRepository.findByRoomNumber(hostler.get().getHostlerRoomNo());
		Room rooms = room.get();

		if (rooms.getVacancy().equals(rooms.getSharing()))
			throw new DuplicateEntryException(hostler.get().getHostlerRoomNo() + " has exced the occupency");

		if (hostler.isEmpty()) {
			// 404
			throw new ResourceNotFoundException("Provided Id Details are Not Existed");

		} else {
			hostlerRepository.delete(h);
			rooms.setVacancy(String.valueOf(Long.parseLong(rooms.getVacancy()) + 1));
			roomRepository.save(rooms);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hostler Details are deleated succcessfully");

		}

	}

	@Override
	@Transactional
	public ResponseEntity<String> editHostlerById(long id, HostlerDto hostlerDto) {

		Optional<Hostler> hostler = hostlerRepository.findById(id);
		if (hostler.isEmpty()) {
			// 404
			throw new ResourceNotFoundException("Provided Id Details are Not Existed");
		} else {
			Hostler existingHostler = hostler.get();

			// Check if the mobile number is changed
			if (!existingHostler.getHostlerMobile().equals(hostlerDto.getHostlerMobile())) {

				// Check if the new mobile number already exists in combination with other
				// details
				String name = hostlerDto.getHostlerName();
				String mobile = hostlerDto.getHostlerMobile();
				String email = hostlerDto.getHostlerEmail();
				

				Optional<Hostler> hostlerWithNewMobile = hostlerRepository
						.findByHostlerNameAndHostlerMobileAndHostlerEmail(name, mobile,
								email);

				if (hostlerWithNewMobile.isPresent()) {
					// 409
					throw new DuplicateEntryException("Provided mobile number and other details already exist");
				}
			}

			// Update the hostler details regardless of whether the mobile number is changed
			// or not
			
			existingHostler.setHostlerCollegeName(hostlerDto.getHostlerCollegeName());
			existingHostler.setHostlerEmail(hostlerDto.getHostlerEmail());
			existingHostler.setHostlerFatherName(hostlerDto.getHostlerFatherName());
			existingHostler.setHostlerMobile(hostlerDto.getHostlerMobile());
			existingHostler.setHostlerName(hostlerDto.getHostlerName());
			existingHostler.setHostel(hostlerDto.getHostel());
			existingHostler.setHostlerRoomNo(hostlerDto.getHostlerRoomNo());
			existingHostler.setAltmobile(hostlerDto.getAltmobile());
			existingHostler.setDateOfJoining(hostlerDto.getDateOfJoining());
			existingHostler.setDepositeAmount(hostlerDto.getDepositeAmount());
			existingHostler.setHouseno(hostlerDto.getHouseno());
			existingHostler.setStreet(hostlerDto.getStreet());
			existingHostler.setCity(hostlerDto.getCity());
			existingHostler.setState(hostlerDto.getState());
			existingHostler.setPincode(hostlerDto.getPincode());
	
			hostlerRepository.save(existingHostler);

			return ResponseEntity.status(HttpStatus.CREATED).body("Updated Successfully");
		}
	}

	@Override
	@Transactional
	public ResponseEntity<HostlerDto> getHostlerByMobileNo(String mobileNo) {
		if (mobileNo == null) {
			throw new ResourceNotFoundException("Mobile Number is Empty");
		} else {
			Optional<Hostler> hostler = hostlerRepository.findByHostlerMobile(mobileNo);
			if (hostler.isEmpty()) {
				throw new ResourceNotFoundException("Mobile number with the Provided data is not available");
			} else {
				HostlerDto hostlerDto = modelMapper.map(hostler.get(), HostlerDto.class);
				
				return ResponseEntity.status(HttpStatus.OK).body(hostlerDto);

			}
		}

	}
	
	@Override
	public ResponseEntity<List<HostlerDto>> getHostlerByHostelName(String hostelName) {
		if(hostelName == null)
		{
			throw new ResourceNotFoundException("hostelName Number is Empty");
		}
		else 
		{
			List<Hostler> hostler = hostlerRepository.findByHostelName(hostelName);
			if(hostler.isEmpty())
			{
				throw new ResourceNotFoundException("Mobile number with the Provided data is not available");
			}
			else
			{
				List<HostlerDto> hostlerDtos = hostler.stream()
					    .map(h -> {
					        HostlerDto hostlerDto = modelMapper.map(h, HostlerDto.class);
					        // Assuming hostlerFee has a getDateOfJoining() method
					        LocalDate dueDate = generateDueDate(h.getDateOfJoining());
					        hostlerDto.setDueDate(dueDate); // Set the generated due date
					        return hostlerDto;
					    })
					    .collect(Collectors.toList());

					return ResponseEntity.status(HttpStatus.OK).body(hostlerDtos);
				
			}
		}
	}
	
	 public LocalDate generateDueDate(LocalDate dateOfJoining) {
	        LocalDate currentDate = LocalDate.now();
	        return LocalDate.of(
	            currentDate.getYear(), 
	            currentDate.getMonth(), 
	            dateOfJoining.getDayOfMonth()
	        );
	    }

}
