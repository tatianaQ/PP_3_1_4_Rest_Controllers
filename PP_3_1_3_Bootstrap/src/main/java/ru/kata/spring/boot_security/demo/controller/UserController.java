package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping()
    public User adminInfo(@AuthenticationPrincipal User user) {
        return user;
    }
}