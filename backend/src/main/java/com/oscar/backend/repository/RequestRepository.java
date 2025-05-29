package com.oscar.backend.repository;

import com.oscar.backend.model.Request;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

import java.time.LocalDate;

public interface RequestRepository extends R2dbcRepository<Request,Integer> {
    Flux<Request> findAllByRequestType(String requestType);
    Flux<Request> findAllBySubmissionDateBetween(LocalDate start, LocalDate end);
}
