package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.DecisionMaking;
import com.dulcons.ogr.domain.SpecializedReivew;
import com.dulcons.ogr.domain.mapper.DecisionMakingDto;
import com.dulcons.ogr.domain.mapper.DecisionMakingMapper;
import com.dulcons.ogr.domain.mapper.SpecializedReivewDto;
import com.dulcons.ogr.domain.mapper.SpecializedReivewMapper;
import com.dulcons.ogr.repository.DecisionMakingRepository;
import com.dulcons.ogr.repository.SpecializedReivewRepository;
import java.util.List;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/decisionMaking")
public class DecisionMakingController {

    private final DecisionMakingRepository technicalReviewRepository;
    private final DecisionMakingMapper technicalReviewMapper;

    public DecisionMakingController(DecisionMakingRepository initialReviewRepository, DecisionMakingMapper initialReviewMapper) {
        this.technicalReviewRepository = initialReviewRepository;
        this.technicalReviewMapper = initialReviewMapper;
    }

    @GetMapping("licence/{id}")
    public Set<DecisionMaking> getInitialReviewByLicence(@PathVariable Long id) {
        return technicalReviewRepository.findByLicence_Id(id);
    }

    @PostMapping
    public void saveIni(@RequestBody List<DecisionMakingDto> technicalReviewDtoList) {
        technicalReviewDtoList.stream().map(technicalReviewMapper::toEntity).forEach(technicalReviewRepository::save);
    }
}
