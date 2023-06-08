package com.dulcons.ogr.domain;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

@Entity
public class Licence {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private CustomForm form;

    @ManyToOne
    private User user;

    private Instant submittedDate = Instant.now();
    private String status = "Inprogress";
    private String applicantUsername;
    private String remark;
    private String identifierTitle;
    private String identifierValue;

    @Column(name = "approved_date")
    private String approvedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    private State stage = new State(0L, "Form");

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LicenceFieldData> data = new ArrayList<>();

    public String getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(String approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomForm getForm() {
        return form;
    }

    public void setForm(CustomForm form) {
        this.form = form;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<LicenceFieldData> getData() {
        return data;
    }

    public void setData(List<LicenceFieldData> fieldData) {
        this.data = fieldData;
    }

    public Instant getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Instant submittedDate) {
        this.submittedDate = submittedDate;
    }

    public State getStage() {
        return stage;
    }

    public void setStage(State stage) {
        this.stage = stage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplicantUsername() {
        return applicantUsername;
    }

    public void setApplicantUsername(String applicantUsername) {
        this.applicantUsername = applicantUsername;
    }

    public String getIdentifierTitle() {
        return identifierTitle;
    }

    public void setIdentifierTitle(String identifierTitle) {
        this.identifierTitle = identifierTitle;
    }

    public String getIdentifierValue() {
        return identifierValue;
    }

    public void setIdentifierValue(String identifierValue) {
        this.identifierValue = identifierValue;
    }
}
