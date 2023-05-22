package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.SpecializedReivew;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface SpecializedReivewMapper {
    @Mapping(source = "licenceId", target = "licence.id")
    @Mapping(source = "customFieldId", target = "customField.id")
    SpecializedReivew toEntity(SpecializedReivewDto specializedReivewDto);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    SpecializedReivew partialUpdate(SpecializedReivewDto specializedReivewDto, @MappingTarget SpecializedReivew specializedReivew);

    default byte[] toBytes(String string) {
        return string != null ? string.getBytes() : null;
    }
}
