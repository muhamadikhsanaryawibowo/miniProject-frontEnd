package com.mini.project.dto;

import lombok.Data;

@Data
public class DtoResponseAuth {
    private String accessToken;
    private String tokenType = "Bearer Token";
    private String expiredIn = "1 Hours";

    public DtoResponseAuth(String accessToken) {
        this.accessToken = accessToken;
    }
}
