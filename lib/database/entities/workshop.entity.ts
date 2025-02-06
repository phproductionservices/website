import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";
import { Registration } from "./registration.entity";
import { Ticket } from "./ticket.entity";

@Entity()
export class Workshop extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  description!: string;

  @Column({ default: false })
  isPaidFor!: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.workshop)
  ticket!: Ticket[];

  @OneToMany(() => Registration, (registration) => registration.workshop)
  registration!: Registration[];

  // @ManyToOne(() => Event, (event) => event.workshop)
  // event!: Event;
}