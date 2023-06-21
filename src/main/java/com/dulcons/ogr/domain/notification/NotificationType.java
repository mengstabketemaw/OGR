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
    private String emailMessage;

    NotificationType(int id) {
        switch (id) {
            //Admin notifications
            case 1:
                this.message = "New application submitted";
                this.emailMessage = "New {0} application submitted by {1} company";
                break;
            case 2:
                this.message = "Payment made";
                this.emailMessage = "Payment made for {0} application by {1} company";
                break;
            case 3:
                this.message = "Amendment Requested";
                this.emailMessage = "Amendment Requested for {0} application by {1} company. Request: {2}";
                break;
            case 8:
                this.message = "Application updated";
                this.emailMessage = "Application {0} updated by {1} company";
                break;
            //User notifications
            case 4:
                this.message = "Application status changed to {0}";
                this.emailMessage = "{0} application status changed to {1}";
                break;
            case 5:
                this.message = "Licence Approved";
                this.emailMessage = "{0} Approved";
                break;
            case 6:
                this.message = "Licence Declined";
                this.emailMessage = "{0} Declined";
                break;
            case 7:
                this.message = "More information required";
                this.emailMessage = "You are requested to include more information on application {0}. Remark: {1}";
                break;
        }
    }

    public String getMessage() {
        return this.message;
    }

    public String getEmailMessage() {
        return this.emailMessage;
    }
}
