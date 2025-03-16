package com.ds.emsuser.response;

import com.ds.emsuser.dto.DeviceUserDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DeviceResponse {
    private Integer id;
    private String description;
    private String address;
    private Float hourlyEnergyConsumption;

    @JsonProperty("user")
    private DeviceUserDto deviceUserDto;
}
