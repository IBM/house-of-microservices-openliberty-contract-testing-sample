package sample.rooms;

import sample.resident.Resident;

public class Bedroom {

	public Resident visit(Resident resident) {
		resident.getEyes().setState("asleep");
		return resident;
	}

}
