package com.ds.emsuser.repository;

import com.ds.emsuser.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findUserById(Long id);

    User findUserByUsername(String username);

    User findUserByUsernameAndPassword(String username, String password);
}
