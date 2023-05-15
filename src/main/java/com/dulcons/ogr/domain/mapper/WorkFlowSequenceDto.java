package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.WorkFlowSequence;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link WorkFlowSequence} entity
 */
public class WorkFlowSequenceDto implements Serializable {

    private final Long id;
    private final Long stateId;
    private final Long toStateId;
    private final Integer sequence;

    public WorkFlowSequenceDto(Long id, Long stateId, Long toStateId, Integer sequence) {
        this.id = id;
        this.stateId = stateId;
        this.toStateId = toStateId;
        this.sequence = sequence;
    }

    public Long getId() {
        return id;
    }

    public Long getStateId() {
        return stateId;
    }

    public Long getToStateId() {
        return toStateId;
    }

    public Integer getSequence() {
        return sequence;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkFlowSequenceDto entity = (WorkFlowSequenceDto) o;
        return (
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.stateId, entity.stateId) &&
            Objects.equals(this.toStateId, entity.toStateId) &&
            Objects.equals(this.sequence, entity.sequence)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, stateId, toStateId, sequence);
    }

    @Override
    public String toString() {
        return (
            getClass().getSimpleName() +
            "(" +
            "id = " +
            id +
            ", " +
            "stateId = " +
            stateId +
            ", " +
            "toStateId = " +
            toStateId +
            ", " +
            "sequence = " +
            sequence +
            ")"
        );
    }
}
