package sample.resident;

import sample.bodyparts.Head;
import sample.bodyparts.Legs;
import sample.bodyparts.Torso;

public class Resident {

	private Head head = new Head();
	private Torso torso = new Torso();
	private Legs legs = new Legs();
	
	public Head getHead() {
		return head;
	}

	public Torso getTorso() {
		return torso;
	}

	public Legs getLegs() {
		return legs;
	}
}
