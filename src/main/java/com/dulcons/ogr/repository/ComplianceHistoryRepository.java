package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.ComplianceHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplianceHistoryRepository extends JpaRepository<ComplianceHistory, Long> {
    List<ComplianceHistory> findDistinctByCompliance_Id(Long id);
}
