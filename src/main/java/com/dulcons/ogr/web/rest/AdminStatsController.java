package com.dulcons.ogr.web.rest;

import com.dulcons.ogr.repository.ComplianceHistoryRepository;
import com.dulcons.ogr.repository.ComplianceRepository;
import com.dulcons.ogr.repository.LicenceRepository;
import com.dulcons.ogr.repository.UserRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/stats")
public class AdminStatsController {

    private final LicenceRepository licenceRepository;
    private final UserRepository userRepository;
    private final ComplianceRepository complianceRepository;
    private final ComplianceHistoryRepository complianceHistoryRepository;

    public AdminStatsController(
        LicenceRepository licenceRepository,
        UserRepository userRepository,
        ComplianceRepository complianceRepository,
        ComplianceHistoryRepository complianceHistoryRepository
    ) {
        this.licenceRepository = licenceRepository;
        this.userRepository = userRepository;
        this.complianceRepository = complianceRepository;
        this.complianceHistoryRepository = complianceHistoryRepository;
    }

    //Admin Statistics
    @GetMapping
    public HashMap<String, Long> getAdminStat() {
        Instant today = LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant yesterday = LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant thisMonth = LocalDate.now(ZoneId.systemDefault()).withDayOfMonth(1).atStartOfDay(ZoneId.systemDefault()).toInstant();

        long totalSubmissionsCount = licenceRepository.countFirstBy();
        long totalUserCount = userRepository.countFirstBy();
        long totalUserToday = userRepository.countByCreatedDateGreaterThanEqual(today);
        long todaySubmissions = licenceRepository.countBySubmittedDateGreaterThanEqual(today);
        long yesterdaysSubmissions = licenceRepository.countBySubmittedDateBetween(yesterday, today);
        long thisMonthSubmissions = licenceRepository.countBySubmittedDateGreaterThanEqual(thisMonth);
        long totalInspections = complianceHistoryRepository.countFirstBy();
        long inspectionThisMonth = complianceHistoryRepository.countByDateGreaterThanEqual(LocalDate.now().withDayOfMonth(1));
        HashMap<String, Long> returnValue = new HashMap<>();

        returnValue.put("totalSubmissionsCount", totalSubmissionsCount);
        returnValue.put("thisMonthSubmissions", thisMonthSubmissions);
        returnValue.put("totalUserCount", totalUserCount);
        returnValue.put("totalUserToday", totalUserToday);
        returnValue.put("todaySubmissions", todaySubmissions);
        returnValue.put("yesterdaysSubmissions", yesterdaysSubmissions);
        returnValue.put("totalInspections", totalInspections);
        returnValue.put("inspectionThisMonth", inspectionThisMonth);

        return returnValue;
    }
}
