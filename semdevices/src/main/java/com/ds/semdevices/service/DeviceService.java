package com.ds.semdevices.service;

import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.exception.NoSuchEntityException;
import com.ds.semdevices.response.UserDevicesResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DeviceService {
    void createDevice(Device device) throws Exception;

    Device readDevice(Long deviceId);

    List<UserDevicesResponse> getDeviceForUser(String username);

    void updateDevice(Long deviceId, UpdateDeviceDto device) throws Exception;

    void deleteDevice(Long deviceId) throws NoSuchEntityException;

    List<Device> getAllDevices() throws Exception;
}
