/*
* Copyright 2020- IBM Inc. All rights reserved
* SPDX-License-Identifier: Apache2.0
*/
package sample.house;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.ws.rs.CookieParam;
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
    private static ExecutorService threadpool = Executors.newCachedThreadPool();

    // This is a non-cloud-safe way of handling session affinity.
    // For simplicity, it will do!
    private static Map<String, Resident> residents = new HashMap<>();

    private Resident createResident(String sessionId) {
        final Resident abby = new Resident();
        residents.put(sessionId, abby);
        threadpool.submit(() -> wakeResident(abby));
        return abby;
    }

    private void wakeResident(Resident abby) {
        abby.setRoom("bedroom");
        pause();
        abby.setRoom("bathroom");
        abby = new Bathroom().visit(abby);
        pause();
        abby.setRoom("kitchen");
        abby = new Kitchen().visit(abby);
        pause();
        abby.setRoom("bedroom");
        abby = new Bedroom().visit(abby);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Resident getResident(@CookieParam("resident-name") String residentName) {
        Resident abby = Objects.requireNonNullElseGet(residents.get(residentName), () -> createResident(residentName));
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
