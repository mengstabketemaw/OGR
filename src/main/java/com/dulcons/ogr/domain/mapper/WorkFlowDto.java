package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.CustomForm;
import com.dulcons.ogr.domain.WorkFlow;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link WorkFlow} entity
 */
public class WorkFlowDto implements Serializable {

    private final Long id;
    private final String name;
    private final Set<WorkFlowSequenceDto> workFlowSequences;
    private final CustomForm customForm;

    public WorkFlowDto(Long id, String name, Set<WorkFlowSequenceDto> workFlowSequences, CustomForm customForm) {
        this.id = id;
        this.name = name;
        this.workFlowSequences = workFlowSequences;
        this.customForm = customForm;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<WorkFlowSequenceDto> getWorkFlowSequences() {
        return workFlowSequences;
    }

    public CustomForm getCustomForm() {
        return customForm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkFlowDto entity = (WorkFlowDto) o;
        return (
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.name, entity.name) &&
            Objects.equals(this.workFlowSequences, entity.workFlowSequences) &&
            Objects.equals(this.customForm, entity.customForm)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, workFlowSequences, customForm);
    }

    @Override
    public String toString() {
        return (
            getClass().getSimpleName() +
            "(" +
            "id = " +
            id +
            ", " +
            "name = " +
            name +
            ", " +
            "workFlowSequences = " +
            workFlowSequences +
            ", " +
            "customForm = " +
            customForm +
            ")"
        );
    }
}
