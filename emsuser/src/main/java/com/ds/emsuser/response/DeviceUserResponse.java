package com.ds.emsuser.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DeviceUserResponse {
    private Integer id;
    private String username;
}
