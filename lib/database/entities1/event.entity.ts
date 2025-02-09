import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { Ticket } from "./ticket.entity";
import { Workshop } from "./workshop.entity"; // Ensure this is imported last to avoid issues
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
  slug!: string;

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

  @ManyToOne(() => City, (city) => city.events, { nullable: true })
  @JoinColumn()
  city?: City;

  @ManyToOne(() => State, (state) => state.events, { nullable: true })
  @JoinColumn()
  state?: State;

  @ManyToOne(() => Country, (country) => country.events, { nullable: true })
  @JoinColumn()
  country?: Country;

  @OneToMany(() => Ticket, (ticket) => ticket.event, { nullable: true })
  tickets?: Ticket[];

  @OneToMany(() => Registration, (registration) => registration.event, { nullable: true })
  registrations?: Registration[];

  @OneToMany(() => Workshop, (workshop) => workshop.event, { nullable: true })
  workshops?: Workshop[]; // Ensure correct referencing
}
