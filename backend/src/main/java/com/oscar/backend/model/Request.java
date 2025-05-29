package com.oscar.backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("requests")
public class Request {
    @Id
    private Integer id;
    private String brand;
    private String requestType;
    private LocalDate submissionDate;
    private String primaryContactName;
    private String primaryContactPhone;
}
