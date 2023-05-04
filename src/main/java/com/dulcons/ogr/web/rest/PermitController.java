package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.Permit;
import com.dulcons.ogr.repository.PermitRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/permits")
public class PermitController {

    private final PermitRepository permitRepository;

    public PermitController(PermitRepository permitRepository) {
        this.permitRepository = permitRepository;
    }

    @GetMapping
    @Transactional
    public List<Permit> getAllPermits() {
        return permitRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPermits(@RequestBody Permit permit) {
        permitRepository.save(permit);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updatePermits(@RequestBody Permit permit, @PathVariable Long id) {
        permit.setId(id);
        permitRepository.save(permit);
    }
}
