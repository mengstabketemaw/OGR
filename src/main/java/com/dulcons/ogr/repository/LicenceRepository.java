package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.Licence;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LicenceRepository extends PagingAndSortingRepository<Licence, Long> {
    Page<Licence> findDistinctByForm_Type(String type, Pageable pageable);
    Page<Licence> findDistinctByForm_Id(Long id, Pageable pageable);

    @Query("select l from Licence l where l.user.id = ?1")
    Page<Licence> findByUser_Id(Long id, Pageable pageable);

    @Query("select l from Licence l join fetch l.data where l.id = ?1")
    Optional<Licence> findById(Long aLong);
}
