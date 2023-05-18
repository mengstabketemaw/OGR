package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.CustomField;
import com.dulcons.ogr.domain.CustomForm;
import com.dulcons.ogr.repository.CustomFieldRepository;
import com.dulcons.ogr.repository.CustomFormRepository;
import com.dulcons.ogr.service.dto.CustomFieldDto;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forms")
public class FormController {

    private final CustomFormRepository customFormRepository;
    private final CustomFieldRepository customFieldRepository;

    public FormController(CustomFormRepository customFormRepository, CustomFieldRepository customFieldRepository) {
        this.customFormRepository = customFormRepository;
        this.customFieldRepository = customFieldRepository;
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

    @GetMapping("state/{id}/{state_id}")
    public List<CustomField> getform(@PathVariable Long id, @PathVariable Long state_id) {
        return customFieldRepository.findByStateId(state_id, id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createForms(@RequestBody CustomForm customForm) {
        customFormRepository.save(customForm);
    }

    //    @PostMapping("/field")
    //    @ResponseStatus(HttpStatus.CREATED)
    //    public void createForms(@RequestBody CustomFieldDto customFieldDto) {
    //        int deleted = customFieldRepository.deleteByStateId(customFieldDto.getStateId());
    //        if (deleted == 1){
    //            customFieldRepository.InsertCustomField()
    //        }
    //    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateForms(@RequestBody CustomForm customForm, @PathVariable Long id) {
        customForm.setId(id);
        customFormRepository.save(customForm);
    }
}
