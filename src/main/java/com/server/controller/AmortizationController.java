package com.server.controller;

import com.server.amortization.CalcAmortization;
import com.server.amortization.Response;
import com.server.jpa.Equipment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

/**
 * Created by dell on 09.02.2018.
 */
@RestController()
public class AmortizationController {


    @GetMapping("/amortization")
    public @ResponseBody Response getEquipments(@RequestParam("price")BigDecimal price, @RequestParam("month") int month,
                                                @RequestParam("numbersAfterComma") int numbersAfterComma){
        CalcAmortization calcAmortization = new CalcAmortization(price,month,numbersAfterComma);
        return calcAmortization.calc();
    }
}
