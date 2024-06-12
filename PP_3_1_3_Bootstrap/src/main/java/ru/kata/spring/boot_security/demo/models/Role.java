package ru.kata.spring.boot_security.demo.models;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "role")
    private String role;

    public Role() {
    }

    public Role(long id) {
        this.id = id;
    }

    public Role(long id, String role) {
        this.id = id;
        this.role = role;
    }

    public Role(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRoleNameWithoutRole() {
        return role.substring(5);
    }

    @Override
    public String toString() {
        return getRole().replace("ROLE_", "");
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, role);
    }

}