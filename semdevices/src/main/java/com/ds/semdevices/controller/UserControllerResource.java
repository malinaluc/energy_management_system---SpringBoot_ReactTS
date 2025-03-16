package com.ds.semdevices.controller;

import com.ds.semdevices.entity.User;
import com.ds.semdevices.request.DeleteUserRequest;
import com.ds.semdevices.request.UpdateUserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public interface UserControllerResource {

    @DeleteMapping("/users/deleteUser")
    ResponseEntity<String> deleteUser(@RequestBody DeleteUserRequest deleteUserRequest);

    @PutMapping("/users/updateUser")
    ResponseEntity<User> updateUser(@RequestBody UpdateUserRequest updateUserRequest);

}
