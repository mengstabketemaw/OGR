package com.dulcons.ogr.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import javax.persistence.*;
import org.springframework.context.i18n.LocaleContextHolder;

@Entity
public class CustomField {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private FieldTypes fieldType;

    private String label;
    private String portugueseLabel;
    private Boolean required;
    private String placeholder;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<CustomOption> options = new ArrayList<>();

    @Column(name = "order_num")
    private Integer orderNum;

    @ManyToOne
    @JoinColumn(name = "display_on")
    private State displayOn;

    public State getDisplayOn() {
        return displayOn;
    }

    public void setDisplayOn(State displayOn) {
        this.displayOn = displayOn;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
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
        //        Locale locale = LocaleContextHolder.getLocale();
        //        if (locale.getLanguage().equals("en")) {
        //            return label;
        //        } else {
        //            return portugueseLabel;
        //        }
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomField that = (CustomField) o;
        return id.equals(that.id) && label.equals(that.label) && required.equals(that.required) && placeholder.equals(that.placeholder);
    }

    public String getPortugueseLabel() {
        return portugueseLabel;
    }

    public void setPortugueseLabel(String portugueseLabel) {
        this.portugueseLabel = portugueseLabel;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, label, required, placeholder);
    }
}
