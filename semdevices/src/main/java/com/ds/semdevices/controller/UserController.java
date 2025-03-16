package com.ds.semdevices.controller;

import com.ds.semdevices.entity.User;
import com.ds.semdevices.request.DeleteUserRequest;
import com.ds.semdevices.request.UpdateUserRequest;
import com.ds.semdevices.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
public class UserController implements UserControllerResource {
    private UserService userService;

    @Override
    public ResponseEntity<String> deleteUser(DeleteUserRequest deleteUserRequest) {
        try {
            userService.deleteUser(deleteUserRequest);
            return ResponseEntity.ok().body("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(200).body("Error while deleting user in Devices Microservice:" + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<User> updateUser(UpdateUserRequest updateUserRequest) {
        User user = userService.updateUser(updateUserRequest);

        return ResponseEntity.ok(user);
    }
}
