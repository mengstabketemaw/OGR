package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.Compliance;
import com.dulcons.ogr.domain.ComplianceHistory;
import com.dulcons.ogr.repository.ComplianceHistoryRepository;
import com.dulcons.ogr.repository.ComplianceRepository;
import com.dulcons.ogr.repository.CustomFormRepository;
import com.dulcons.ogr.repository.UserRepository;
import com.dulcons.ogr.web.rest.vm.ComplianceBody;
import com.dulcons.ogr.web.rest.vm.ComplianceHistoryBody;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
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

    public ComplianceController(
        ComplianceRepository complianceRepository,
        ComplianceHistoryRepository complianceHistoryRepository,
        CustomFormRepository customFormRepository,
        UserRepository userRepository
    ) {
        this.complianceRepository = complianceRepository;
        this.complianceHistoryRepository = complianceHistoryRepository;
        this.customFormRepository = customFormRepository;
        this.userRepository = userRepository;
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
    @ResponseStatus(HttpStatus.CREATED)
    public void updateCompliance(@PathVariable Long id, @RequestBody ComplianceBody complianceBody) {
        Compliance compliance = new Compliance();
        compliance.setId(id);
        compliance.setCompany(userRepository.findById(complianceBody.getUserId()).orElseThrow());
        compliance.setCustomForm(customFormRepository.findById(complianceBody.getFormId()).orElseThrow());
        complianceRepository.save(compliance);
    }

    @GetMapping
    public Page<Compliance> findAll(Pageable page) {
        return complianceRepository.findAll(page);
    }

    @GetMapping("/{id}")
    public Compliance findOne(@PathVariable Long id) {
        return complianceRepository.findById(id).orElseThrow();
    }

    @GetMapping("/complianceHistory")
    public List<ComplianceHistory> findComplianceHistory(@RequestParam Long complianceId) {
        return complianceHistoryRepository.findDistinctByCompliance_Id(complianceId);
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
        complianceHistoryRepository.save(complianceHistory);
        // Update the status on the main Compliance
        Long complianceId = complianceHistoryBody.getComplianceId();
        complianceRepository.updateStatusById(complianceHistoryBody.getStatus(), complianceId);
    }

    @PutMapping("/complianceHistory/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createComplianceHistory(@PathVariable Long id, @RequestBody ComplianceHistoryBody complianceHistoryBody) {
        ComplianceHistory complianceHistory = new ComplianceHistory();
        complianceHistory.setId(id);
        complianceHistory.setDate(complianceHistoryBody.getDate());
        complianceHistory.setCompliance(complianceRepository.findById(complianceHistoryBody.getComplianceId()).orElseThrow());
        complianceHistory.setInspector(userRepository.findById(complianceHistoryBody.getInspectorId()).orElseThrow());
        complianceHistoryRepository.save(complianceHistory);
    }
}
