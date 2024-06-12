package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:/js/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user").setViewName("user");
    }


    /**
     * Метод для настройки CORS (Cross-Origin Resource Sharing) правил.
     * Этот метод позволяет контролировать, какие домены могут делать запросы к серверу,
     * какие методы HTTP разрешены, какие заголовки могут быть использованы и т.д.
     *
     * @param registry объект для регистрации CORS правил
     */

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Применение CORS настроек к путям, начинающимся с "/api/**"
                .allowedOrigins("http://localhost:3000") // Разрешение запросов с указанного происхождения
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Разрешение указанных методов HTTP
                .allowCredentials(true); // Включение поддержки отправки учетных данных (например, cookies, HTTP аутентификация)
    }
}