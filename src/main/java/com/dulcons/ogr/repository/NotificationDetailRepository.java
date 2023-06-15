package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.notification.Notification;
import com.dulcons.ogr.domain.notification.NotificationDetail;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface NotificationDetailRepository extends JpaRepository<NotificationDetail, Long> {
    @Query("select count(distinct n) from NotificationDetail n where upper(n.username) = upper(?1) and n.seen = false ")
    long countByUsername(String username);

    @EntityGraph(attributePaths = { "notification" })
    @Query("select n from NotificationDetail n where n.username = ?1 and n.seen = false order by n.notification.dateTimeStamp DESC")
    List<NotificationDetail> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("update NotificationDetail n set n.seen = ?1 where n.id = ?2")
    int updateSeenById(Boolean seen, Long id);
}
