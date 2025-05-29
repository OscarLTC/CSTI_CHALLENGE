package com.oscar.backend.controller;

import com.oscar.backend.model.Request;
import com.oscar.backend.model.RequestContact;
import com.oscar.backend.service.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {
    private final RequestService service;

    @PostMapping
    public Mono<Request> create(
            @Valid @RequestBody RequestWithContacts dto
    ) {
        return service.createWithContacts(dto.request(), dto.contacts());
    }

    @GetMapping
    public Flux<Request> list(
    ) {
        return service.list();
    }

    @GetMapping("/{id}")
    public Mono<RequestService.RequestDetail> detail(@PathVariable Integer id) {
        return service.detail(id);
    }

    @PutMapping("/{id}")
    public Mono<Request> update(
            @PathVariable Integer id,
            @Valid @RequestBody RequestWithContacts dto
    ) {
        return service.updateWithContacts(id, dto.request(), dto.contacts());
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable Integer id) {
        return service.deleteRequest(id);
    }


    @GetMapping("/export")
    public Mono<ResponseEntity<Flux<DataBuffer>>> export() {
        return Mono.just(
                ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=requests.csv")
                        .contentType(MediaType.TEXT_PLAIN)
                        .body(service.exportCsv())
        );
    }

    public record RequestWithContacts(
            @Valid Request request,
            List<@Valid RequestContact> contacts
    ) {}
}