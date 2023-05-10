package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.Licence;
import com.dulcons.ogr.repository.LicenceRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("/formByType")
    public Page<Licence> get(@RequestParam String type, Pageable pageable) {
        return licenceRepository.findDistinctByForm_Type(type, pageable);
    }

    @GetMapping("/form/{id}")
    public List<Licence> getbyForm(@PathVariable Long id) {
        return licenceRepository.findDistinctByForm_Id(id);
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
