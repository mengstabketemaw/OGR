package com.dulcons.ogr.domain.notification;

public enum NotificationType {
    NEW_APPLICATION(1),
    PAYMENT_IS_MADE(2),
    AMENDMENT(3),
    APPLICATION_STATUS_CHANGE(4);

    private String message;

    NotificationType(int id) {
        switch (id) {
            case 1:
                this.message = "New Application registered";
                break;
            case 2:
                this.message = "Payment is made";
                break;
            case 3:
                this.message = "Amendment Request";
                break;
            case 4:
                this.message = "Application status is changed";
                break;
            case 5:
                this.message = "Licence is declined";
                break;
        }
    }

    public String getMessage() {
        return this.message;
    }
}
