package com.dulcons.ogr.domain;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "company_id", "customForm_id" }) })
public class Compliance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    User company;

    @OneToOne
    @JoinColumn(name = "customForm_id", referencedColumnName = "id")
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
