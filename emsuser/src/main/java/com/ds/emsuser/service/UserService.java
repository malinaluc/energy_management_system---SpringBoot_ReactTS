package com.ds.emsuser.service;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.exceptionHandlers.NoSuchEntityException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserService {
    void createUser(User user) throws Exception;

    void updateUser(Long userId, UpdateUserDto updateUserDto) throws Exception;

    void deleteUser(Long userId) throws NoSuchEntityException;

    Integer findUserByUsernameAndPassword(String username, String password) throws Exception;

    List<User> getAllUsers() throws Exception;
}
