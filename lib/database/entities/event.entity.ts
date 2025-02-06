import { Entity, Column, OneToMany, ManyToOne, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { Ticket } from "./ticket.entity";
import { Workshop } from "./workshop.entity";
import { City } from "./city.entity";
import { State } from "./state.entity";
import { Country } from "./country.entity";

@Entity()
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  category!: string;

  @Column()
  overview!: string;

  @Column()
  eventType!: string;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  venue!: string;

  @Column()
  address!: string;

  @Column()
  eventImageUrl!: string;

  @Column({ default: false })
  isAllowWorkshop!: boolean;

  @Column({ default: false })
  isPaidFor!: boolean;

  @ManyToOne(() => City, (city) => city.event)
  city!: City;

  @ManyToOne(() => State, (state) => state.event)
  state!: State;

  @ManyToOne(() => Country, (country) => country.event)
  country!: Country;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  ticket!: Ticket[];

  @OneToMany(() => Registration, (registration) => registration.event)
  @JoinColumn()
  registrations!: Registration[];

  // @OneToMany(() => Workshop, (workshop) => workshop.event)
  // workshop!: Workshop[];
}