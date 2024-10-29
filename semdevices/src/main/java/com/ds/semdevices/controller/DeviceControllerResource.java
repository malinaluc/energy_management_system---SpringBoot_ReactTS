package com.ds.semdevices.controller;

import com.ds.semdevices.dto.GetUserDevicesDto;
import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.response.UserDevicesResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
public interface DeviceControllerResource {
    @PostMapping("/devices")
    ResponseEntity<String> createDevice(@RequestBody Device device);

    @GetMapping("/devices/{deviceId}")
    ResponseEntity<?> getDevice(@PathVariable Long deviceId);

    @PutMapping("/devices/{deviceId}")
    ResponseEntity<String> updateDevice(@PathVariable Long deviceId, @RequestBody UpdateDeviceDto updateDeviceDto);

    @DeleteMapping("/devices/{deviceId}")
    ResponseEntity<String> deleteDevice(@PathVariable Long deviceId);

    @GetMapping("/devices/forUserEmail")
    ResponseEntity<List<UserDevicesResponse>> userDevices(@RequestBody GetUserDevicesDto getUserDevicesDto);

    @GetMapping("/devices/forUserEmail/{username}")
    ResponseEntity<List<UserDevicesResponse>> userDevicesByUserUsername(@PathVariable String username);

    @GetMapping("/devices")
    ResponseEntity<List<Device>> getDevices();
}
