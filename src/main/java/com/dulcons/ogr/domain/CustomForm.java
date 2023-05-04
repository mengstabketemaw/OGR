package com.dulcons.ogr.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
public class CustomForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String type;
    private String title;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<CustomField> fields = new ArrayList<>();

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

    public List<CustomField> getFields() {
        return fields;
    }

    public void setFields(List<CustomField> fields) {
        this.fields = fields;
    }
}
