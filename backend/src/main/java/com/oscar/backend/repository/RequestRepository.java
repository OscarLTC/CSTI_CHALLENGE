package com.oscar.backend.repository;

import com.oscar.backend.model.Request;
import org.springframework.data.r2dbc.repository.R2dbcRepository;


public interface RequestRepository extends R2dbcRepository<Request,Integer> {
}
