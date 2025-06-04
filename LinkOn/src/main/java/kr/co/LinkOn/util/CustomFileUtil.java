package kr.co.LinkOn.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("${file.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        if(!tempFolder.exists()) {
            boolean result = tempFolder.mkdir();
        }

        uploadPath = tempFolder.getAbsolutePath();

        log.info("-------------------------------------");
        log.info(uploadPath);
    }

    public Map<String, String> saveFiles(List<MultipartFile> files)throws RuntimeException{


        if(files == null || files.size() == 0){
            return null;
        }

        Map<String, String> uploadNames = new HashMap<>();

        for (MultipartFile multipartFile : files) {

            String fieldName = multipartFile.getName();
            String originalFilename = multipartFile.getOriginalFilename();
            String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
            String savedName = UUID.randomUUID().toString() + ext;

            Path savePath = Paths.get(uploadPath, savedName);

            try {
                Files.copy(multipartFile.getInputStream(), savePath);
                uploadNames.put(fieldName, savedName);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }

        }//end for
        return uploadNames;
    }

    public ResponseEntity<Resource> getFile(String fileName) {

        Resource resource = new FileSystemResource(uploadPath+ File.separator + fileName);

        HttpHeaders headers = new HttpHeaders();

        try{
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().headers(headers).body(resource);
    }


    public void deleteFiles(List<String> fileNames) {

        if(fileNames == null || fileNames.size() == 0){
            return;
        }

        fileNames.forEach(fileName -> {

            Path thumbnailPath = Paths.get(uploadPath, fileName);
            Path filePath = Paths.get(uploadPath, fileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }
}
