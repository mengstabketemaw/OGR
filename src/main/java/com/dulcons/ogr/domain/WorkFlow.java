package com.dulcons.ogr.domain;

import java.util.LinkedHashSet;
import java.util.Set;
import javax.persistence.*;

@Entity
public class WorkFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "work_flow_id")
    private Set<WorkFlowSequence> workFlowSequences = new LinkedHashSet<>();

    @OneToMany(mappedBy = "workFlow", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CustomForm> customForms = new LinkedHashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<WorkFlowSequence> getWorkFlowSequences() {
        return workFlowSequences;
    }

    public void setWorkFlowSequences(Set<WorkFlowSequence> workFlowSequences) {
        this.workFlowSequences = workFlowSequences;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<CustomForm> getCustomForms() {
        return customForms;
    }

    public void setCustomForms(Set<CustomForm> customForms) {
        this.customForms = customForms;
    }
}
