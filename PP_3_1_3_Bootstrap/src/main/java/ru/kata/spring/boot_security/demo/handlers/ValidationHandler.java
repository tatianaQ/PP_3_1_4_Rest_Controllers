package ru.kata.spring.boot_security.demo.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;


@Component
public class ValidationHandler implements Validator {
    private final UserService userService;

    @Autowired
    public ValidationHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        try {
            if (user.getId() == 0 || !userService.getUser(user.getId())
                    .get().getUsername().equals(user.getUsername())) {
                userService.loadUserByUsername(user.getUsername());
            }
            else {
                return;
            }
        } catch (UsernameNotFoundException e) {
            return;
        }
        errors.rejectValue("username", "", String.format("Username %s already exists", user.getUsername()));
    }

    public void validate(String username, Long id, Errors errors) {
        try {
            if (id == 0 || !userService.getUser(id)
                    .get().getUsername().equals(username)) {
                userService.loadUserByUsername(username);
            }
            else {
                return;
            }
        } catch (UsernameNotFoundException e) {
            return;
        }
        errors.rejectValue("username", "", String.format("Username %s already exists", username));
    }
}