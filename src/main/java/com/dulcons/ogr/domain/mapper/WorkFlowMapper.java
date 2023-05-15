package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.WorkFlow;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface WorkFlowMapper {
    WorkFlow toEntity(WorkFlowDto workFlowDto);

    WorkFlowDto toDto(WorkFlow workFlow);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    WorkFlow partialUpdate(WorkFlowDto workFlowDto, @MappingTarget WorkFlow workFlow);
}
