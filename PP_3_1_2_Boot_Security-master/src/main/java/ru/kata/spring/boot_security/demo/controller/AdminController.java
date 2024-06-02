package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import javax.validation.Valid;
import java.util.List;

@Controller
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/admin")
    public String getAll(Model model) {
        List<User> users = userService.getAll();
        model.addAttribute("allUsers", users);
        return "admin";
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/admin/update")
    public String updateNewForm(Model model, @RequestParam("id") long id) {
        User user = userService.findById(id);
        List<Role> allRoles = userService.getAllRoles();
        model.addAttribute("user", user);
        model.addAttribute("allRoles", allRoles);
        return "update";
    }

    @PatchMapping("/admin/update")
    public String update(@RequestParam("id") long id, @ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "update";
        }
        userService.update(id, user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/new")
    public String addUser(Model model) {
        User newUser = new User();
        List<Role> roles = roleRepository.findAll();
        model.addAttribute("new_user", newUser);
        model.addAttribute("allRoles", roles);
        return "addUser";
    }

    @PostMapping("/admin/new")
    public String createUser(@ModelAttribute("new_user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "addUser";
        }

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userService.create(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/delete")
    public String delete(@RequestParam("id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
