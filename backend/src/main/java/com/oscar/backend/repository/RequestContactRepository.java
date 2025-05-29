package com.oscar.backend.repository;

import com.oscar.backend.model.RequestContact;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface RequestContactRepository extends R2dbcRepository<RequestContact, Integer> {
    Flux<RequestContact> findAllByRequestId(Integer requestId);
}