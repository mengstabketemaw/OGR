package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.State;
import com.dulcons.ogr.domain.WorkFlow;
import com.dulcons.ogr.exception.ResourceNotFoundException;
import com.dulcons.ogr.repository.WorkFlowRepository;
import java.util.List;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workflow")
public class WorkFlowController {

    private final WorkFlowRepository workFlowRepository;

    public WorkFlowController(WorkFlowRepository workFlowRepository) {
        this.workFlowRepository = workFlowRepository;
    }

    @GetMapping
    public Iterable<WorkFlow> getAll() {
        return workFlowRepository.findAll();
    }

    @GetMapping("/{id}")
    public WorkFlow getById(@PathVariable Long id) {
        return workFlowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Work Flow Could not be found"));
    }

    @GetMapping("/form/{id}")
    public WorkFlow getByFormId(@PathVariable Long id) {
        return Objects
            .requireNonNull(workFlowRepository.findByCustomForms_Id(id))
            .orElseThrow(() -> new ResourceNotFoundException("No WorkFlow For this form"));
    }

    @GetMapping("/state")
    public Iterable<State> getAllState() {
        return workFlowRepository.findAllState();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkFlow save(@RequestBody WorkFlow workFlow) {
        return workFlowRepository.save(workFlow);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public WorkFlow saveById(@RequestBody WorkFlow workFlow, @PathVariable Long id) {
        workFlow.setId(id);
        return workFlowRepository.save(workFlow);
    }
}
