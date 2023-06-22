package com.dulcons.ogr.domain;

import java.time.LocalDate;
import javax.persistence.*;

@Entity
public class ComplianceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    LocalDate date;

    @OneToOne
    User inspector;

    @ManyToOne
    Compliance compliance;

    String finding;
    String status;

    @Lob
    @Column(name = "report", columnDefinition = "LONGTEXT")
    String report;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getInspector() {
        return inspector;
    }

    public void setInspector(User inspector) {
        this.inspector = inspector;
    }

    public Compliance getCompliance() {
        return compliance;
    }

    public void setCompliance(Compliance compliance) {
        this.compliance = compliance;
    }

    public String getFinding() {
        return finding;
    }

    public void setFinding(String finding) {
        this.finding = finding;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }
}
