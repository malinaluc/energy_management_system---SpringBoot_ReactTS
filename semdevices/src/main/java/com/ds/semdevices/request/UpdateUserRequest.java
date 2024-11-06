package com.ds.semdevices.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UpdateUserRequest {
    private String oldUsername;
    private String newUsername;
}
