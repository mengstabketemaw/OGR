package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.*;
import com.dulcons.ogr.repository.ComplianceRepository;
import com.dulcons.ogr.repository.LicenceRepository;
import com.dulcons.ogr.repository.StateRepository;
import com.dulcons.ogr.service.UserService;
import com.dulcons.ogr.web.rest.vm.LocationFormDto;
import java.util.List;
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

    public LicenceController(
        LicenceRepository licenceRepository,
        UserService userService,
        ComplianceRepository complianceRepository,
        StateRepository stateRepository
    ) {
        this.licenceRepository = licenceRepository;
        this.userService = userService;
        this.complianceRepository = complianceRepository;
        this.stateRepository = stateRepository;
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
        return licenceRepository.findDistinctByForm_Type(type, pageable);
    }

    @GetMapping("/form/{id}")
    public Page<Licence> getbyForm(@PathVariable Long id, Pageable page) {
        return licenceRepository.findDistinctByForm_Id(id, page);
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
            .filter(licence ->
                licence.getForm().getFields().stream().anyMatch(customField -> customField.getFieldType().getName().equals("location"))
            )
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
        @RequestParam(value = "status") String status
    ) {
        State state = stateRepository.findById(stateId).orElse(stateRepository.findById(stateId).orElseThrow());
        licenceRepository.updateStatusAndStageById(status, state, id);
    }
}
