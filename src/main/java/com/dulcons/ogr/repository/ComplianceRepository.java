package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.Compliance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ComplianceRepository extends JpaRepository<Compliance, Long> {
    @Transactional
    @Modifying
    @Query("update Compliance c set c.status = ?1 where c.id = ?2")
    int updateStatusById(String status, Long id);

    @Override
    void deleteById(Long aLong);
}
