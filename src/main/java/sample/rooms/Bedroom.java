package sample.rooms;

import sample.resident.Resident;

/**
 * A bedroom might be changed often; new sheets, fresh pictures on the walls ...
 */
public class Bedroom {

	public Resident visit(Resident resident) {
		resident.getEyes().setState("asleep");
		return resident;
	}

}
