package com.ds.semdevices.controller;

import com.ds.semdevices.dto.GetUserDevicesDto;
import com.ds.semdevices.dto.PairDeviceDto;
import com.ds.semdevices.dto.UpdateDeviceDto;
import com.ds.semdevices.entity.Device;
import com.ds.semdevices.response.UserDevicesResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
public interface DeviceControllerResource {
    @GetMapping("/devices")
    ResponseEntity<List<Device>> getDevices();

    @PostMapping("/devices")
    ResponseEntity<String> createDevice(@RequestBody Device device);

    @GetMapping("/devices/{deviceId}")
    ResponseEntity<?> getDevice(@PathVariable Integer deviceId);

    @PutMapping("/devices/{deviceId}")
    ResponseEntity<String> updateDevice(@PathVariable Integer deviceId, @RequestBody UpdateDeviceDto updateDeviceDto);

    @DeleteMapping("/devices/{deviceId}")
    ResponseEntity<String> deleteDevice(@PathVariable Integer deviceId);

    @GetMapping("/devices/forUserEmail")
    ResponseEntity<List<UserDevicesResponse>> userDevices(@RequestBody GetUserDevicesDto getUserDevicesDto);

    @GetMapping("/devices/forUserEmail/{username}")
    ResponseEntity<List<UserDevicesResponse>> userDevicesByUserUsername(@PathVariable String username);

    @PostMapping("/devices/pairDeviceWithUser")
    ResponseEntity<Device> pairDeviceWithUser(@RequestBody PairDeviceDto pairDeviceDto);

    @PostMapping("/devices/unpairDeviceForUser")
    ResponseEntity<Device> unpairDeviceForUser(@RequestBody PairDeviceDto pairDeviceDto);

    @GetMapping("/devices/noUserDevices/{username}")
    ResponseEntity<List<Device>> getDevicesByUsernameOrUnassigned(@PathVariable String username);
}
