package com.ds.semdevices.service;

import com.ds.semdevices.entity.Device;
import com.ds.semdevices.entity.User;
import com.ds.semdevices.repository.DeviceRepository;
import com.ds.semdevices.repository.UserRepository;
import com.ds.semdevices.request.DeleteUserRequest;
import com.ds.semdevices.request.UpdateUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {
    private UserRepository userRepository;
    private DeviceRepository deviceRepository;

    @Override
    public void deleteUser(DeleteUserRequest deleteUserRequest) {
        User user = userRepository.findByUsername(deleteUserRequest.getUsername());

        if (user != null) {
            List<Device> devices = deviceRepository.findDeviceByUserUsername(user.getUsername());
            devices.forEach(device -> device.setUser(null));
            deviceRepository.saveAll(devices);
            userRepository.delete(user);
        }
    }

    @Override
    public User updateUser(UpdateUserRequest updateUserRequest) {
        User user = userRepository.findByUsername(updateUserRequest.getOldUsername());

        if (user != null) {
            user.setUsername(updateUserRequest.getNewUsername());
            return userRepository.save(user);
        }

        return null;
    }
}
