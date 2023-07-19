package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.State;
import com.dulcons.ogr.domain.WorkFlow;
import com.dulcons.ogr.domain.mapper.WorkFlowDto;
import com.dulcons.ogr.domain.mapper.WorkFlowMapper;
import com.dulcons.ogr.exception.ResourceNotFoundException;
import com.dulcons.ogr.repository.StateRepository;
import com.dulcons.ogr.repository.WorkFlowRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workflow")
@Tag(name = "Workflow", description = "Operations related to workflows")
public class WorkFlowController {

    private final WorkFlowRepository workFlowRepository;
    private final StateRepository stateRepository;
    private final WorkFlowMapper workFlowMapper;

    public WorkFlowController(WorkFlowRepository workFlowRepository, StateRepository stateRepository, WorkFlowMapper workFlowMapper) {
        this.workFlowRepository = workFlowRepository;
        this.stateRepository = stateRepository;
        this.workFlowMapper = workFlowMapper;
    }

    @GetMapping
    @Operation(summary = "Get all workflows")
    public Iterable<WorkFlow> getAll() {
        return workFlowRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a workflow by ID")
    @ApiResponses(
        {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the workflow"),
            @ApiResponse(responseCode = "404", description = "Workflow not found"),
        }
    )
    public WorkFlow getById(@PathVariable Long id) {
        return workFlowRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Work Flow Could not be found"));
    }

    @GetMapping("/form/{id}")
    @Operation(summary = "Get a workflow by form ID")
    public WorkFlow getByFormId(@PathVariable Long id) {
        return workFlowRepository.findByCustomForm_Id(id).orElseGet(() -> new WorkFlow());
    }

    @GetMapping("/state")
    @Operation(summary = "Get all workflow states")
    public Iterable<State> getAllState() {
        return workFlowRepository.findAllState();
    }

    @PostMapping("/state")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Add a workflow state")
    @ApiResponse(responseCode = "201", description = "State added successfully")
    public Iterable<State> addState(@RequestBody State state) {
        stateRepository.save(state);
        return workFlowRepository.findAllState();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Save a workflow")
    @ApiResponse(responseCode = "201", description = "Workflow saved successfully")
    public WorkFlow save(@RequestBody WorkFlow workFlow) {
        workFlowRepository.deleteByCustomForm(workFlow.getCustomForm());
        return workFlowRepository.save(workFlow);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Update a workflow by ID")
    @ApiResponse(responseCode = "202", description = "Workflow updated successfully")
    public WorkFlow saveById(@RequestBody WorkFlow workFlow, @PathVariable Long id) {
        workFlow.setId(id);
        return workFlowRepository.save(workFlow);
    }
}
