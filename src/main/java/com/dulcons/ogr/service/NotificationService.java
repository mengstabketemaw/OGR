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
import java.util.List;
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

    public void createAdminNotification(String source, NotificationType type, String arg) {
        List<User> users = userRepository.findByAuthority("ROLE_ADMIN");
        saveNotification(source, type, arg, users);
    }

    public void createUserNotification(String source, NotificationType type, User user, String arg) {
        //First set the notification
        saveNotification(source, type, arg, List.of(user));
    }

    public void notificationForLicenceUpdate(State name, String status, Licence licence, String arg) {
        try {
            if (status.equalsIgnoreCase("Inprogress")) {
                createUserNotification(
                    licence.getId().toString(),
                    NotificationType.APPLICATION_STATUS_CHANGE,
                    licence.getUser(),
                    name.getName()
                );
            } else if (status.equalsIgnoreCase("Authorized")) {
                createUserNotification(licence.getId().toString(), NotificationType.LICENCE_APPROVED, licence.getUser(), arg);
            } else if (status.equalsIgnoreCase("Denied")) {
                createUserNotification(licence.getId().toString(), NotificationType.LICENCE_DECLINED, licence.getUser(), arg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveNotification(String source, NotificationType type, String arg, List<User> users) {
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

        notification.setDateTimeStamp(Instant.now());
        notification.setType(type);
        notificationRepository.save(notification);

        //Then set the details
        for (User user : users) {
            NotificationDetail detail = new NotificationDetail();
            detail.setUsername(user.getLogin());
            detail.setNotification(notification);
            notificationDetailRepository.save(detail);
            mailService.sendEmailNotification(user, "Action Required", notification.getMessage());
        }
    }
}
