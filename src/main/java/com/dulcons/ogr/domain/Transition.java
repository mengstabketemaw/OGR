//package com.dulcons.ogr.domain;
//
//import javax.persistence.*;
//
//@Entity
//public class Transition {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "id", nullable = false)
//    private Long id;
//    @Column(name = "name", nullable = false, unique = true)
//    private String name;
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "from_state_id")
//    private State fromState;
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "to_state_id")
//    private State toState;
//
//    public State getToState() {
//        return toState;
//    }
//
//    public void setToState(State toState) {
//        this.toState = toState;
//    }
//
//    public State getFromState() {
//        return fromState;
//    }
//
//    public void setFromState(State fromState) {
//        this.fromState = fromState;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//}
