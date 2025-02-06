import { Entity, Column, ManyToOne, Relation, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Event } from "./event.entity";
import { Ticket } from "./ticket.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Registration extends BaseEntity {

  @ManyToOne(() => User, (user) => user.registration)
  user!: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.registrations)
  ticket!: Ticket;

  @ManyToOne(() => Workshop, (workshop) => workshop.registration)
  workshop!: Workshop;
  
  @ManyToOne(() => Event, (event) => event.registrations)
  event!: Event;
}