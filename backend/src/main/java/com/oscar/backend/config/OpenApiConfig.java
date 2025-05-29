package com.oscar.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title= "API de Gestión de Solicitudes",
                version= "v1",
                description= "CRUD reactivo de solicitudes con Spring WebFlux y Postgres"
        )
)
public class OpenApiConfig {}