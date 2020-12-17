package com.example.demo.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
        registry.addMapping("/api2/**").allowedOrigins("http://localhost:3000","http://localhost:8080")
        .allowedMethods("*");
      /*  registry.addMapping("/api2/edit/**").allowedOrigins("http://localhost:3000","http://localhost:8080")
                .allowedMethods("*");*/

    }

    /*@Bean
    public HiddenHttpMethodFilter httpMethodFilter() {
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        return hiddenHttpMethodFilter;

    }*/
}
