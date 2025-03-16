package com.ds.emsuser.service;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.dto.UserLoginResponseDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.exceptionHandlers.NoSuchEntityException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserService {
    List<User> getAllUsers() throws Exception;

    void createUser(User user) throws Exception;

    void updateUser(Long userId, UpdateUserDto updateUserDto) throws Exception;

    void deleteUser(Long userId) throws NoSuchEntityException;

    UserLoginResponseDto findUserByUsernameAndPassword(String username, String password) throws Exception;

    User findUserById(Long userId) throws NoSuchEntityException;
}
