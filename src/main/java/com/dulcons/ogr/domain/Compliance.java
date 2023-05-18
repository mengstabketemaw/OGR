package com.dulcons.ogr.domain;

import javax.persistence.*;

@Entity
public class Compliance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    User company;

    @OneToOne
    CustomForm customForm;

    String status = "Not Inspected";

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCompany() {
        return company;
    }

    public void setCompany(User company) {
        this.company = company;
    }

    public CustomForm getCustomForm() {
        return customForm;
    }

    public void setCustomForm(CustomForm customForm) {
        this.customForm = customForm;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
