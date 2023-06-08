package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.*;
import com.dulcons.ogr.repository.*;
import com.dulcons.ogr.service.UserService;
import com.dulcons.ogr.web.rest.vm.LocationFormDto;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/licence")
public class LicenceController {

    private final LicenceRepository licenceRepository;
    private final UserService userService;
    private final ComplianceRepository complianceRepository;
    private final StateRepository stateRepository;
    private final InitialReviewRepository initialReviewRepository;
    private final TechnicalReviewRepository technicalReviewRepository;
    private final SpecializedReivewRepository specializedReivewRepository;
    private final DecisionMakingRepository decisionMakingRepository;

    public LicenceController(
        LicenceRepository licenceRepository,
        UserService userService,
        ComplianceRepository complianceRepository,
        StateRepository stateRepository,
        InitialReviewRepository initialReviewRepository,
        TechnicalReviewRepository technicalReviewRepository,
        SpecializedReivewRepository specializedReivewRepository,
        DecisionMakingRepository decisionMakingRepository
    ) {
        this.licenceRepository = licenceRepository;
        this.userService = userService;
        this.complianceRepository = complianceRepository;
        this.stateRepository = stateRepository;
        this.initialReviewRepository = initialReviewRepository;
        this.technicalReviewRepository = technicalReviewRepository;
        this.specializedReivewRepository = specializedReivewRepository;
        this.decisionMakingRepository = decisionMakingRepository;
    }

    @GetMapping
    public Iterable<Licence> getAll() {
        return licenceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Licence get(@PathVariable Long id) {
        return licenceRepository.findById(id).orElseThrow();
    }

    @GetMapping("/formByType")
    public Page<Licence> get(@RequestParam String type, Pageable pageable) {
        Page<Licence> licences = licenceRepository.findDistinctByForm_Type(type, pageable);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @GetMapping("/formByTitle")
    public Page<Licence> getByTitle(@RequestParam String title, Pageable pageable) {
        Page<Licence> licences = licenceRepository.findByForm_Title(title, pageable);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @GetMapping("/form/{id}")
    public Page<Licence> getbyForm(@PathVariable Long id, Pageable page) {
        Page<Licence> licences = licenceRepository.findDistinctByForm_Id(id, page);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createLic(@RequestBody Licence licence) {
        licenceRepository.save(licence);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateLic(@RequestBody Licence licence, @PathVariable Long id) {
        licence.setId(id);
        licenceRepository.save(licence);
    }

    @DeleteMapping("/{id}")
    public void deleteLic(@PathVariable Long id) {
        Optional<Licence> licence = licenceRepository.findById(id);
        licence.ifPresent(initialReviewRepository::deleteByLicence);
        licence.ifPresent(decisionMakingRepository::deleteByLicence);
        licence.ifPresent(technicalReviewRepository::deleteByLicence);
        licence.ifPresent(specializedReivewRepository::deleteByLicence);
        licenceRepository.deleteById(id);
    }

    @GetMapping("/formByUser") //Find all application the use applied to
    public Page<Licence> getDataByUserId(Pageable page) {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return licenceRepository.findByUser_Id(user.getId(), page);
    }

    @GetMapping("/location")
    @Transactional
    public List<LocationFormDto> getAllLicenceWithLocation() {
        return licenceRepository
            .findAllForLocation()
            .filter(licence -> licence.getStatus().equalsIgnoreCase("authorized"))
            .filter(licence -> licence.getData().stream().anyMatch(customField -> customField.getFieldType().getName().equals("location")))
            .map(licence -> {
                LocationFormDto locationFormDto = new LocationFormDto();
                locationFormDto.setId(licence.getId());
                locationFormDto.setTitle(licence.getForm().getTitle());
                locationFormDto.setType(licence.getForm().getType());
                locationFormDto.setUserId(licence.getUser().getId());
                locationFormDto.setLogin(licence.getUser().getLogin());
                locationFormDto.setFullName(licence.getUser().getFirstName() + " " + licence.getUser().getLastName());
                locationFormDto.setLocation(
                    licence
                        .getData()
                        .stream()
                        .filter(licenceFieldData -> licenceFieldData.getFieldType().getName().equals("location"))
                        .findFirst()
                        .orElse(new LicenceFieldData())
                        .getText()
                );
                return locationFormDto;
            })
            .collect(Collectors.toList());
    }

    @GetMapping("/user")
    public Iterable<Licence> getAllByUser() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        List<Long> licenceId = complianceRepository.findLicenceIdByCompany_Id(2L);
        Iterable<Licence> licences = licenceRepository.findByUser_IdAndForm_IdIn(2L, licenceId);
        return licences;
    }

    @PutMapping("/updateLicenceStage/{id}")
    public void updateLiSAS(
        @PathVariable Long id,
        @RequestParam(value = "stateId") Long stateId,
        @RequestParam(value = "status") String status,
        @RequestParam(value = "approvedDate") String date
    ) {
        State state = stateRepository.findById(stateId).orElse(stateRepository.findById(stateId).orElseThrow());
        licenceRepository.updateStatusAndStageById(status, state, id, date);
    }

    @PutMapping("/moreReqRemark/{id}")
    public void updateRemark(@PathVariable Long id, @RequestParam(value = "remark") String remark) {
        licenceRepository.updateRemarkById(remark, id);
    }

    @PutMapping("/payment")
    public void makePayment(@RequestParam Long licenceId) {
        licenceRepository
            .findById(licenceId)
            .ifPresent(licence -> {
                licence.setPayment(true);
                licenceRepository.save(licence);
            });
    }

    void changeUserName(Licence original) {
        Licence licenceWithData = licenceRepository.findById(original.getId()).orElseThrow();
        String applicantName = licenceWithData
            .getData()
            .stream()
            .filter(licenceFieldData -> licenceFieldData.getLabel().equalsIgnoreCase("Applicant Email"))
            .findFirst()
            .map(LicenceFieldData::getText)
            .orElse(original.getUser().getLogin());

        original.setApplicantUsername(applicantName);
    }
}
