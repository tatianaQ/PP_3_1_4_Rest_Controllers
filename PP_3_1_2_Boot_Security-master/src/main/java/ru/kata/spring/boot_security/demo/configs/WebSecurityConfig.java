package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kata.spring.boot_security.demo.service.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    // Поле для кастомного обработчика успешного входа пользователя
    private final SuccessUserHandler successUserHandler;
    private final UserDetailsServiceImpl userService;

    // Конструктор, который внедряет зависимость SuccessUserHandler
    public WebSecurityConfig(SuccessUserHandler successUserHandler, UserDetailsServiceImpl userService) {
        this.successUserHandler = successUserHandler;
        this.userService = userService;
    }

    // Конфигурирует AuthenticationManagerBuilder для использования кастомного сервиса пользовательских данных и кодировщика паролей
    @Override
    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userService)
                .passwordEncoder(getPasswordEncoder());
    }

    // Определяет бин PasswordEncoder, который будет использоваться для кодирования паролей
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Конфигурирует HttpSecurity для управления авторизацией и аутентификацией запросов
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // Указывает, что для определенных запросов нужно задать правила авторизации
                .authorizeRequests()
                // Разрешает всем пользователям доступ к корневому URL и странице "/index"
                .antMatchers("/", "/index").permitAll()
                // Разрешает всем пользователям доступ к корневому URL, странице "/index" и странице "/register"
                .antMatchers("/", "/index", "/register").permitAll()
                // Требует наличия роли "ADMIN" для доступа к URL, начинающимся с "/admin/"
                .antMatchers("/admin/**").hasRole("ADMIN")
                // Разрешает доступ к URL "/user" пользователям с ролями "ADMIN" или "USER"
                .antMatchers("/user").hasAnyRole("ADMIN", "USER")
                // Требует аутентификации для всех остальных запросов
                .anyRequest().authenticated()
                .and()
                // Включает поддержку формы логина и указывает кастомный обработчик успешного входа
                .formLogin().successHandler(successUserHandler)
                .permitAll()
                .and()
                // Включает поддержку выхода из системы и разрешает его всем пользователям
                .logout()
                .permitAll();
    }
}