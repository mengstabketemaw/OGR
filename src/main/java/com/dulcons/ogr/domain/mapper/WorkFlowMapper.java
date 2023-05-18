package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.CustomField;
import com.dulcons.ogr.domain.CustomForm;
import com.dulcons.ogr.domain.CustomOption;
import com.dulcons.ogr.domain.WorkFlow;
import com.dulcons.ogr.service.dto.CustomFieldDto;
import com.dulcons.ogr.service.dto.CustomFormDto;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    componentModel = MappingConstants.ComponentModel.SPRING,
    uses = { WorkFlowMapper.class }
)
public interface WorkFlowMapper {
    WorkFlow toEntity(WorkFlowDto workFlowDto);

    WorkFlowDto toDto(WorkFlow workFlow);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    WorkFlow partialUpdate(WorkFlowDto workFlowDto, @MappingTarget WorkFlow workFlow);

    CustomOption toEntity1(CustomOption customOption);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    CustomOption partialUpdate1(CustomOption customOption1, @MappingTarget CustomOption customOption);

    @Mapping(source = "fieldTypeId", target = "fieldType.id")
    CustomField toEntity2(CustomFieldDto customFieldDto);

    @Mapping(source = "fieldType.id", target = "fieldTypeId")
    CustomFieldDto toDto1(CustomField customField);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "fieldTypeId", target = "fieldType.id")
    CustomField partialUpdate2(CustomFieldDto customFieldDto, @MappingTarget CustomField customField);

    CustomForm toEntity3(CustomFormDto customFormDto);

    CustomFormDto toDto2(CustomForm customForm);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    CustomForm partialUpdate3(CustomFormDto customFormDto, @MappingTarget CustomForm customForm);
}
