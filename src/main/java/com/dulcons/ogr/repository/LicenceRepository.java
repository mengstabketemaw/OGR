package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.Licence;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LicenceRepository extends PagingAndSortingRepository<Licence, Long> {
    Page<Licence> findDistinctByForm_Type(String type, Pageable pageable);
    List<Licence> findDistinctByForm_Id(Long id);
}
