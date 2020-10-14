/*
* Copyright 2020- IBM Inc. All rights reserved
* SPDX-License-Identifier: Apache2.0
*/
package sample.house;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import sample.resident.Resident;

@Path("")
public class ResidentResource {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Resident getResident() {
        return new Resident();
    }

}
