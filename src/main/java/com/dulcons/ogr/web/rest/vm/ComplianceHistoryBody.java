package com.dulcons.ogr.web.rest.vm;

import java.time.LocalDate;

public class ComplianceHistoryBody {

    LocalDate date;
    Long inspectorId;
    Long complianceId;
    String finding;
    String status;
    String report;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getInspectorId() {
        return inspectorId;
    }

    public void setInspectorId(Long inspectorId) {
        this.inspectorId = inspectorId;
    }

    public Long getComplianceId() {
        return complianceId;
    }

    public void setComplianceId(Long complianceId) {
        this.complianceId = complianceId;
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
