package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.InitialReview;
import com.dulcons.ogr.domain.InitialReviewDto;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface InitialReviewMapper {
    @Mapping(source = "licenceId", target = "licence.id")
    @Mapping(source = "customFieldId", target = "customField.id")
    InitialReview toEntity(InitialReviewDto initialReviewDto);

    @InheritInverseConfiguration(name = "toEntity")
    InitialReviewDto toDto(InitialReview initialReview);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    InitialReview partialUpdate(InitialReviewDto initialReviewDto, @MappingTarget InitialReview initialReview);
}
