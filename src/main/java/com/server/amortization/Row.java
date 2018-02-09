package com.server.amortization;

import java.math.BigDecimal;

/**
 * Created by k.nikitin on 08.02.2018.
 */
public class Row {


    private int monthNumber;
    private BigDecimal linePrice;
    private BigDecimal lineAmortization;
    private BigDecimal nonLianerPrice;
    private BigDecimal nonLianerAmortization;



    public Row(int monthNumber, BigDecimal linePrice, BigDecimal lineAmortization, BigDecimal nonLianerPrice, BigDecimal nonLianerAmortization) {

        this.monthNumber = monthNumber;
        this.linePrice = linePrice;
        this.lineAmortization = lineAmortization;
        this.nonLianerPrice = nonLianerPrice;
        this.nonLianerAmortization = nonLianerAmortization;
    }

    public int getMonthNumber() {
        return monthNumber;
    }

    public void setMonthNumber(int monthNumber) {
        this.monthNumber = monthNumber;
    }

    public BigDecimal getLinePrice() {
        return linePrice;
    }

    public void setLinePrice(BigDecimal linePrice) {
        this.linePrice = linePrice;
    }

    public BigDecimal getLineAmortization() {
        return lineAmortization;
    }

    public void setLineAmortization(BigDecimal lineAmortization) {
        this.lineAmortization = lineAmortization;
    }

    public BigDecimal getNonLianerPrice() {
        return nonLianerPrice;
    }

    public void setNonLianerPrice(BigDecimal nonLianerPrice) {
        this.nonLianerPrice = nonLianerPrice;
    }

    public BigDecimal getNonLianerAmortization() {
        return nonLianerAmortization;
    }

    public void setNonLianerAmortization(BigDecimal nonLianerAmortization) {
        this.nonLianerAmortization = nonLianerAmortization;
    }
}
