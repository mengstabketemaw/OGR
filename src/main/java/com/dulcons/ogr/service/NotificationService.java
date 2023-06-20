package com.dulcons.ogr.service;

import com.dulcons.ogr.domain.Licence;
import com.dulcons.ogr.domain.State;
import com.dulcons.ogr.domain.User;
import com.dulcons.ogr.domain.notification.Notification;
import com.dulcons.ogr.domain.notification.NotificationDetail;
import com.dulcons.ogr.domain.notification.NotificationType;
import com.dulcons.ogr.repository.NotificationDetailRepository;
import com.dulcons.ogr.repository.NotificationRepository;
import com.dulcons.ogr.repository.UserRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final UserRepository userRepository;
    private final NotificationDetailRepository notificationDetailRepository;
    private final NotificationRepository notificationRepository;
    private final MailService mailService;

    public NotificationService(
        UserRepository userRepository,
        NotificationDetailRepository notificationDetailRepository,
        NotificationRepository notificationRepository,
        MailService mailService
    ) {
        this.userRepository = userRepository;
        this.notificationDetailRepository = notificationDetailRepository;
        this.notificationRepository = notificationRepository;
        this.mailService = mailService;
    }

    @Async
    public void createAdminNotification(String source, NotificationType type, String arg, String emailArg) {
        List<User> users = userRepository.findByAuthority("ROLE_ADMIN");
        saveNotification(source, type, arg, emailArg, users);
    }

    @Async
    public void createUserNotification(String source, NotificationType type, User user, String arg, String emailArg) {
        //First set the notification
        saveNotification(source, type, arg, emailArg, List.of(user));
    }

    @Async
    public void notificationForLicenceUpdate(State name, String status, Licence licence, String arg, String emailArg) {
        try {
            if (status.equalsIgnoreCase("Inprogress")) {
                createUserNotification(
                    licence.getId().toString(),
                    NotificationType.APPLICATION_STATUS_CHANGE,
                    licence.getUser(),
                    name.getName(),
                    emailArg + "~" + name.getName()
                );
            } else if (status.equalsIgnoreCase("Authorized")) {
                createUserNotification(licence.getId().toString(), NotificationType.LICENCE_APPROVED, licence.getUser(), arg, emailArg);
                mailService.genericNotificationSender(
                    licence.getUser(),
                    "mail/applicationStatusChanged",
                    "Status Update",
                    Map.of("status", "Approved", "application", licence.getForm().getTitle())
                );
            } else if (status.equalsIgnoreCase("Denied")) {
                createUserNotification(licence.getId().toString(), NotificationType.LICENCE_DECLINED, licence.getUser(), arg, emailArg);
                mailService.genericNotificationSender(
                    licence.getUser(),
                    "mail/applicationStatusChanged",
                    "Status Update",
                    Map.of("status", "Denied", "application", licence.getForm().getTitle())
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveNotification(String source, NotificationType type, String arg, String emailArg, List<User> users) {
        //First set the notification
        Notification notification = new Notification();
        notification.setSource(source);
        notification.setMessage(type.getMessage());
        notification.setArg(arg);

        //setting message but first replace the arg with the placeholder
        String[] args = arg.split("~");
        for (int i = 0; i < args.length; i++) {
            String message = notification.getMessage();
            notification.setMessage(message.replace("{" + i + "}", args[i]));
        }

        //Setting the email message the same way
        String[] emailArgs = emailArg.split("~");
        String emailMessage = type.getEmailMessage();
        for (int i = 0; i < emailArgs.length; i++) {
            emailMessage = emailMessage.replace("{" + i + "}", emailArgs[i]);
        }

        notification.setDateTimeStamp(Instant.now());
        notification.setType(type);
        notificationRepository.save(notification);

        //Then set the details
        for (User user : users) {
            NotificationDetail detail = new NotificationDetail();
            detail.setUsername(user.getLogin());
            detail.setNotification(notification);
            notificationDetailRepository.save(detail);

            if (
                !type.equals(NotificationType.NEW_APPLICATION) &&
                !type.equals(NotificationType.LICENCE_APPROVED) &&
                !type.equals(NotificationType.LICENCE_DECLINED)
            ) {
                mailService.sendEmailNotification(user, "Action Required", emailMessage, "mail/notificationEmail");
            }
        }
    }

    @Async
    public void createEmailToBothAdminAndUser(Licence licence) {
        List<User> users = userRepository.findByAuthority("ROLE_ADMIN");
        for (User user : users) {
            Map<String, Object> body = new HashMap<>();
            body.put("application", licence.getForm().getTitle());
            body.put("applicant", licence.getUser());
            body.put("type", licence.getForm().getType());
            body.put("date", LocalDate.now().toString());
            mailService.genericNotificationSender(
                user,
                "mail/newApplicationAdmin",
                "New " + licence.getForm().getType() + " Application Submitted",
                body
            );
            mailService.genericNotificationSender(
                licence.getUser(),
                "mail/newApplicationUser",
                "Application Update",
                Map.of("application", licence.getForm().getTitle())
            );
        }
    }
}
