package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.*;
import com.dulcons.ogr.repository.*;
import com.dulcons.ogr.service.UserService;
import com.dulcons.ogr.web.rest.vm.ComplianceBody;
import com.dulcons.ogr.web.rest.vm.ComplianceHistoryBody;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/compliance")
public class ComplianceController {

    private final ComplianceRepository complianceRepository;
    private final ComplianceHistoryRepository complianceHistoryRepository;
    private final CustomFormRepository customFormRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final LicenceRepository licenceRepository;

    public ComplianceController(
        ComplianceRepository complianceRepository,
        ComplianceHistoryRepository complianceHistoryRepository,
        CustomFormRepository customFormRepository,
        UserRepository userRepository,
        UserService userService,
        LicenceRepository licenceRepository
    ) {
        this.complianceRepository = complianceRepository;
        this.complianceHistoryRepository = complianceHistoryRepository;
        this.customFormRepository = customFormRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.licenceRepository = licenceRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createCompliance(@RequestBody ComplianceBody complianceBody) {
        Compliance compliance = new Compliance();
        compliance.setCompany(userRepository.findById(complianceBody.getUserId()).orElseThrow());
        compliance.setCustomForm(customFormRepository.findById(complianceBody.getFormId()).orElseThrow());
        complianceRepository.save(compliance);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateCompliance(@PathVariable Long id, @RequestBody ComplianceBody complianceBody) {
        Compliance compliance = new Compliance();
        compliance.setId(id);
        compliance.setCompany(userRepository.findById(complianceBody.getUserId()).orElseThrow());
        compliance.setCustomForm(customFormRepository.findById(complianceBody.getFormId()).orElseThrow());
        complianceRepository.save(compliance);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompliance(@PathVariable Long id) {
        complianceRepository.deleteById(id);
    }

    @GetMapping
    public Page<Compliance> findAll(Pageable page) {
        List<Licence> licences = licenceRepository.findByStage_Id(2L);

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
        return complianceRepository.findAll(page);
    }

    @GetMapping("/{id}")
    public Compliance findOne(@PathVariable Long id) {
        return complianceRepository.findById(id).orElseThrow();
    }

    @GetMapping("/complianceHistory")
    public Page<ComplianceHistory> findComplianceHistory(@RequestParam Long complianceId, Pageable pageable) {
        return complianceHistoryRepository.findDistinctByCompliance_Id(complianceId, pageable);
    }

    @GetMapping("/complianceHistory/{id}")
    public ComplianceHistory findOneComplianceHistory(@PathVariable Long id) {
        return complianceHistoryRepository.findById(id).orElseThrow();
    }

    @PostMapping("/complianceHistory")
    @ResponseStatus(HttpStatus.CREATED)
    public void createComplianceHistory(@RequestBody ComplianceHistoryBody complianceHistoryBody) {
        ComplianceHistory complianceHistory = new ComplianceHistory();
        complianceHistory.setDate(complianceHistoryBody.getDate());
        complianceHistory.setCompliance(complianceRepository.findById(complianceHistoryBody.getComplianceId()).orElseThrow());
        complianceHistory.setInspector(userRepository.findById(complianceHistoryBody.getInspectorId()).orElseThrow());
        complianceHistory.setFinding(complianceHistoryBody.getFinding());
        complianceHistory.setStatus(complianceHistoryBody.getStatus());
        complianceHistory.setReport(complianceHistoryBody.getReport());
        complianceHistoryRepository.save(complianceHistory);
        // Update the status on the main Compliance
        Long complianceId = complianceHistoryBody.getComplianceId();
        complianceRepository.updateStatusById(complianceHistoryBody.getStatus(), complianceId);
    }

    @DeleteMapping("/complianceHistory/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComplianceHistory(@PathVariable Long id) {
        complianceHistoryRepository.deleteById(id);
    }

    @PutMapping("/complianceHistory/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createComplianceHistory(@PathVariable Long id, @RequestBody ComplianceHistoryBody complianceHistoryBody) {
        ComplianceHistory complianceHistory = new ComplianceHistory();
        complianceHistory.setId(id);
        complianceHistory.setDate(complianceHistoryBody.getDate());
        complianceHistory.setCompliance(complianceRepository.findById(complianceHistoryBody.getComplianceId()).orElseThrow());
        complianceHistory.setInspector(userRepository.findById(complianceHistoryBody.getInspectorId()).orElseThrow());
        complianceHistory.setFinding(complianceHistoryBody.getFinding());
        complianceHistory.setStatus(complianceHistoryBody.getStatus());
        complianceHistory.setReport(complianceHistoryBody.getReport());
        complianceHistoryRepository.save(complianceHistory);

        // Update the status on the main Compliance
        Long complianceId = complianceHistoryBody.getComplianceId();
        complianceRepository.updateStatusById(complianceHistoryBody.getStatus(), complianceId);
    }

    @GetMapping("/user/{id}/{submittedDate}")
    public Compliance findOneByUserId(@PathVariable Long id, @PathVariable Instant submittedDate) {
        User user = userService.getUserWithAuthorities().orElseThrow();
        Iterable<Licence> licence = licenceRepository.findAllByUserId(id);
        return complianceRepository.findByCompany_IdAndCustomForm_IdAndsubmittedDate(2L, id, submittedDate);
    }
}
