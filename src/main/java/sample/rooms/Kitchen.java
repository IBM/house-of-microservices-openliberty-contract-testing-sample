package sample.rooms;

import sample.resident.Resident;

/**
 * A kitchen wouldn't be changed very often.
 */
public class Kitchen {

	public Resident visit(Resident resident) {
		resident.getTorso().setState("full");
		return resident;
	}

}
