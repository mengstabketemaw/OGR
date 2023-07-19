package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.User;
import com.dulcons.ogr.domain.notification.NotificationDetail;
import com.dulcons.ogr.repository.NotificationDetailRepository;
import com.dulcons.ogr.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.HashMap;
import java.util.List;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/notification")
@Tag(name = "Notification", description = "Operations related to notifications")
public class NotificationController {

    private final NotificationDetailRepository notificationDetailRepository;
    private final UserService userService;

    public NotificationController(NotificationDetailRepository notificationDetailRepository, UserService userService) {
        this.notificationDetailRepository = notificationDetailRepository;
        this.userService = userService;
    }

    @GetMapping
    @Operation(summary = "Get notifications by username", description = "Retrieves notifications for the authenticated user.")
    public List<NotificationDetail> getByUsername() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return notificationDetailRepository.findByUsername(user.getLogin());
    }

    @GetMapping("/count")
    @Operation(summary = "Get notification count", description = "Retrieves the count of notifications for the authenticated user.")
    public long count() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return notificationDetailRepository.countByUsername(user.getLogin());
    }

    @PutMapping("/seen/{id}")
    @Operation(summary = "Mark notification as seen", description = "Marks a notification as seen by providing its ID.")
    @ApiResponse(responseCode = "204", description = "Notification marked as seen successfully")
    public void putSeen(@PathVariable Long id) {
        notificationDetailRepository.updateSeenById(true, id);
    }

    @GetMapping(value = "/tawk")
    @Operation(summary = "Get Tawk.to chat details", description = "Retrieves Tawk.to chat details for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved Tawk.to chat details")
    public HashMap<String, String> getTawkChat() {
        HashMap<String, String> object = new HashMap<>();
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
        return object;
    }

    public static String generateHmacSha256(String data, String key) throws Exception {
        Mac hmacSha256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        hmacSha256.init(secretKey);

        byte[] hash = hmacSha256.doFinal(data.getBytes());
        return new String(Hex.encode(hash));
    }
}
