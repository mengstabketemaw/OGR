package com.dulcons.ogr.domain.mapper;

import java.io.Serializable;
import java.sql.Date;
import java.time.Instant;

/**
 * DTO for {@link com.dulcons.ogr.domain.TechnicalReview}
 */
public class TechnicalReviewDto implements Serializable {

    private Long id;
    private String label;
    private String text;
    private String dropDown;
    private Date date;
    private Instant dateAndTime;
    private Integer checkBoxId;
    private String file;
    private String encodingFileType;
    private Long customFieldId;
    private Long licenceId;

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

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getEncodingFileType() {
        return encodingFileType;
    }

    public void setEncodingFileType(String encodingFileType) {
        this.encodingFileType = encodingFileType;
    }

    public Long getCustomFieldId() {
        return customFieldId;
    }

    public void setCustomFieldId(Long customFieldId) {
        this.customFieldId = customFieldId;
    }

    public Long getLicenceId() {
        return licenceId;
    }

    public void setLicenceId(Long licenceId) {
        this.licenceId = licenceId;
    }
}
