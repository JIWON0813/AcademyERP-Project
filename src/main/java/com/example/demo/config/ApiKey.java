package com.example.demo.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.inject.Singleton;

@Component
@Singleton
public class ApiKey {
    @Getter
    private static String secret;

    @Getter
    private static String key;

    @Value("${key}")
    public void setKey(String key) {
        this.key = key;
    }

    @Value("${secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }
}