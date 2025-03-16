package com.ds.semdevices.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PairDeviceDto {
    private Integer deviceId;
    private String username;
}
