package com.oscar.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Table("request_contacts")
public class RequestContact {
    @Id
    private Integer id;
    private Integer requestId;
    private String contactName;
    private String contactPhone;
}
