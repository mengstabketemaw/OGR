package com.dulcons.ogr.domain.mapper;

import com.dulcons.ogr.domain.TechnicalReview;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TechnicalReviewMapper {
    @Mapping(source = "licenceId", target = "licence.id")
    @Mapping(source = "customFieldId", target = "customField.id")
    TechnicalReview toEntity(TechnicalReviewDto technicalReviewDto);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TechnicalReview partialUpdate(TechnicalReviewDto technicalReviewDto, @MappingTarget TechnicalReview technicalReview);

    default byte[] toBytes(String string) {
        return string != null ? string.getBytes() : null;
    }
}
