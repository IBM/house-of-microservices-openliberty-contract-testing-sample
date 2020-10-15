package sample.rooms;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import sample.resident.Resident;

public class BathroomTest {
    @Test
    public void visitShouldReturnSomething() {
        Resident fred = new Resident();
        Resident fred2 = new Bathroom().visit(fred);
        assertNotNull(fred2);
    }

}
