package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.TechnicalReview;
import com.dulcons.ogr.domain.mapper.TechnicalReviewDto;
import com.dulcons.ogr.domain.mapper.TechnicalReviewMapper;
import com.dulcons.ogr.repository.TechnicalReviewRepository;
import java.util.List;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/technicalReview")
public class TechnicalReviewController {

    private final TechnicalReviewRepository technicalReviewRepository;
    private final TechnicalReviewMapper technicalReviewMapper;

    public TechnicalReviewController(TechnicalReviewRepository initialReviewRepository, TechnicalReviewMapper initialReviewMapper) {
        this.technicalReviewRepository = initialReviewRepository;
        this.technicalReviewMapper = initialReviewMapper;
    }

    @GetMapping("licence/{id}")
    public Set<TechnicalReview> getInitialReviewByLicence(@PathVariable Long id) {
        return technicalReviewRepository.findByLicence_Id(id);
    }

    @PostMapping
    public void saveIni(@RequestBody List<TechnicalReviewDto> technicalReviewDtoList) {
        technicalReviewDtoList.stream().map(technicalReviewMapper::toEntity).forEach(technicalReviewRepository::save);
    }
}
