package com.oscar.backend.service;

import com.oscar.backend.model.Request;
import com.oscar.backend.model.RequestContact;
import com.oscar.backend.repository.RequestContactRepository;
import com.oscar.backend.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {
    private final RequestRepository repo;
    private final RequestContactRepository contactRepo;

    public Mono<Request> createWithContacts(Request req, List<RequestContact> extras) {
        return repo.save(req)
                .flatMap(saved ->
                        Flux.fromIterable(extras)
                                .map(c -> c.toBuilder()
                                        .requestId(saved.getId())
                                        .build())
                                .flatMap(contactRepo::save)
                                .collectList()
                                .map(list -> saved)
                );
    }

    public Flux<Request> list() {
            return repo.findAll();
    }

    public Mono<RequestDetail> detail(Integer id) {
        Mono<Request> r = repo.findById(id);
        Flux<RequestContact> c = contactRepo.findAllByRequestId(id);
        return r.zipWith(c.collectList())
                .map(t -> new RequestDetail(t.getT1(), t.getT2()));
    }

    public Mono<Request> updateWithContacts(Integer id, Request req, List<RequestContact> extras) {
        req.setId(id);
        return repo.save(req)
                .flatMap(updated ->
                        contactRepo.findAllByRequestId(id)
                                .flatMap(contactRepo::delete)
                                .thenMany(
                                        Flux.fromIterable(extras)
                                                .map(c -> new RequestContact(
                                                        null,
                                                        id,
                                                        c.getContactName(),
                                                        c.getContactPhone()
                                                ))
                                                .flatMap(contactRepo::save)
                                )
                                .then(Mono.just(req))
                );
    }

    public Mono<Void> deleteRequest(Integer id) {
        return repo.deleteById(id);
    }

    public Flux<DataBuffer> exportCsv() {
        String header = "id,brand,requestType,submissionDate,primaryContactName,primaryContactPhone\n";
        DefaultDataBufferFactory fac = new DefaultDataBufferFactory();

        Flux<String> rows = repo.findAll()
                .map(r -> String.format("%d,%s,%s,%s,%s,%s\n",
                        r.getId(),
                        r.getBrand(),
                        r.getRequestType(),
                        r.getSubmissionDate(),
                        r.getPrimaryContactName(),
                        r.getPrimaryContactPhone()
                ));

        return Flux.concat(Mono.just(header), rows).map(line -> fac.wrap(line.getBytes(StandardCharsets.UTF_8)));
    }

    public record RequestDetail(Request request, List<RequestContact> contacts) {}
}
