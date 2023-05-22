package com.dulcons.ogr.domain;

import java.sql.Date;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Type;

@Entity
public class TechnicalReview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

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

    @ManyToOne(optional = false)
    @JoinColumn(name = "custom_field_id", nullable = false)
    private CustomField customField;

    @ManyToOne(optional = false)
    @JoinColumn(name = "licence_id", nullable = false)
    private Licence licence;

    public Licence getLicence() {
        return licence;
    }

    public void setLicence(Licence licence) {
        this.licence = licence;
    }

    public CustomField getCustomField() {
        return customField;
    }

    public void setCustomField(CustomField customField) {
        this.customField = customField;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getEncodingFileType() {
        return encodingFileType;
    }

    public void setEncodingFileType(String encodingFileType) {
        this.encodingFileType = encodingFileType;
    }
}
