package com.dulcons.ogr.service.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.dulcons.ogr.domain.CustomForm} entity
 */
public class CustomFormDto implements Serializable {

    private final Long id;
    private final String type;
    private final String title;
    private final List<CustomFieldDto> fields;

    public CustomFormDto(Long id, String type, String title, List<CustomFieldDto> fields) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.fields = fields;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public List<CustomFieldDto> getFields() {
        return fields;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomFormDto entity = (CustomFormDto) o;
        return (
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.type, entity.type) &&
            Objects.equals(this.title, entity.title) &&
            Objects.equals(this.fields, entity.fields)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, title, fields);
    }

    @Override
    public String toString() {
        return (
            getClass().getSimpleName() +
            "(" +
            "id = " +
            id +
            ", " +
            "type = " +
            type +
            ", " +
            "title = " +
            title +
            ", " +
            "fields = " +
            fields +
            ")"
        );
    }
}
