package com.server.controller;

import com.server.jpa.Equipment;
import com.server.jpa.EquipmentRepository;
import com.server.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by dell on 08.02.2018.
 */
@RestController()
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @GetMapping("/equipment")
    public Iterable<Equipment> getEquipments(){
        return equipmentRepository.findAll();
    }


    @PostMapping("/equipment")
    public Equipment postEquipment(@RequestBody Equipment equipment) throws AppException{
        List<Equipment> resultList = equipmentRepository.findBySerialNumber(equipment.getSerialNumber());
        if(resultList.isEmpty()){
            return equipmentRepository.save(equipment);
        } else {
            throw new AppException(HttpStatus.FORBIDDEN.value(),
                    "Оборудование с серийным номером \"" + equipment.getSerialNumber() +"\" уже существует.");

        }

    }

    @PutMapping("/equipment/{id}" )
    public Equipment putEquipment(@PathVariable("id") long id,@RequestBody Equipment equipment) throws AppException{
        if(equipmentRepository.findById(id) != null){
            List<Equipment> resultList = equipmentRepository.findBySerialNumber(equipment.getSerialNumber());
            if(resultList.isEmpty() || resultList.size() == 1 && resultList.get(0).getId().equals(id)){
                equipment.setId(id);
                return equipmentRepository.save(equipment);
            } else {
                throw new AppException(HttpStatus.FORBIDDEN.value(),
                        "Оборудование с серийным номером \"" + equipment.getSerialNumber() +"\" уже существует.");

            }
        } else {
            throw new AppException(HttpStatus.FORBIDDEN.value(),
                    "Оборудование с id= \"" + id +"\" не найдено.");

        }
    }

    @DeleteMapping("/equipment/{id}" )
    public void deleteEquipment(@PathVariable("id") long id) throws AppException{
        if(equipmentRepository.findById(id) != null){
           equipmentRepository.delete(id);
        } else {
            throw new AppException(HttpStatus.FORBIDDEN.value(),
                    "Оборудование с id= \"" + id +"\" не найдено.");

        }
    }




}
