package com.ds.emsuser.controller;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.exceptionHandlers.NoSuchEntityException;
import com.ds.emsuser.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserController implements UserControllerResource {
    private UserService userService;

    @Override
    public ResponseEntity<List<User>> findAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @Override
    public ResponseEntity<String> createUser(User user) {
        try {
            userService.createUser(user);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.toString());
        }
        return ResponseEntity.status(200).body("User created successfully");
    }

    @Override
    public ResponseEntity<String> updateUser(Long userId, UpdateUserDto updateUserDto) {
        try {
            userService.updateUser(userId, updateUserDto);
        } catch (NoSuchEntityException e) {
            return ResponseEntity.status(400).body("User does not exist...");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("There was an error while updating the user:\n" + e);
        }
        return ResponseEntity.status(200).body("User has been updated successfully!");
    }

    @Override
    public ResponseEntity<String> deleteUserById(Long userId) {
        try {
            userService.deleteUser(userId);
        } catch (NoSuchEntityException e) {
            return ResponseEntity.status(400).body("User does not exist...");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("There was an error while deleting the user...");
        }
        return ResponseEntity.status(200).body("User has been deleted successfully!");
    }

    @Override
    public Integer findUserByUsernameAndPassword(String username, String password) {
        try {
            return userService.findUserByUsernameAndPassword(username, password);
        } catch (Exception e) {
            return -1;
        }
    }
}
