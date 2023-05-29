package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.Compliance;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ComplianceRepository extends JpaRepository<Compliance, Long> {
    @Query("select c from Compliance c where c.company.id = ?1 and c.customForm.id = ?2 and c.submittedDate = ?3")
    Compliance findByCompany_IdAndCustomForm_IdAndsubmittedDate(Long id, Long id1, Instant date);

    @Query("select c from Compliance c where c.company.id = ?1")
    Compliance findByCompany_Id(Long id);

    @Query("select c.customForm.id from Compliance c where c.company.id = ?1")
    List<Long> findLicenceIdByCompany_Id(Long id);

    @Query("select count(c) from Compliance c")
    long countFirstBy();

    @Transactional
    @Modifying
    @Query("update Compliance c set c.status = ?1 where c.id = ?2")
    int updateStatusById(String status, Long id);

    @Override
    void deleteById(Long aLong);
}
