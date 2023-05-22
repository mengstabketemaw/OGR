package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.DecisionMaking;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;

public interface DecisionMakingRepository extends CrudRepository<DecisionMaking, Long> {
    Set<DecisionMaking> findByLicence_Id(Long id);
}
