package com.ds.semdevices.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserDevicesResponse {
    private Long id;
    private String serialNumber;
    private String description;
    private String address;
    private Float hourlyEnergyConsumption;
}
