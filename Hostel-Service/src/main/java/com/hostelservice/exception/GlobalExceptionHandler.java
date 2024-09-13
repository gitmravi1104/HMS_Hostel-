package com.hostelservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler 
{
	@ExceptionHandler(InternalServerException.class)
	public ResponseEntity<String> handleCustomFindAllException(InternalServerException ex)
	{
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex)
	{
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}
	
	@ExceptionHandler(DuplicateEntryException.class)
	public ResponseEntity<String> handleDuplicateEntryException(DuplicateEntryException ex)
	{
		return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
	}
}
