package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.InitialReview;
import com.dulcons.ogr.domain.Licence;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;

public interface InitialReviewRepository extends CrudRepository<InitialReview, Long> {
    void deleteByLicence(Licence licence);
    Set<InitialReview> findByLicence_Id(Long id);
}
