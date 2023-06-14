package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.User;
import com.dulcons.ogr.domain.notification.NotificationDetail;
import com.dulcons.ogr.repository.NotificationDetailRepository;
import com.dulcons.ogr.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notification")
public class NotificationController {

    private final NotificationDetailRepository notificationDetailRepository;
    private final UserService userService;

    public NotificationController(NotificationDetailRepository notificationDetailRepository, UserService userService) {
        this.notificationDetailRepository = notificationDetailRepository;
        this.userService = userService;
    }

    @GetMapping
    public List<NotificationDetail> getByUsername() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return notificationDetailRepository.findByUsername(user.getLogin());
    }

    @GetMapping("/count")
    public long count() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return notificationDetailRepository.countByUsername(user.getLogin());
    }

    @PutMapping("/seen/{id}")
    public void putSeen(@PathVariable Long id) {
        notificationDetailRepository.updateSeenById(true, id);
    }
}
