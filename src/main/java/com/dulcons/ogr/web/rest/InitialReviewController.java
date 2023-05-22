package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.InitialReview;
import com.dulcons.ogr.domain.InitialReviewDto;
import com.dulcons.ogr.domain.mapper.InitialReviewMapper;
import com.dulcons.ogr.repository.InitialReviewRepository;
import java.util.List;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/initialReview")
public class InitialReviewController {

    private final InitialReviewRepository initialReviewRepository;
    private final InitialReviewMapper initialReviewMapper;

    public InitialReviewController(InitialReviewRepository initialReviewRepository, InitialReviewMapper initialReviewMapper) {
        this.initialReviewRepository = initialReviewRepository;
        this.initialReviewMapper = initialReviewMapper;
    }

    @GetMapping("licence/{id}")
    public Set<InitialReview> getInitialReviewByLicence(@PathVariable Long id) {
        return initialReviewRepository.findByLicence_Id(id);
    }

    @PostMapping
    public void saveIni(@RequestBody List<InitialReviewDto> initialReviewDtoList) {
        initialReviewDtoList.stream().map(initialReviewMapper::toEntity).forEach(initialReviewRepository::save);
    }
}
