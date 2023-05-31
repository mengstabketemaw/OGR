package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.domain.User;
import com.dulcons.ogr.repository.ComplianceHistoryRepository;
import com.dulcons.ogr.repository.ComplianceRepository;
import com.dulcons.ogr.repository.LicenceRepository;
import com.dulcons.ogr.repository.UserRepository;
import com.dulcons.ogr.service.UserService;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user/stats")
public class UserStatsController {

    private final LicenceRepository licenceRepository;
    private final UserRepository userRepository;
    private final ComplianceRepository complianceRepository;
    private final ComplianceHistoryRepository complianceHistoryRepository;
    private final UserService userService;

    public UserStatsController(
        LicenceRepository licenceRepository,
        UserRepository userRepository,
        ComplianceRepository complianceRepository,
        ComplianceHistoryRepository complianceHistoryRepository,
        UserService userService
    ) {
        this.licenceRepository = licenceRepository;
        this.userRepository = userRepository;
        this.complianceRepository = complianceRepository;
        this.complianceHistoryRepository = complianceHistoryRepository;
        this.userService = userService;
    }

    //Admin Statistics
    @GetMapping
    public HashMap<String, Long> getAdminStat() {
        User user = userService.getUserWithAuthorities().orElseThrow();
        long approvedCount = licenceRepository.countByStatus("Authorized", user.getId());
        long pendingCount = licenceRepository.countByStatus("Inprogress", user.getId());
        long rejectedCount = licenceRepository.countByStatus("Denied", user.getId());
        long upcomingInspectionsCount = complianceHistoryRepository.countByStatusAndCompliance_Company_Id("Not Inspected", user.getId());

        long approvedCountLicence = licenceRepository.countByStatusAndForm_IdLessThanEqual("Authorized", 2L, user.getId());
        long approvedCountPermit = licenceRepository.countByStatusAndForm_IdGreaterThanEqual("Authorized", 3L, user.getId());
        long pendingCountLicence = licenceRepository.countByStatusAndForm_IdLessThanEqual("Inprogress", 2L, user.getId());
        long pendingCountPermit = licenceRepository.countByStatusAndForm_IdGreaterThanEqual("Inprogress", 3L, user.getId());
        long rejectedCountLicence = licenceRepository.countByStatusAndForm_IdLessThanEqual("Denied", 2L, user.getId());
        long rejectedCountPermit = licenceRepository.countByStatusAndForm_IdGreaterThanEqual("Denied", 3L, user.getId());

        long upcomingInspectionsCountLicence = complianceHistoryRepository.countByStatusAndCompliance_CustomForm_IdLessThanEqualAndCompliance_Company_Id(
            "Not Inspected",
            2L,
            user.getId()
        );
        long upcomingInspectionsCountPermit = complianceHistoryRepository.countByStatusAndCompliance_CustomForm_IdGreaterThanEqualAndCompliance_Company_Id(
            "Not Inspected",
            3L,
            user.getId()
        );

        HashMap<String, Long> returnValue = new HashMap<>();

        returnValue.put("approvedCount", approvedCount);
        returnValue.put("pendingCount", pendingCount);
        returnValue.put("rejectedCount", rejectedCount);
        returnValue.put("upcomingInspectionsCount", upcomingInspectionsCount);

        returnValue.put("approvedCountLicence", approvedCountLicence);
        returnValue.put("approvedCountPermit", approvedCountPermit);

        returnValue.put("pendingCountLicence", pendingCountLicence);
        returnValue.put("pendingCountPermit", pendingCountPermit);

        returnValue.put("upcomingInspectionsCountLicence", upcomingInspectionsCountLicence);
        returnValue.put("upcomingInspectionsCountPermit", upcomingInspectionsCountPermit);

        returnValue.put("rejectedCountLicence", rejectedCountLicence);
        returnValue.put("rejectedCountPermit", rejectedCountPermit);

        return returnValue;
    }
}
