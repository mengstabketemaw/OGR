package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.CustomForm;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomFormRepository extends JpaRepository<CustomForm, Long> {
    @Query("select c from CustomForm c join fetch c.fields where c.id = ?1")
    Optional<CustomForm> findById(Long id);

    @Query("select c from CustomForm c join fetch c.fields where c.id = ?1")
    CustomForm findByIdd(Long id);
}
