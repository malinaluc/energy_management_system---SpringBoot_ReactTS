package com.ds.semdevices.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class DeleteUserRequest {
    private String username;
}
