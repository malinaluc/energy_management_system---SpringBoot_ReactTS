package com.ds.emsuser.controller;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.dto.UserLoginResponseDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.request.PairingDeviceRequest;
import com.ds.emsuser.response.DeviceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
public interface UserControllerResource {
    @GetMapping("/users")
    ResponseEntity<List<User>> findAllUsers();

    @PostMapping("/users")
    ResponseEntity<String> createUser(@RequestBody User user);

    @PutMapping("/users/{userId}")
    ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody UpdateUserDto updateUserDto);

    @DeleteMapping("/users/{userId}")
    ResponseEntity<String> deleteUserById(@PathVariable Long userId);

    @GetMapping("/users/{username}/{password}")
    ResponseEntity<UserLoginResponseDto> findUserByUsernameAndPassword(@PathVariable String username, @PathVariable String password);

    @GetMapping("/users/{userId}")
    ResponseEntity<User> findUserById(@PathVariable Long userId);

    @PostMapping("/users/pairDevice")
    ResponseEntity<DeviceResponse> pairDevice(@RequestBody PairingDeviceRequest pairingDeviceRequest);

    @PostMapping("/users/unpairDevice")
    ResponseEntity<DeviceResponse> unpairDevice(@RequestBody PairingDeviceRequest pairingDeviceRequest);
}