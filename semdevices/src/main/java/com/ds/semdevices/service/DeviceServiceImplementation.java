package com.ds.semdevices.service;

import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.exception.NoSuchEntityException;
import com.ds.semdevices.repository.DeviceRepository;
import com.ds.semdevices.response.UserDevicesResponse;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DeviceServiceImplementation implements DeviceService {
    private DeviceRepository deviceRepository;

    @Override
    public List<Device> getAllDevices() throws Exception {
        try {
            return (List<Device>) deviceRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.toString());
        }
    }

    @Override
    public void createDevice(Device device) throws Exception {
        try {
            deviceRepository.save(device);
        } catch (Exception e) {
            throw new Exception(e.toString());
        }
    }

    @Override
    public Device readDevice(Long deviceId) {
        Device device = deviceRepository.findDeviceById(deviceId);
        Hibernate.initialize(device.getUser());
        return deviceRepository.findDeviceById(deviceId);
    }

    @Override
    public List<UserDevicesResponse> getDeviceForUser(String username) {
        List<Device> devices = deviceRepository.findDeviceByUserUsername(username);
        return devices.stream()
                .map(device -> new UserDevicesResponse()
                        .setId(device.getId())
                        .setDescription(device.getDescription())
                        .setAddress(device.getAddress())
                        .setHourlyEnergyConsumption(device.getHourlyEnergyConsumption()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateDevice(Long deviceId, UpdateDeviceDto updateDeviceDto) throws Exception {
        Device deviceData = deviceRepository.findDeviceById(deviceId);
        if (deviceData != null) {
            deviceData.setAddress(updateDeviceDto.getAddress());
            deviceData.setDescription(updateDeviceDto.getDescription());
            deviceData.setHourlyEnergyConsumption(updateDeviceDto.getHourlyEnergyConsumption());

            try {
                deviceRepository.save(deviceData);
            } catch (Exception e) {
                throw new Exception("Exception when saving the updated device:\n" + e);
            }
        } else {
            throw new NoSuchEntityException("Device");
        }
    }

    @Override
    public void deleteDevice(Long deviceId) throws NoSuchEntityException {
        Device deviceData = deviceRepository.findDeviceById(deviceId);
        if (deviceData != null) {
            deviceRepository.delete(deviceData);
        } else {
            throw new NoSuchEntityException("Device");
        }
    }
}
