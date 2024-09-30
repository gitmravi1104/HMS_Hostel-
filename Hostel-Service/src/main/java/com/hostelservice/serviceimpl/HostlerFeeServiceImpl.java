package com.hostelservice.serviceimpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hostelservice.dao.HostlerFeeRepository;
import com.hostelservice.dao.HostlerRepository;
import com.hostelservice.dto.HostlerFeeDto;
import com.hostelservice.exception.DuplicateEntryException;
import com.hostelservice.exception.ResourceNotFoundException;
import com.hostelservice.model.Hostler;
import com.hostelservice.model.HostlerFee;
import com.hostelservice.service.HostlerFeeService;

@Service
public class HostlerFeeServiceImpl implements HostlerFeeService {

	@Autowired
	private HostlerFeeRepository hostlerFeerepository;

	@Autowired
	private HostlerRepository hostlerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<List<HostlerFeeDto>> getAll() {
		List<HostlerFee> hostlerFeeData = hostlerFeerepository.findAll();
//		if(hostlerFeeData.isEmpty())
//        {
//        	throw new ResourceNotFoundException("Hostlers Fee Details are Not Existed");
//        }
		List<HostlerFeeDto> hostlerFeeDtos = hostlerFeeData.stream()
				.map(hostlerFee -> modelMapper.map(hostlerFee, HostlerFeeDto.class)).collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(hostlerFeeDtos);
	}

	@Override
	public ResponseEntity<HostlerFeeDto> getById(long id) {
		Optional<HostlerFee> hostlerFee = hostlerFeerepository.findById(id);
		if (hostlerFee.isEmpty()) {
			throw new ResourceNotFoundException("Provided Id Was Not Found");
		}
		HostlerFeeDto hostlerFeeDto = modelMapper.map(hostlerFee.get(), HostlerFeeDto.class);
		return ResponseEntity.status(HttpStatus.OK).body(hostlerFeeDto);
	}

//	@Override
//	public ResponseEntity<String> createHostlerFee(HostlerFeeDto hostlerFeeDto) {
//		HostlerFee hostlerFee = modelMapper.map(hostlerFeeDto, HostlerFee.class);
//		hostlerFeerepository.save(hostlerFee);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body("HostlerFee created successfully");
//		
//	}

	@Override
	public ResponseEntity<String> createHostlerFee(HostlerFeeDto hostlerFeeDto) {

		String mobileNo = hostlerFeeDto.getHostlerMobile();
		String hostelName = hostlerFeeDto.getHostelName();
		
		try {
			if (hostlerFeerepository.findByHostelNameAndHostlerMobile(hostelName, mobileNo).isEmpty()) {
				LocalDate dueDate = generateDueDate(hostlerFeeDto.getDateOfJoining());
				HostlerFee h=modelMapper.map(hostlerFeeDto, HostlerFee.class);
//				h.setDueDate(dueDate);
				h.setPaymentStatus(hostlerFeeDto.getPaymentStatus());
				hostlerFeerepository.save(h);
				return ResponseEntity.status(HttpStatus.CREATED).body("HostlerFee created successfully");
			} else {
				LocalDate dueDate = hostlerFeeDto.getDueDate();
				HostlerFee h=modelMapper.map(hostlerFeeDto, HostlerFee.class);
				hostlerFeerepository.save(h);
				return ResponseEntity.status(HttpStatus.CREATED).body("HostlerFee updated successfully");
			}
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while creating HostlerFee");
		}
	}

	@Override
	public ResponseEntity<String> deleteHostlerFee(long id) {
		Optional<HostlerFee> hostlerFee = hostlerFeerepository.findById(id);
		if (hostlerFee.isEmpty()) {
			throw new ResourceNotFoundException("Provided Id Details are Not Existed");
		} else {
			hostlerFeerepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("HostlerFee Details are deleted succcessfully");
		}
	}

	@Override
	public ResponseEntity<String> editHostlerFeeById(long id, HostlerFeeDto hostlerFeeDto) {
		Optional<HostlerFee> hostlerFee = hostlerFeerepository.findById(id);
		if (hostlerFee.isEmpty()) {
			throw new ResourceNotFoundException("Provided Id Details are Not Existed");
		} else {
			HostlerFee existingHostlerFee = hostlerFee.get();

			// Check if the mobile number has changed
			if (!existingHostlerFee.getHostlerMobile().equals(hostlerFeeDto.getHostlerMobile())) {

				// Check if the new mobile number already exists with the given name and email
				String name = hostlerFeeDto.getHostlerName();
				String mobile = hostlerFeeDto.getHostlerMobile();
				String email = hostlerFeeDto.getHostlerEmail();

				Optional<HostlerFee> hostlerFeeWithNewMobile = hostlerFeerepository
						.findByHostlerNameAndHostlerMobileAndHostlerEmail(name, mobile, email);

				if (hostlerFeeWithNewMobile.isPresent()) {
					throw new DuplicateEntryException("Provided mobile number and other details already exist");
				}
			}

			//Update the hostler fee details
			existingHostlerFee.setHostlerEmail(hostlerFeeDto.getHostlerEmail());
			existingHostlerFee.setHostlerMobile(hostlerFeeDto.getHostlerMobile());
			existingHostlerFee.setHostlerName(hostlerFeeDto.getHostlerName());
			existingHostlerFee.setPaymentStatus(hostlerFeeDto.getPaymentStatus());
			existingHostlerFee.setStartDate(hostlerFeeDto.getStartDate());
			existingHostlerFee.setDueDate(hostlerFeeDto.getDueDate());
			existingHostlerFee.setPaymentAmount(hostlerFeeDto.getPaymentAmount());
			
			// Save the updated entity
			hostlerFeerepository.save(existingHostlerFee);

			return ResponseEntity.status(HttpStatus.CREATED).body("Updated Successfully");
		}
	}

	@Override
	public ResponseEntity<List<HostlerFeeDto>> getByMobileNumber(String mobileNo) {
		if (mobileNo == null) {
			throw new ResourceNotFoundException("Mobile Number is Empty");
		} else {
			List<HostlerFee> hostlerFee1 = hostlerFeerepository.findByHostlerMobile(mobileNo);
			if (hostlerFee1.isEmpty()) {
				throw new ResourceNotFoundException("Mobile number with the Provided data is not available");
			} else {
				List<HostlerFeeDto> hostlerFeeDtos = hostlerFee1.stream()
						.map(hostlerFee -> modelMapper.map(hostlerFee, HostlerFeeDto.class))
						.collect(Collectors.toList());
				return ResponseEntity.status(HttpStatus.OK).body(hostlerFeeDtos);

			}
		}
	}

	@Override
	public ResponseEntity<List<HostlerFeeDto>> getByHostelName(String hostelName) {
		if (hostelName == null) {
			throw new ResourceNotFoundException("hostelName Number is Empty");
		} else {
			List<HostlerFee> hostlerFee1 = hostlerFeerepository.findByHostelName(hostelName);
			if (hostlerFee1.isEmpty()) {
				throw new ResourceNotFoundException("hostelName number with the Provided data is not available");
			} else {
				List<HostlerFeeDto> hostlerFeeDtos = hostlerFee1.stream()
						.map(hostlerFee -> modelMapper.map(hostlerFee, HostlerFeeDto.class))
						.collect(Collectors.toList());
				return ResponseEntity.status(HttpStatus.OK).body(hostlerFeeDtos);

//				return ResponseEntity.status(HttpStatus.OK).body(hostlerFeeDtos);

			}
		}
	}

//
//	@Override
//		public ResponseEntity<String> editHostlerFeeById(long id, HostlerFeeDto hostlerFeeDto) {
//		 Optional<HostlerFee> hostlerFee = hostlerFeerepository.findById(id);
//	        if (hostlerFee.isEmpty()) {
//	            throw new ResourceNotFoundException("Provided Id Details are Not Existed");
//	        }
//	        else
//	        {
//	        	HostlerFee existingHostlerFee = hostlerFee.get();
//	        	if(existingHostlerFee.getHostlerMobile() != hostlerFeeDto.getHostlerMobile())
//	        	{
//	        		  String name = hostlerFeeDto.getHostlerName();
//	        	        String mobile = hostlerFeeDto.getHostlerMobile();
//	        	        String email = hostlerFeeDto.getHostlertEmail();
//	        	      
//	        	        
//	        	        Optional<HostlerFee> hostlerFee1 = hostlerFeerepository.findByHostlerNameAndHostlerMobileAndHostlertEmail(name,mobile,email);
//	        	        
////	        	        Optional<Hostler> hostler1 = hostlerRepository.findByHostlerNameAndHostlerMobile(name,mobile);
//	        		 if(hostlerFee1.isEmpty())
//	        		 {
////	        			 existingHostler.setHostel(hostlerDto.getHostel());
//	        			 existingHostlerFee.setHostlertEmail(hostlerFeeDto.getHostlertEmail());
//	        			 existingHostlerFee.setHostlerMobile(hostlerFeeDto.getHostlerMobile());
//	        			 existingHostlerFee.setHostlerName(hostlerFeeDto.getHostlerName());
//	        			 existingHostlerFee.setPaymentStatus(hostlerFeeDto.getPaymentStatus());
//	        			 
//	        			 hostlerFeerepository.save(existingHostlerFee);
//	        			 
//	        				return ResponseEntity.status(HttpStatus.CREATED).body("Updated Successfully existed hostler");
//	        		 }
//	        		 else
//	        		 {
//	        			 throw new ResourceNotFoundException("Provided Id Details are already existed");
//	        		 }
//	        	}
//	        }
//		return null;
//	}

	public LocalDate generateDueDate(LocalDate dateOfJoining) {
		LocalDate currentDate = LocalDate.now();
		return LocalDate.of(currentDate.getYear(), currentDate.getMonth(), dateOfJoining.getDayOfMonth());
	}

}