package com.dulcons.ogr.web.rest;

import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pdf")
public class PdfController {

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public void getPdf(@PathVariable Long id, HttpServletResponse response) throws IOException {
        Resource pdfFile = null;
        String filename = "";

        if (id == 1) {
            pdfFile = new ClassPathResource("static/portalDocument/Regulations and Instructions.pdf");
            filename = "Regulations and Instructions.pdf";
        } else if (id == 2) {
            pdfFile = new ClassPathResource("static/portalDocument/Contracts and Projects.pdf");
            filename = "Contracts and Projects.pdf";
        } else if (id == 3) {
            pdfFile = new ClassPathResource("static/portalDocument/Angola's Ministry Models.pdf");
            filename = "Angola's Ministry Models.pdf";
        } else if (id == 4) {
            pdfFile = new ClassPathResource("static/portalDocument/2022 Statistical Data - Angola.pdf");
            filename = "2022 Statistical Data - Angola.pdf";
        } else if (id == 5) {
            pdfFile = new ClassPathResource("static/portalDocument/Angola Budget Data.pdf");
            filename = "Angola Budget Data.pdf";
        } else if (id == 6) {
            pdfFile = new ClassPathResource("static/portalDocument/MOF Contract.pdf");
            filename = "MOF Contract.pdf";
        } else if (id == 7) {
            pdfFile = new ClassPathResource("static/portalDocument/Laws & Government Agreements Angola.pdf");
            filename = "Laws & Government Agreements Angola.pdf";
        }

        if (pdfFile != null && pdfFile.exists()) {
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setHeader("Content-Disposition", "inline; filename=\"" + filename + "\"");
            response.setContentLength((int) pdfFile.contentLength());
            InputStream inputStream = pdfFile.getInputStream();
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        } else {
            // Handle case when PDF file is not found
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
