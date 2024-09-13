package com.hostelservice.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;


public class ResourceNotFoundException  extends RuntimeException
{
	public ResourceNotFoundException(String message)
	{
		super(message);
	}
}
