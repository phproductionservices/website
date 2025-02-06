import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";
import { Registration } from "./registration.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column("float")
  price!: number;

  @Column("int")
  quantity!: number;

  @Column()
  salesStartDate!: Date;

  @Column()
  salesEndDate!: Date;

  @ManyToOne(() => Event, (event) => event.ticket)
  event!: Event;

  @OneToMany(() => Registration, (registration) => registration.ticket)
  registrations!: Registration[];

  @OneToMany(() => Workshop, (workshop) => workshop.ticket)
  workshop!: Workshop[];
}