package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.SpecializedReivew;
import com.dulcons.ogr.domain.TechnicalReview;
import com.dulcons.ogr.domain.mapper.SpecializedReivewDto;
import com.dulcons.ogr.domain.mapper.SpecializedReivewMapper;
import com.dulcons.ogr.domain.mapper.TechnicalReviewDto;
import com.dulcons.ogr.domain.mapper.TechnicalReviewMapper;
import com.dulcons.ogr.repository.SpecializedReivewRepository;
import com.dulcons.ogr.repository.TechnicalReviewRepository;
import java.util.List;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/specializedReview")
public class SpecializedReviewController {

    private final SpecializedReivewRepository technicalReviewRepository;
    private final SpecializedReivewMapper technicalReviewMapper;

    public SpecializedReviewController(SpecializedReivewRepository initialReviewRepository, SpecializedReivewMapper initialReviewMapper) {
        this.technicalReviewRepository = initialReviewRepository;
        this.technicalReviewMapper = initialReviewMapper;
    }

    @GetMapping("licence/{id}/{state_id}")
    public Set<SpecializedReivew> getInitialReviewByLicence(@PathVariable Long id, @PathVariable Long state_id) {
        return technicalReviewRepository.findByLicence_IdAndCustomField_State_Id(id, state_id);
    }

    @PostMapping
    public void saveIni(@RequestBody List<SpecializedReivewDto> technicalReviewDtoList) {
        technicalReviewDtoList.stream().map(technicalReviewMapper::toEntity).forEach(technicalReviewRepository::save);
    }
}
