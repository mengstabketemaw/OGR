package com.dulcons.ogr.web.rest;

import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@RestController
public class LocaleController {

    @PostMapping("/api/locale")
    public String setLocale(@RequestParam String language, HttpServletRequest request) {
        Locale currentLocale = new Locale(language);
        LocaleContextHolder.setLocale(currentLocale);
        return "Locale set successfully";
    }
}
