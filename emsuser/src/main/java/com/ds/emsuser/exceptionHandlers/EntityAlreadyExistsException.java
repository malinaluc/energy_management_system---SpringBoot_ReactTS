package com.ds.emsuser.exceptionHandlers;

public class EntityAlreadyExistsException extends Exception {
    public EntityAlreadyExistsException(String entityName) {
        super("This entity already exists: " + entityName);
    }
}
