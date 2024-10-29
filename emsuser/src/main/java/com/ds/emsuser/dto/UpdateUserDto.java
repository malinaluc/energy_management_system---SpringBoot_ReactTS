package com.ds.emsuser.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@AllArgsConstructor
@NoArgsConstructor
@Data
@With
public class UpdateUserDto {
    private String name;
    private String address;
    private Integer role;
    private String username;
    private String password;
}
