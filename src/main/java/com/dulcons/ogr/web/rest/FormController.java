package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.CustomForm;
import com.dulcons.ogr.repository.CustomFormRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forms")
public class FormController {

    private final CustomFormRepository customFormRepository;

    public FormController(CustomFormRepository customFormRepository) {
        this.customFormRepository = customFormRepository;
    }

    @GetMapping
    @Transactional
    public List<CustomForm> getAllForms() {
        return customFormRepository.findAll();
    }

    @GetMapping("/{id}")
    public CustomForm getform(@PathVariable Long id) {
        Optional<CustomForm> data = customFormRepository.findById(id);
        return data.orElse(null);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createForms(@RequestBody CustomForm customForm) {
        customFormRepository.save(customForm);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateForms(@RequestBody CustomForm customForm, @PathVariable Long id) {
        customForm.setId(id);
        customFormRepository.save(customForm);
    }
}
