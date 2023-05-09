package com.dulcons.ogr.domain;

import java.sql.Date;
import java.time.Instant;
import javax.persistence.*;

@Entity
public class LicenceFieldData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private FieldTypes fieldType;

    private String label;
    private String text;
    private String dropDown;
    private Date date;
    private Instant dateAndTime;
    private Integer checkBoxId;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDropDown() {
        return dropDown;
    }

    public void setDropDown(String dropDown) {
        this.dropDown = dropDown;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Instant getDateAndTime() {
        return dateAndTime;
    }

    public void setDateAndTime(Instant dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public Integer getCheckBoxId() {
        return checkBoxId;
    }

    public void setCheckBoxId(Integer checkBoxId) {
        this.checkBoxId = checkBoxId;
    }
}
