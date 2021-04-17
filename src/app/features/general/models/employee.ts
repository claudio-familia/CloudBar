import { Person } from "./person";
import { Place } from "./place";

export class Employee {
    id?: number;
    personId: number;
    placeId: number;
    place: Place;
    person: Person;
}