package com.ds.emsuser.service;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.exceptionHandlers.EntityAlreadyExistsException;
import com.ds.emsuser.exceptionHandlers.NoSuchEntityException;
import com.ds.emsuser.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ds.emsuser.utils.Security.encryptPassword;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() throws Exception {
        try {
            return (List<User>) userRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.toString());
        }
    }

    @Override
    public void createUser(User user) throws Exception {
        try {
            if (userRepository.findUserByUsername(user.getUsername()) == null) {
                user.setPassword(encryptPassword(user.getPassword()));
                userRepository.save(user);
            } else {
                throw new EntityAlreadyExistsException(user.getClass().getSimpleName());
            }
        } catch (Exception e) {
            throw new Exception(e.toString());
        }
    }

    @Override
    public void updateUser(Long userId, UpdateUserDto updateUserDto) throws Exception {
        var userData = userRepository.findUserById(userId);
        if (userData != null) {
            userData.setName(updateUserDto.getName());
            userData.setAddress(updateUserDto.getAddress());
            userData.setUsername(updateUserDto.getUsername());
            userData.setPassword(encryptPassword(updateUserDto.getPassword()));

            try {
                userRepository.save(userData);
            } catch (Exception e) {
                throw new Exception(e.toString());
            }
        } else {
            throw new NoSuchEntityException("User");
        }
    }

    @Override
    public void deleteUser(Long userId) throws NoSuchEntityException {
        var userData = userRepository.findUserById(userId);
        if (userData != null) {
            userRepository.delete(userData);
        } else {
            throw new NoSuchEntityException("User");
        }
    }

    @Override
    public Integer findUserByUsernameAndPassword(String username, String password) {
        User user = userRepository.findUserByUsernameAndPassword(username, password);
        return user.getRole();
    }
}
