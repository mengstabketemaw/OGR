package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.InitialReview;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface InitialReviewMapper {
    @Mapping(source = "licenceId", target = "licence.id")
    @Mapping(source = "customFieldId", target = "customField.id")
    InitialReview toEntity(InitialReviewDto initialReviewDto);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    InitialReview partialUpdate(InitialReviewDto initialReviewDto, @MappingTarget InitialReview initialReview);

    default byte[] toBytes(String string) {
        return string != null ? string.getBytes() : null;
    }
}
