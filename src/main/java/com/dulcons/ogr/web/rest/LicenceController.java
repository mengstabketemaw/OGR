package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.*;
import com.dulcons.ogr.domain.notification.NotificationType;
import com.dulcons.ogr.repository.*;
import com.dulcons.ogr.service.NotificationService;
import com.dulcons.ogr.service.UserService;
import com.dulcons.ogr.web.rest.vm.LocationFormDto;
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
    private final NotificationService notificationService;
    private final UserRepository userRepository;
    private final CustomFormRepository customFormRepository;

    public LicenceController(
        LicenceRepository licenceRepository,
        UserService userService,
        ComplianceRepository complianceRepository,
        StateRepository stateRepository,
        InitialReviewRepository initialReviewRepository,
        TechnicalReviewRepository technicalReviewRepository,
        SpecializedReivewRepository specializedReivewRepository,
        DecisionMakingRepository decisionMakingRepository,
        NotificationService notificationService,
        UserRepository userRepository,
        CustomFormRepository customFormRepository
    ) {
        this.licenceRepository = licenceRepository;
        this.userService = userService;
        this.complianceRepository = complianceRepository;
        this.stateRepository = stateRepository;
        this.initialReviewRepository = initialReviewRepository;
        this.technicalReviewRepository = technicalReviewRepository;
        this.specializedReivewRepository = specializedReivewRepository;
        this.decisionMakingRepository = decisionMakingRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.customFormRepository = customFormRepository;
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
        notificationService.createAdminNotification(
            licence.getForm().getId() + "/" + licence.getId(),
            NotificationType.NEW_APPLICATION,
            "",
            licence.getForm().getTitle() + "~" + licence.getUser().getFirstName()
        );
        notificationService.createEmailToBothAdminAndUser(licence);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateLic(@RequestBody Licence licence, @PathVariable Long id) {
        licence.setId(id);
        if (licence.getStatus().equalsIgnoreCase("Request More Info")) {
            licence.setStatus("Amendment Submitted");
        }
        licenceRepository.save(licence);
        notificationService.createAdminNotification(
            licence.getForm().getId() + "/" + licence.getId(),
            NotificationType.APPLICATION_UPDATE,
            "",
            licence.getForm().getTitle() + "~" + licence.getUser().getFirstName()
        );
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
            .filter(licence -> licence.getStatus().equalsIgnoreCase("approved"))
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
        Iterable<Licence> licences = licenceRepository.findByUser_IdAndStatus(user.getId(), "Approved");
        for (Licence licence : licences) {
            Compliance compliance = new Compliance();
            if (complianceRepository.existsBySubmittedDate(licence.getSubmittedDate())) continue;
            try {
                compliance.setCompany(userRepository.findByIdd(licence.getUser().getId()));
                compliance.setCustomForm(customFormRepository.findByIdd(licence.getForm().getId()));
                compliance.setSubmittedDate(licence.getSubmittedDate());

                //setting location on compliance
                Optional<Licence> licenceWithData = licenceRepository.findById(licence.getId());
                licenceWithData.ifPresent(licenceData -> {
                    String location = licenceData
                        .getData()
                        .stream()
                        .filter(licenceFieldData -> licenceFieldData.getFieldType().getName().equals("location"))
                        .limit(1)
                        .map(LicenceFieldData::getText)
                        .findFirst()
                        .orElse(null);
                    compliance.setLocation(location);
                });

                complianceRepository.save(compliance);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
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
        licenceRepository
            .findById(id)
            .ifPresent(licence -> notificationService.notificationForLicenceUpdate(state, status, licence, "", licence.getForm().getTitle())
            );
    }

    @PutMapping("/moreReqRemark/{id}")
    public void updateRemark(@PathVariable Long id, @RequestParam(value = "remark") String remark) {
        licenceRepository.updateRemarkById(remark, id);
        try {
            licenceRepository
                .findById(id)
                .ifPresent(licence -> {
                    notificationService.createUserNotification(
                        id.toString(),
                        NotificationType.MORE_INFO,
                        licence.getUser(),
                        remark,
                        licence.getForm().getTitle() + "~" + remark
                    );
                });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/amendment/{id}")
    public void updateAmendment(@PathVariable Long id, @RequestParam(value = "amendment") String amendment) {
        licenceRepository.updateAmendmentById(amendment, id);
        try {
            licenceRepository
                .findById(id)
                .ifPresent(licence -> {
                    notificationService.createAdminNotification(
                        licence.getForm().getId() + "/" + licence.getId(),
                        NotificationType.AMENDMENT,
                        amendment,
                        licence.getForm().getTitle() + "~" + licence.getUser().getFirstName() + "~" + amendment
                    );
                });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/payment")
    public void makePayment(@RequestParam Long licenceId) {
        licenceRepository
            .findById(licenceId)
            .ifPresent(licence -> {
                licence.setPayment(true);
                licenceRepository.save(licence);
                try {
                    notificationService.createAdminNotification(
                        licence.getForm().getId() + "/" + licence.getId(),
                        NotificationType.PAYMENT_IS_MADE,
                        "",
                        licence.getForm().getTitle() + "~" + licence.getUser().getFirstName()
                    );
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
    }

    void changeUserName(Licence original) {
        Licence licenceWithData = licenceRepository.findById(original.getId()).orElseThrow();
        /*        String applicantName = licenceWithData
            .getData()
            .stream()
            .filter(licenceFieldData -> licenceFieldData.getLabel().equalsIgnoreCase("Applicant Name"))
            .findFirst()
            .map(LicenceFieldData::getText)
            .orElse(original.getUser().getLastName());*/

        original.setApplicantUsername(licenceWithData.getUser().getFirstName());
    }
}
