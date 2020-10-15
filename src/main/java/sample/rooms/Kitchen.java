package sample.rooms;

import sample.resident.Resident;

public class Kitchen {

	public Resident visit(Resident resident) {
		resident.getTorso().setState("full");
		return resident;
	}

}
