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
    private String placeHolder;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CustomOption> options = new ArrayList<>();

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

    public String getPlaceHolder() {
        return placeHolder;
    }

    public void setPlaceHolder(String placeHolder) {
        this.placeHolder = placeHolder;
    }

    public List<CustomOption> getOptions() {
        return options;
    }

    public void setOptions(List<CustomOption> options) {
        this.options = options;
    }
}
