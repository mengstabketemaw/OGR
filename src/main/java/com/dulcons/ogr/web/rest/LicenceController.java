package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.*;
import com.dulcons.ogr.domain.notification.NotificationType;
import com.dulcons.ogr.repository.*;
import com.dulcons.ogr.service.NotificationService;
import com.dulcons.ogr.service.UserService;
import com.dulcons.ogr.web.rest.vm.LocationFormDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Retrieve all licences", description = "Get a list of all licences and permits in the system.")
    @GetMapping
    public Iterable<Licence> getAll() {
        return licenceRepository.findAll();
    }

    @Operation(summary = "Get a specific licence by ID", description = "Get the licence or permit with the specified ID.")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "Licence found"),
            @ApiResponse(responseCode = "404", description = "Licence not found"),
        }
    )
    @GetMapping("/{id}")
    public Licence get(@PathVariable Long id) {
        return licenceRepository.findById(id).orElseThrow();
    }

    @Operation(
        summary = "Get licences by form type",
        description = "Get a paginated list of licences and permits based on the specified form type."
    )
    @GetMapping("/formByType")
    public Page<Licence> get(@RequestParam String type, Pageable pageable) {
        Page<Licence> licences = licenceRepository.findDistinctByForm_Type(type, pageable);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @Operation(
        summary = "Get licences by form title",
        description = "Get a paginated list of licences and permits based on the specified form title."
    )
    @GetMapping("/formByTitle")
    public Page<Licence> getByTitle(@RequestParam String title, Pageable pageable) {
        Page<Licence> licences = licenceRepository.findByForm_Title(title, pageable);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @Operation(
        summary = "Get licences by form ID",
        description = "Get a paginated list of licences and permits associated with a specific form."
    )
    @GetMapping("/form/{id}")
    public Page<Licence> getbyForm(@PathVariable Long id, Pageable page) {
        Page<Licence> licences = licenceRepository.findDistinctByForm_Id(id, page);
        licences.getContent().forEach(this::changeUserName);
        return licences;
    }

    @Operation(summary = "Create a new licence", description = "Create a new licence or permit.")
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

    @Operation(summary = "Update an existing licence", description = "Update an existing licence or permit.")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "202", description = "Licence updated successfully"),
            @ApiResponse(responseCode = "404", description = "Licence not found"),
        }
    )
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateLic(@RequestBody Licence licence, @PathVariable Long id) {
        licence.setId(id);
        if (licence.getStatus().equalsIgnoreCase("Amendment Requested")) {
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

    @Operation(summary = "Delete a licence", description = "Delete a licence or permit with the specified ID.")
    @DeleteMapping("/{id}")
    public void deleteLic(@PathVariable Long id) {
        Optional<Licence> licence = licenceRepository.findById(id);
        licence.ifPresent(initialReviewRepository::deleteByLicence);
        licence.ifPresent(decisionMakingRepository::deleteByLicence);
        licence.ifPresent(technicalReviewRepository::deleteByLicence);
        licence.ifPresent(specializedReivewRepository::deleteByLicence);
        licenceRepository.deleteById(id);
    }

    @Operation(
        summary = "Get licences by user",
        description = "Get a paginated list of licences and permits associated with the authenticated user."
    )
    @GetMapping("/formByUser")
    public Page<Licence> getDataByUserId(Pageable page) {
        User user = userService.getUserWithAuthorities().orElseThrow();
        return licenceRepository.findByUser_Id(user.getId(), page);
    }

    @Operation(summary = "Get licences with location data", description = "Get a list of licences and permits with location data.")
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

    @Operation(summary = "Get licences by user", description = "Get a list of licences and permits associated with the authenticated user.")
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

    @Operation(summary = "Update licence stage", description = "Update the stage and status of a licence or permit.")
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

    @Operation(summary = "Update licence with additional remark", description = "Update a licence or permit with an additional remark.")
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

    @Operation(summary = "Update licence with an amendment", description = "Update a licence or permit with an amendment.")
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

    @Operation(summary = "Make payment for a licence", description = "Mark a licence or permit as paid.")
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
