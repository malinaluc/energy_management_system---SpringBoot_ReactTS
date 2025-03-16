package com.ds.emsuser.service;

import com.ds.emsuser.dto.UpdateUserDto;
import com.ds.emsuser.dto.UserLoginResponseDto;
import com.ds.emsuser.entity.User;
import com.ds.emsuser.exceptionHandlers.EntityAlreadyExistsException;
import com.ds.emsuser.exceptionHandlers.NoSuchEntityException;
import com.ds.emsuser.repository.UserRepository;
import com.ds.emsuser.request.DeleteUserFromDeviceRequest;
import com.ds.emsuser.request.UpdateUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ds.emsuser.utils.Security.encryptPassword;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {
    private UserRepository userRepository;
    private DeviceMicroserviceService deviceMicroserviceService;

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
                user.setPassword((user.getPassword()));
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
            deviceMicroserviceService.updateUser(
                    new UpdateUserRequest()
                            .setOldUsername(userData.getUsername())
                            .setNewUsername(updateUserDto.getUsername())
            );
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
            deviceMicroserviceService.deleteUser(
                    new DeleteUserFromDeviceRequest()
                            .setUsername(userData.getUsername())
            );
            userRepository.delete(userData);
        } else {
            throw new NoSuchEntityException("User");
        }
    }

    @Override
    public UserLoginResponseDto findUserByUsernameAndPassword(String username, String password) throws NoSuchEntityException {
        User user = userRepository.findUserByUsernameAndPassword(username, password);
        if (user != null) {
            return new UserLoginResponseDto(user.getId(), user.getRole(), user.getUsername());
        } else {
            throw new NoSuchEntityException("User not found");
        }
    }

    @Override
    public User findUserById(Long id) {
        User user = userRepository.findUserById(id);
        return user;
    }
}
