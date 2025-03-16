package com.ds.semdevices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@AllArgsConstructor
@NoArgsConstructor
@Data
@With
public class UpdateDeviceDto {
    private String description;
    private String address;
    private Float hourlyEnergyConsumption;
}
