package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.Licence;
import com.dulcons.ogr.repository.LicenceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/licence")
public class LicenceController {

    private final LicenceRepository licenceRepository;

    public LicenceController(LicenceRepository licenceRepository) {
        this.licenceRepository = licenceRepository;
    }

    @GetMapping
    public Iterable<Licence> getAll() {
        return licenceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Licence get(@PathVariable Long id) {
        return licenceRepository.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createLic(@RequestBody Licence licence) {
        licenceRepository.save(licence);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateLic(@RequestBody Licence licence, @PathVariable Long id) {
        licence.setId(id);
        licenceRepository.save(licence);
    }

    @DeleteMapping("/{id}")
    public void deleteLic(@PathVariable Long id) {
        licenceRepository.deleteById(id);
    }
}
