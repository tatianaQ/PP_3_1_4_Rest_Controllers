package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Details;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getAll(Model model) {
        List<User> users = userService.getAll();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Details user = (Details) authentication.getPrincipal();
        model.addAttribute("allUsers", users);
        model.addAttribute("user", user.getUser());
        model.addAttribute("roles", userService.getAllRoles());
        return "admin";
    }

    @PostMapping("/edit") // Убрано "admin" из пути
    public String update(@RequestParam("id") long id, @ModelAttribute("user") @Valid User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("roles", userService.getAllRoles());
            model.addAttribute("allUsers", userService.getAll());
            return "redirect:/admin";
        }

        userService.update(id, user);
        return "redirect:/admin";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Details user = (Details) authentication.getPrincipal();
        model.addAttribute("user", user.getUser());
        model.addAttribute("new_user", new User());
        model.addAttribute("roles", userService.getAllRoles());
        return "addUser";
    }

    @PostMapping("/addUser")
    public String createUser(@ModelAttribute("new_user") @Valid User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("roles", userService.getAllRoles());
            model.addAttribute("allUsers", userService.getAll());
            return "addUser";
        }
        userService.createForAdmin(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete")
    public String delete(@RequestParam("id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}