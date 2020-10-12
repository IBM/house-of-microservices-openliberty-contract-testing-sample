/*
* Copyright 2020- IBM Inc. All rights reserved
* SPDX-License-Identifier: Apache2.0
*/
package sample.house;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import javax.json.Json;
import javax.json.JsonArray;

public class Reader {
    
    public static JsonArray getResident() {
        final String PATH = "./../../../../../../src/resources/resident.json";
        try {
            InputStream fis;
            fis = new FileInputStream(PATH);
            return Json.createReader(fis).readArray();
        } catch (FileNotFoundException e) {
            System.err.println("File does not exist: " + PATH);
            return null;
        }
    }

}
