package com.dulcons.ogr.domain.notification;

import java.time.Instant;
import javax.persistence.*;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    NotificationType type;
    private String source;
    private Instant dateTimeStamp;
    private String message;
    private String arg;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Instant getDateTimeStamp() {
        return dateTimeStamp;
    }

    public void setDateTimeStamp(Instant dateTimeStamp) {
        this.dateTimeStamp = dateTimeStamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getArg() {
        return arg;
    }

    public void setArg(String arg) {
        this.arg = arg;
    }
}
