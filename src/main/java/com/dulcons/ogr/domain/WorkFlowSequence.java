package com.dulcons.ogr.domain;

import javax.persistence.*;

@Entity
public class WorkFlowSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "state_id")
    private State state;

    @OneToOne
    @JoinColumn(name = "to_state_id")
    private State toState;

    @Column(name = "sequence")
    private Integer sequence;

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public State getToState() {
        return toState;
    }

    public void setToState(State toState) {
        this.toState = toState;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
