package com.ds.emsuser.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UpdateUserRequest {
    private String oldUsername;
    private String newUsername;
}
