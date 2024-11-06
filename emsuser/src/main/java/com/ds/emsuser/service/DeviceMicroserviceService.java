package com.ds.emsuser.service;

import com.ds.emsuser.request.DeleteUserFromDeviceRequest;
import com.ds.emsuser.request.PairingDeviceRequest;
import com.ds.emsuser.request.UpdateUserRequest;
import com.ds.emsuser.response.DeviceResponse;
import com.ds.emsuser.response.DeviceUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DeviceMicroserviceService {
    private final RestTemplate restTemplate;
    private final String deviceServiceUrl;

    @Autowired
    public DeviceMicroserviceService(RestTemplate restTemplate, @Value("${device.microservice.url}") String deviceServiceUrl) {
        this.restTemplate = restTemplate;
        this.deviceServiceUrl = deviceServiceUrl;
    }

    public ResponseEntity<DeviceResponse> pairDeviceWithUser(PairingDeviceRequest pairingDeviceRequest) {
        String url = deviceServiceUrl + "/devices/pairDeviceWithUser";

        HttpEntity<PairingDeviceRequest> request = new HttpEntity<>(pairingDeviceRequest);

        ResponseEntity<DeviceResponse> response = restTemplate.postForEntity(url, request, DeviceResponse.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response;
        } else {
            throw new RuntimeException("Fail while pairing the device with the user ::: " + request.getBody());
        }
    }

    public ResponseEntity<DeviceResponse> unpairDeviceForUSer(PairingDeviceRequest pairingDeviceRequest) {
        String url = deviceServiceUrl + "/devices/unpairDeviceForUser";

        HttpEntity<PairingDeviceRequest> request = new HttpEntity<>(pairingDeviceRequest);

        ResponseEntity<DeviceResponse> response = restTemplate.postForEntity(url, request, DeviceResponse.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response;
        } else {
            throw new RuntimeException("Fail while unpairing the device with the user ::: " + request.getBody());
        }
    }

    public ResponseEntity<String> deleteUser(DeleteUserFromDeviceRequest deleteUserFromDeviceRequest) {
        String url = deviceServiceUrl + "/users/deleteUser";

        HttpEntity<DeleteUserFromDeviceRequest> request = new HttpEntity<>(deleteUserFromDeviceRequest);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                request,
                String.class
        );

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response;
        } else {
            throw new RuntimeException("Fail while deleting the user ::: " + request.getBody());
        }
    }

    public ResponseEntity<DeviceUserResponse> updateUser(UpdateUserRequest updateUserRequest) {
        String url = deviceServiceUrl + "/users/updateUser";

        HttpEntity<UpdateUserRequest> request = new HttpEntity<>(updateUserRequest);

        ResponseEntity<DeviceUserResponse> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                DeviceUserResponse.class
        );

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response;
        } else {
            throw new RuntimeException("Fail while updating the user ::: " + request.getBody());
        }
    }
}
