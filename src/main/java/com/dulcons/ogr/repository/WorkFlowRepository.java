package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.State;
import com.dulcons.ogr.domain.WorkFlow;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.Nullable;

public interface WorkFlowRepository extends CrudRepository<WorkFlow, Long> {
    @Query("select w from WorkFlow w inner join w.customForms customForms where customForms.id = ?1")
    @Nullable
    Optional<WorkFlow> findByCustomForms_Id(Long id);

    @Query("select s from State s")
    Iterable<State> findAllState();
}
