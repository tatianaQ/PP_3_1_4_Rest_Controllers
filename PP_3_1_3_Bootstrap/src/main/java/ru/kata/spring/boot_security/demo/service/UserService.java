package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.models.User;
import java.util.List;


public interface UserService {
    List<User> getAllUsers();

    void addUser(User user);

    void updateUser(Long id, User user);

    void deleteUser(Long id);

    User getUserByEmail(String email);

    User getUser(long id);
}

