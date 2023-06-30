package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.User;
import com.dulcons.ogr.domain.notification.NotificationDetail;
import com.dulcons.ogr.repository.NotificationDetailRepository;
import com.dulcons.ogr.service.UserService;
import java.util.List;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.crypto.codec.Hex;
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

    @GetMapping(value = "/tawk")
    public String getTawkChat() {
        JSONObject object = new JSONObject();
        userService
            .getUserWithAuthorities()
            .ifPresent(user -> {
                try {
                    object.put("name", user.getLastName());
                    object.put("email", user.getEmail());
                    object.put("hash", generateHmacSha256(user.getEmail(), "46e5af23c86903fef3af659942f353fbfdf9ee00"));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        return object.toString();
    }

    public static String generateHmacSha256(String data, String key) throws Exception {
        Mac hmacSha256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        hmacSha256.init(secretKey);

        byte[] hash = hmacSha256.doFinal(data.getBytes());
        return new String(Hex.encode(hash));
    }
}
