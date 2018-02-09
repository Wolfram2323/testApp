package com.server.jpa;

import com.server.jpa.Equipment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EquipmentRepository extends CrudRepository<Equipment, Long> {

    List<Equipment> findBySerialNumber(String serialNumber);

    Equipment findById(Long id);
}
