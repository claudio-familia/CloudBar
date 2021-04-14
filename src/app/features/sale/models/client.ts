import { Person } from "../../general/models/person";
import { Place } from "../../general/models/place";

export class Client {
    id?: number;
    personId: number;
    placeId: number;
    place: Place;
    person: Person;
}