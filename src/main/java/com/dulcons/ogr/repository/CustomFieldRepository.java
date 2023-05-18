package com.dulcons.ogr.repository;

import com.dulcons.ogr.domain.CustomField;
import com.dulcons.ogr.domain.FieldTypes;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CustomFieldRepository extends JpaRepository<CustomField, Long> {
    //    @Transactional
    //    @Modifying
    //    @Query(value = "INSERT INTO custom_field (label,placeholder,required,field_type_id,form_id,state_id) " +
    //        "Values(:label,:placeholder,:required,:fieldType,:formId,:stateId)" +
    //        "set c.fieldType = ?1, c.label = ?2, c.required = ?3, c.placeholder = ?4, c.stateId = ?5 " +
    //        "where c.id = ?6" , nativeQuery = true)
    //    int InsertCustomField(@Param("fieldType") Long fieldType,@Param("label") String label
    //        ,@Param("required") Boolean required,@Param("placeholder") String placeholder,@Param("stateId") Long stateId,@Param("formId") Long formId);
    //    @Transactional
    //    @Modifying
    //    @Query("delete from CustomField c where c.state.id = ?1")
    //    int deleteByStateId(Long stateId, Long form_id);
    @Query(value = "select c.* from custom_field c where c.state_id =:stateId and c.form_id=:formId", nativeQuery = true)
    List<CustomField> findByStateId(@Param("stateId") Long stateId, @Param("formId") Long formId);
}
