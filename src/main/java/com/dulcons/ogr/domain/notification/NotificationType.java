package com.dulcons.ogr.domain.notification;

public enum NotificationType {
    //Admin notification
    NEW_APPLICATION(1),
    PAYMENT_IS_MADE(2),
    APPLICATION_UPDATE(8),
    AMENDMENT(3),

    //User notifications
    APPLICATION_STATUS_CHANGE(4),
    LICENCE_APPROVED(5),
    LICENCE_DECLINED(6),
    MORE_INFO(7);

    private String message;

    NotificationType(int id) {
        switch (id) {
            case 1:
                this.message = "New application is registered";
                break;
            case 2:
                this.message = "Payment is made";
                break;
            case 3:
                this.message = "Amendment Request";
                break;
            case 4:
                this.message = "Application status is changed to {0}";
                break;
            case 5:
                this.message = "Licence is Approved";
                break;
            case 6:
                this.message = "Licence is Declined";
                break;
            case 7:
                this.message = "More information is required";
                break;
            case 8:
                this.message = "Application is updated";
                break;
        }
    }

    public String getMessage() {
        return this.message;
    }
}
