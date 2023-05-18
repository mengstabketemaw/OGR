package com.dulcons.ogr.service.dto;

import com.dulcons.ogr.domain.CustomOption;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.dulcons.ogr.domain.CustomField} entity
 */
public class CustomFieldDto implements Serializable {

    private final Long id;
    private final Long fieldTypeId;
    private final String label;
    private final Boolean required;
    private final String placeholder;
    private final Long stateId;
    private final List<CustomOption> options;

    public CustomFieldDto(
        Long id,
        Long fieldTypeId,
        String label,
        Boolean required,
        String placeholder,
        Long stateId,
        List<CustomOption> options
    ) {
        this.id = id;
        this.fieldTypeId = fieldTypeId;
        this.label = label;
        this.required = required;
        this.placeholder = placeholder;
        this.stateId = stateId;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public Long getFieldTypeId() {
        return fieldTypeId;
    }

    public String getLabel() {
        return label;
    }

    public Boolean getRequired() {
        return required;
    }

    public String getPlaceholder() {
        return placeholder;
    }

    public Long getStateId() {
        return stateId;
    }

    public List<CustomOption> getOptions() {
        return options;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomFieldDto entity = (CustomFieldDto) o;
        return (
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.fieldTypeId, entity.fieldTypeId) &&
            Objects.equals(this.label, entity.label) &&
            Objects.equals(this.required, entity.required) &&
            Objects.equals(this.placeholder, entity.placeholder) &&
            Objects.equals(this.stateId, entity.stateId) &&
            Objects.equals(this.options, entity.options)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fieldTypeId, label, required, placeholder, stateId, options);
    }

    @Override
    public String toString() {
        return (
            getClass().getSimpleName() +
            "(" +
            "id = " +
            id +
            ", " +
            "fieldTypeId = " +
            fieldTypeId +
            ", " +
            "label = " +
            label +
            ", " +
            "required = " +
            required +
            ", " +
            "placeholder = " +
            placeholder +
            ", " +
            "stateId = " +
            stateId +
            ", " +
            "options = " +
            options +
            ")"
        );
    }
}
