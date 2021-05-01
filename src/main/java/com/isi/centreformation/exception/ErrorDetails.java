package com.isi.centreformation.exception;


import java.time.LocalDate;

public class ErrorDetails {
	private LocalDate date;
    private String message;
    private String details;

    public ErrorDetails(LocalDate date, String message, String details) {
        super();
        this.date = date;
        this.message = message;
        this.details = details;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
}
    
}   
