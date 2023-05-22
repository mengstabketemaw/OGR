package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.InitialReview;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;

public interface InitialReviewRepository extends CrudRepository<InitialReview, Long> {
    Set<InitialReview> findByLicence_Id(Long id);
}
