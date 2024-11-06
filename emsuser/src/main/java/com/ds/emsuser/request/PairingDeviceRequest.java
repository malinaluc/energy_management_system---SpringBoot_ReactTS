package com.ds.emsuser.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PairingDeviceRequest {
    private Integer deviceId;
    private String username;
}
