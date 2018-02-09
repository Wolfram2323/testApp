package com.server.jpa;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.server.marshaling.JsonDateDeserializer;
import com.server.marshaling.JsonDateSerializer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by dell on 07.02.2018.
 */
@Entity
public class Equipment {
    @Id
    @GeneratedValue
    private Long id;
    private String type;
    private String serialNumber;
    private BigDecimal price;
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private Date purchDate;


    public Equipment() {
    }

    public Equipment(String type, String serialNumber, BigDecimal price, Date purchDate) {
        this.type = type;
        this.serialNumber = serialNumber;
        this.price = price;
        this.purchDate = purchDate;
    }

    public Equipment(Long id, String type, String serialNumber, BigDecimal price, Date purchDate) {
        this.id = id;
        this.type = type;
        this.serialNumber = serialNumber;
        this.price = price;
        this.purchDate = purchDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Date getPurchDate() {
        return purchDate;
    }

    public void setPurchDate(Date purchDate) {
        this.purchDate = purchDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
