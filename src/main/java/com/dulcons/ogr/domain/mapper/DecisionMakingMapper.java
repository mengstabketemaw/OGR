package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.DecisionMaking;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface DecisionMakingMapper {
    @Mapping(source = "licenceId", target = "licence.id")
    @Mapping(source = "customFieldId", target = "customField.id")
    DecisionMaking toEntity(DecisionMakingDto decisionMakingDto);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    DecisionMaking partialUpdate(DecisionMakingDto decisionMakingDto, @MappingTarget DecisionMaking decisionMaking);

    default byte[] toBytes(String string) {
        return string != null ? string.getBytes() : null;
    }
}
