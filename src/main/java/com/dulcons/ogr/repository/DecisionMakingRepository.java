package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.DecisionMaking;
import com.dulcons.ogr.domain.Licence;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;

public interface DecisionMakingRepository extends CrudRepository<DecisionMaking, Long> {
    void deleteByLicence(Licence licence);
    Set<DecisionMaking> findByLicence_Id(Long id);
}
