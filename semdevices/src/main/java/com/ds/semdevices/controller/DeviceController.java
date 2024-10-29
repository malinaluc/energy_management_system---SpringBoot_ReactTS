package com.ds.semdevices.controller;

import com.ds.semdevices.dto.GetUserDevicesDto;
import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.exception.NoSuchEntityException;
import com.ds.semdevices.response.UserDevicesResponse;
import com.ds.semdevices.service.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class DeviceController implements DeviceControllerResource {
    private DeviceService deviceService;

    @Override
    public ResponseEntity<List<Device>> getDevices() {
        try {
            List<Device> devices = deviceService.getAllDevices();
            return ResponseEntity.ok(devices);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @Override
    public ResponseEntity<String> createDevice(Device device) {
        try {
            deviceService.createDevice(device);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.toString());
        }
        return ResponseEntity.status(200).body("Device created successfully");
    }

    @Override
    public ResponseEntity<?> getDevice(Long deviceId) {
        try {
            var device = deviceService.readDevice(deviceId);
            return ResponseEntity.status(200).body(device);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("There was an error while reading the data about this device." + e);
        }
    }

    @Override
    public ResponseEntity<String> updateDevice(Long deviceId, UpdateDeviceDto updateDeviceDto) {
        try {
            deviceService.updateDevice(deviceId, updateDeviceDto);
        } catch (NoSuchEntityException e) {
            return ResponseEntity.status(400).body(e.toString());
        } catch (Exception e) {
            return ResponseEntity.status(200).body(e.toString());
        }
        return ResponseEntity.status(200).body("Device has been updated successfully!");
    }

    @Override
    public ResponseEntity<String> deleteDevice(Long deviceId) {
        try {
            deviceService.deleteDevice(deviceId);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.toString());
        }
        return ResponseEntity.status(200).body("Device has been deleted successfully!");
    }

    @Override
    public ResponseEntity<List<UserDevicesResponse>> userDevices(GetUserDevicesDto getUserDevicesDto) {
        List<UserDevicesResponse> devices = deviceService.getDeviceForUser(getUserDevicesDto.getUsername());

        return ResponseEntity.ok(devices);
    }

    @Override
    public ResponseEntity<List<UserDevicesResponse>> userDevicesByUserUsername(String username) {
        List<UserDevicesResponse> devices = deviceService.getDeviceForUser(username);
        return ResponseEntity.ok(devices);
    }
}