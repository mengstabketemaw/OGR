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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "work_flow_id")
    @OrderBy("sequence Asc")
    private Set<WorkFlowSequence> workFlowSequences = new LinkedHashSet<>();

    @OneToOne
    @JoinColumn(name = "custom_form_id")
    private CustomForm customForm;

    public CustomForm getCustomForm() {
        return customForm;
    }

    public void setCustomForm(CustomForm customForm) {
        this.customForm = customForm;
    }

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
}
