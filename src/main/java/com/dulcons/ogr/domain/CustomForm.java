package com.dulcons.ogr.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NegativeOrZero;
import org.hibernate.validator.constraints.Range;

@Entity
public class CustomForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String type;
    private String title;
    private Long money;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @OrderBy("orderNum asc")
    @JoinColumn(name = "form_id")
    private Set<CustomField> fields = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<CustomField> getFields() {
        return fields;
    }

    public void setFields(Set<CustomField> fields) {
        this.fields = fields;
    }

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }
}
