package com.ds.emsuser.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DeviceUserDto {
    private Integer id;
    private String username;
}
