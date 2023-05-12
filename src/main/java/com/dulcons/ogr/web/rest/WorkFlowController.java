package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.WorkFlow;
import com.dulcons.ogr.exception.ResourceNotFoundException;
import com.dulcons.ogr.repository.WorkFlowRepository;
import java.util.List;
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
