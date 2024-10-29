package com.ds.emsuser.controller;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
public interface UserControllerResource {
    @PostMapping("/users")
    ResponseEntity<String> createUser(@RequestBody User user);

    @PutMapping("/users/{userId}")
    ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody UpdateUserDto updateUserDto);

    @DeleteMapping("/users/{userId}")
    ResponseEntity<String> deleteUserById(@PathVariable Long userId);

    @GetMapping("/users/{username}/{password}")
    Integer findUserByUsernameAndPassword(@PathVariable String username, @PathVariable String password);

    @GetMapping("/users")
    ResponseEntity<List<User>> findAllUsers();
}