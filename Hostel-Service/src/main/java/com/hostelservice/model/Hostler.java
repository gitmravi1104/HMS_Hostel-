package com.hostelservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Hostler {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long hostlerId;

    private String hostlerMobile;
    private String hostlerName;
    private String hostlerEmail;
    private String hostlerFatherName;
    private String hostlerAddress;
    private String hostlerCollegeName;
    private String hostlerRoomNo;
    private String altmobile;

    @ManyToOne
    @JoinColumn(name = "hostel_id")
    private Hostel hostel;
}
