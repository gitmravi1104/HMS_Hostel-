package com.hostelservice.exception;


public class DuplicateEntryException extends RuntimeException
{
	public DuplicateEntryException(String message)
	{
		super(message);
	}
}
