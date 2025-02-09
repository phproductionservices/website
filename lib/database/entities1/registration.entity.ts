import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Event } from "./event.entity";
import { Ticket } from "./ticket.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Registration extends BaseEntity {
  @ManyToOne(() => User, (user) => user.registrations)
  @JoinColumn()
  user?: User;

  @ManyToOne(() => Event, (event) => event.registrations, { nullable: true })
  @JoinColumn()
  event?: Event;

  @ManyToOne(() => Ticket, (ticket) => ticket.registrations, { nullable: true })
  @JoinColumn()
  ticket?: Ticket;

  @ManyToOne(() => Workshop, (workshop) => workshop.registrations, { nullable: true })
  @JoinColumn()
  workshop?: Workshop;
}