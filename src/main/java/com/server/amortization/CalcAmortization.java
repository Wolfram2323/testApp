package com.server.amortization;


import java.math.BigDecimal;


/**
 * Created by k.nikitin on 08.02.2018.
 */
public class CalcAmortization {

    private BigDecimal price;
    private int month;
    private int numbersAfterComma;

    public CalcAmortization(BigDecimal price, int month, int numbersAfterComma) {
        this.price = price;
        this.month = month;
        this.numbersAfterComma = numbersAfterComma;
    }

    public Response calc() {
        if (month == 0) {
            return new Response();
        }
        Response result = new Response(month);
        result.setLinePersent(lineFormula(price, 2).divide(price, numbersAfterComma + 2, BigDecimal.ROUND_HALF_EVEN)
                .multiply(new BigDecimal(100)).setScale(numbersAfterComma, BigDecimal.ROUND_HALF_UP));
        result.setNonLianerPersent(nonLinerFormula(price, 2, month, false)
                .divide(price, numbersAfterComma + 2, BigDecimal.ROUND_HALF_EVEN)
                .multiply(new BigDecimal(100)).setScale(numbersAfterComma, BigDecimal.ROUND_HALF_UP));
        BigDecimal linePrice = price;
        BigDecimal nonLianerPrice = price;
        BigDecimal lineAmortization = lineFormula(price, 2);
        BigDecimal nonLianerAmortization = BigDecimal.ZERO;
        boolean after20Pers = false;
        int index20Pers = 0;
        for (int i = 1; i <= month; i++) {
            if (!after20Pers) {
                after20Pers = nonLianerPrice.divide(price, 3, BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100)).intValue() <= 20;
                nonLianerAmortization = nonLinerFormula(nonLianerPrice, 3, month,after20Pers);
            } else {
                if (index20Pers == 0) {
                    index20Pers = i;
                    nonLianerAmortization = nonLinerFormula(nonLianerPrice, 2, month - index20Pers + 1, after20Pers);
                }
            }
            result.getRows().add(new Row(i, linePrice, lineAmortization, nonLianerPrice, nonLianerAmortization));
            linePrice = linePrice.subtract(lineAmortization);
            nonLianerPrice = nonLianerPrice.subtract(nonLianerAmortization);
        }

        return result;
    }

    private BigDecimal lineFormula(BigDecimal price, int scale) {
        return lineFormula(price, scale, month);
    }

    private BigDecimal lineFormula(BigDecimal price, int scale, int month) {
        return price.divide(new BigDecimal(month), scale, BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal nonLinerFormula(BigDecimal price, int scale, int month, boolean after20pers) {
        if (after20pers) {
            return lineFormula(price, scale, month);
        } else {
            return price.multiply(new BigDecimal(2)).divide(new BigDecimal(month), scale, BigDecimal.ROUND_HALF_UP);
        }
    }
}
