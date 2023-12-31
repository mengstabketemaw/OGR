package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.Licence;
import com.dulcons.ogr.domain.State;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

public interface LicenceRepository extends PagingAndSortingRepository<Licence, Long> {
    @Query("select l from Licence l where l.user.id = ?1 and l.status = ?2")
    Iterable<Licence> findByUser_IdAndStatus(Long id, String status);

    @Transactional
    @Modifying
    @Query("update Licence l set l.remark = ?1 where l.id = ?2")
    void updateRemarkById(String remark, Long id);

    @Transactional
    @Modifying
    @Query("update Licence l set l.amendment = ?1 where l.id = ?2")
    void updateAmendmentById(String amendment, Long id);

    @Query("select l from Licence l where l.form.title = ?1")
    Page<Licence> findByForm_Title(String title, Pageable pageable);

    @Query("select count(l) from Licence l where l.status = ?1 and l.form.id >= ?2 and l.user.id = ?3")
    long countByStatusAndForm_IdGreaterThanEqual(String status, Long id, Long userId);

    @Query("select count(l) from Licence l where l.status = ?1 and l.form.id <= ?2 and l.user.id = ?3")
    long countByStatusAndForm_IdLessThanEqual(String status, Long id, Long userId);

    @Query("select count(l) from Licence l where l.status = ?1 and l.user.id = ?2")
    long countByStatus(String status, Long id);

    @Query("select l from Licence l where l.status = ?1")
    List<Licence> findByStatus(String status);

    @Query("select l from Licence l where l.stage.id >= ?1")
    List<Licence> findByStage_Id(Long id);

    @Query("select l from Licence l where l.user.id = ?1 and l.form.id in ?2")
    Iterable<Licence> findByUser_IdAndForm_IdIn(Long id, Collection<Long> ids);

    @Query("select l from Licence l where l.user.id = ?1 and l.id = ?2")
    List<Licence> findByUser_IdAndId(Long id, Long id1);

    @Query("select count(l) from Licence l where l.submittedDate >= ?1")
    long countBySubmittedDateGreaterThanEqual(Instant submittedDate);

    @Query("select count(l) from Licence l where l.submittedDate between ?1 and ?2")
    long countBySubmittedDateBetween(Instant submittedDateStart, Instant submittedDateEnd);

    @Query("select count(l) from Licence l")
    long countFirstBy();

    @Transactional(readOnly = true)
    Page<Licence> findDistinctByForm_Type(String type, Pageable pageable);

    @Transactional(readOnly = true)
    Page<Licence> findDistinctByForm_Id(Long id, Pageable pageable);

    @EntityGraph(attributePaths = { "user", "form.fields", "data.fieldType" })
    @Query("select l from Licence l left join fetch l.data left join fetch l.form")
    Stream<Licence> findAllForLocation();

    @Query("select l from Licence l where l.user.id = ?1")
    Page<Licence> findByUser_Id(Long id, Pageable pageable);

    @Query("select l from Licence l where l.user.id = ?1")
    Iterable<Licence> findAllByUserId(Long id);

    @Query("select l from Licence l join fetch l.data where l.id = ?1")
    Optional<Licence> findById(Long aLong);

    @Transactional
    @Modifying
    @Query("update Licence l set l.status = ?1, l.stage = ?2, l.approvedDate = ?4 where l.id = ?3")
    int updateStatusAndStageById(String status, State stage, Long id, String date);

    @Query("select (count(l) > 0) from Licence l inner join l.data data where data.fieldType.name = ?1")
    boolean existsByData_FieldType_Name(String name);
}
