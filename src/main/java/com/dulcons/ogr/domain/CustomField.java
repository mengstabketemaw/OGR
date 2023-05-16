package com.dulcons.ogr.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
public class CustomField {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private FieldTypes fieldType;

    private String label;
    private Boolean required;
    private String placeholder;

    private Long stateId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<CustomOption> options = new ArrayList<>();

    public Long getStateId() {
        return stateId;
    }

    public void setStateId(Long stateId) {
        this.stateId = stateId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FieldTypes getFieldType() {
        return fieldType;
    }

    public void setFieldType(FieldTypes fieldType) {
        this.fieldType = fieldType;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public String getPlaceholder() {
        return placeholder;
    }

    public void setPlaceholder(String placeHolder) {
        this.placeholder = placeHolder;
    }

    public List<CustomOption> getOptions() {
        return options;
    }

    public void setOptions(List<CustomOption> options) {
        this.options = options;
    }
}
