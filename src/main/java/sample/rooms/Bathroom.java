package sample.rooms;

import sample.resident.Resident;

public class Bathroom {

	public Resident visit(Resident resident) {
		resident.getHair().setState("combed");
		return resident;
	}

}
