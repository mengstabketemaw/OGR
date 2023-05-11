package com.dulcons.ogr.domain;

import java.sql.Date;
import java.time.Instant;
import java.util.Base64;
import javax.persistence.*;
import org.hibernate.annotations.Type;

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

    @Column(columnDefinition = "LONGBLOB", length = 2147483647)
    @Type(type = "org.hibernate.type.BinaryType")
    @Lob
    private byte[] file;

    private String encodingFileType;

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

    public String getFile() {
        if (file != null) {
            try {
                String base64String = Base64.getEncoder().encodeToString(file);
                return base64String;
            } catch (IllegalArgumentException e) {
                return null;
            }
        } else {
            return null;
        }
    }

    public void setFile(String file) {
        if (file != null) {
            try {
                String base64Data = file.substring(file.indexOf(",") + 1);
                this.file = Base64.getDecoder().decode(base64Data);
            } catch (IllegalArgumentException e) {
                this.file = null;
            }
        } else {
            this.file = null;
        }
    }

    public String getEncodingFileType() {
        return encodingFileType;
    }

    public void setEncodingFileType(String encodingFileType) {
        if (encodingFileType != null) {
            this.encodingFileType = encodingFileType;
        } else {
            this.encodingFileType = null;
        }
    }
}
