package com.ds.semdevices.repository;

import com.ds.semdevices.entity.Device;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer> {
    Device findDeviceById(Integer id);

    @Query("SELECT d FROM Device d JOIN d.user u WHERE u.username = :username")
    List<Device> findDeviceByUserUsername(@Param("username") String username);

    @Query("SELECT d FROM Device d LEFT JOIN d.user u WHERE u.username = :username OR d.user IS NULL")
    List<Device> getDevicesByUsernameOrUnassigned(@Param("username") String username);
}
