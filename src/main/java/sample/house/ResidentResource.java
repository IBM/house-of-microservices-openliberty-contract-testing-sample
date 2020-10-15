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
import sample.rooms.Bathroom;
import sample.rooms.Bedroom;
import sample.rooms.Kitchen;

@Path("")
public class ResidentResource {
    // This is - obviously - a ridiculous way of getting session affinity. As a
    // workaround to allow state to be visualised, it will do!
    private static Resident abby;

    @GET
    @Path("wakeup")
    public void wakeResident() {
        abby = new Resident();
        pause();
        abby = new Bathroom().visit(abby);
        pause();
        abby = new Kitchen().visit(abby);
        pause();
        abby = new Bedroom().visit(abby);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("state")
    public Resident getResident() {
        return abby;
    }

    /*
     * Allow state to be visualised better by leaving pauses between rooms.
     */
    private void pause() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
