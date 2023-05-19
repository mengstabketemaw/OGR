package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.ComplianceHistory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplianceHistoryRepository extends JpaRepository<ComplianceHistory, Long> {
    Page<ComplianceHistory> findDistinctByCompliance_Id(Long complianceId, Pageable pageable);

    @Override
    void deleteById(Long aLong);
}
