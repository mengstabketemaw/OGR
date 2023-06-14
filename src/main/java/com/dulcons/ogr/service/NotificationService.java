package com.dulcons.ogr.service;

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

    public NotificationService(
        UserRepository userRepository,
        NotificationDetailRepository notificationDetailRepository,
        NotificationRepository notificationRepository
    ) {
        this.userRepository = userRepository;
        this.notificationDetailRepository = notificationDetailRepository;
        this.notificationRepository = notificationRepository;
    }

    public void createAdminNotification(String source, NotificationType type) {
        List<User> users = userRepository.findByAuthority("ROLE_ADMIN");

        //First set the notification
        Notification notification = new Notification();
        notification.setSource(source);
        notification.setMessage(type.getMessage());
        notification.setDateTimeStamp(Instant.now());
        notification.setType(type);
        notificationRepository.save(notification);

        //Then set the details
        for (User user : users) {
            NotificationDetail detail = new NotificationDetail();
            detail.setUsername(user.getLogin());
            detail.setNotification(notification);
            notificationDetailRepository.save(detail);
        }
    }

    public void createUserNotification(String source, NotificationType type, User user) {
        //First set the notification
        Notification notification = new Notification();
        notification.setSource(source);
        notification.setMessage(type.getMessage());
        notification.setDateTimeStamp(Instant.now());
        notification.setType(type);
        notificationRepository.save(notification);

        //Then set the details
        NotificationDetail detail = new NotificationDetail();
        detail.setUsername(user.getLogin());
        detail.setNotification(notification);
        notificationDetailRepository.save(detail);
    }
}
