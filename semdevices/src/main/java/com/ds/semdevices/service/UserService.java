package com.ds.semdevices.service;

import com.ds.semdevices.entity.User;
import com.ds.semdevices.request.DeleteUserRequest;
import com.ds.semdevices.request.UpdateUserRequest;
import org.springframework.stereotype.Component;

@Component
public interface UserService {
    void deleteUser(DeleteUserRequest deleteUserRequest);

    User updateUser(UpdateUserRequest updateUserRequest);
}
