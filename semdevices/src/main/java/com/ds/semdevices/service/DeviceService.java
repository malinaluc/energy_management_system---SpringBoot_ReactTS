package com.ds.semdevices.service;

import com.ds.semdevices.dto.PairDeviceDto;
import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.exception.NoSuchEntityException;
import com.ds.semdevices.response.UserDevicesResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DeviceService {
    void createDevice(Device device) throws Exception;

    Device readDevice(Integer deviceId);

    List<UserDevicesResponse> getDeviceForUser(String username);

    void updateDevice(Integer deviceId, UpdateDeviceDto device) throws Exception;

    void deleteDevice(Integer deviceId) throws NoSuchEntityException;

    List<Device> getAllDevices() throws Exception;

    List<Device> getDevicesByUsernameOrUnassigned(String username) throws Exception;

    Device pairDeviceForUser(PairDeviceDto pairDeviceDto);

    Device unpairDeviceForUser(PairDeviceDto pairDeviceDto);
}
