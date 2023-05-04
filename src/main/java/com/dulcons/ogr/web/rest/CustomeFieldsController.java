package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.FieldTypes;
import com.dulcons.ogr.repository.FieldTypesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/custome-field")
public class CustomeFieldsController {

    private final FieldTypesRepository fieldTypesRepository;

    public CustomeFieldsController(FieldTypesRepository fieldTypesRepository) {
        this.fieldTypesRepository = fieldTypesRepository;
    }

    @GetMapping("/names")
    public Iterable<FieldTypes> getAllFieldTypes() {
        return fieldTypesRepository.findAll();
    }
}
