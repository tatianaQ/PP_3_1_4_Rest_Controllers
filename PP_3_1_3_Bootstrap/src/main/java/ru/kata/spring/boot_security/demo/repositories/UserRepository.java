package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.kata.spring.boot_security.demo.models.User;



public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u left JOIN FETCH u.roles WHERE u.email = :email")
    User findByEmail(String email);
    public User findUserById(Long id);
}