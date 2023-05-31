package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.ComplianceHistory;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComplianceHistoryRepository extends JpaRepository<ComplianceHistory, Long> {
    @Query(
        "select count(c) from ComplianceHistory c " +
        "where c.status = ?1 and c.compliance.customForm.id >= ?2 and c.compliance.company.id = ?3"
    )
    long countByStatusAndCompliance_CustomForm_IdGreaterThanEqualAndCompliance_Company_Id(String status, Long id, Long id1);

    @Query(
        "select count(c) from ComplianceHistory c " +
        "where c.status = ?1 and c.compliance.customForm.id <= ?2 and c.compliance.company.id = ?3"
    )
    long countByStatusAndCompliance_CustomForm_IdLessThanEqualAndCompliance_Company_Id(String status, Long id, Long id1);

    @Query("select count(c) from ComplianceHistory c where c.status = ?1 and c.compliance.company.id = ?2")
    long countByStatusAndCompliance_Company_Id(String status, Long id);

    @Query("select count(c) from ComplianceHistory c where c.status = ?1")
    long countByStatus(String status);

    @Query("select count(c) from ComplianceHistory c")
    long countFirstBy();

    @Query("select count(c) from ComplianceHistory c where c.date >= ?1")
    long countByDateGreaterThanEqual(LocalDate date);

    Page<ComplianceHistory> findDistinctByCompliance_Id(Long complianceId, Pageable pageable);

    @Override
    void deleteById(Long aLong);
}
