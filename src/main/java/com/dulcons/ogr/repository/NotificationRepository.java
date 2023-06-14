package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {}
