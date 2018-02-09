package com.server.amortization;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by k.nikitin on 08.02.2018.
 */
public class Response {
    private BigDecimal linePersent;
    private BigDecimal nonLianerPersent;

    private List<Row> rows;

    public Response() {
    }

    public Response(int capasity) {
        this.rows = new ArrayList<>(capasity);
    }

    public Response(BigDecimal linePersent, BigDecimal nonLianerPersent) {
        this.linePersent = linePersent;
        this.nonLianerPersent = nonLianerPersent;
        this.rows = new ArrayList<>();
    }

    public Response(BigDecimal linePersent, BigDecimal nonLianerPersent, List<Row> rows) {

        this.linePersent = linePersent;
        this.nonLianerPersent = nonLianerPersent;
        this.rows = rows;
    }



    public List<Row> getRows() {
        return rows;
    }

    public void setRows(List<Row> rows) {
        this.rows = rows;
    }

    public BigDecimal getLinePersent() {
        return linePersent;
    }

    public void setLinePersent(BigDecimal linePersent) {
        this.linePersent = linePersent;
    }

    public BigDecimal getNonLianerPersent() {
        return nonLianerPersent;
    }

    public void setNonLianerPersent(BigDecimal nonLianerPersent) {
        this.nonLianerPersent = nonLianerPersent;
    }
}
