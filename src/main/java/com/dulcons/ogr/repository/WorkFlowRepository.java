package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.CustomForm;
import com.dulcons.ogr.domain.State;
import com.dulcons.ogr.domain.WorkFlow;
import java.util.Collection;
import java.util.Iterator;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.Nullable;

public interface WorkFlowRepository extends CrudRepository<WorkFlow, Long> {
    @Transactional
    @Modifying
    void deleteByCustomForm(CustomForm customForm);

    @Nullable
    Optional<WorkFlow> findByCustomForm_Id(Long id);

    @Query("select s from State s")
    Iterable<State> findAllState();
}
