import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity"; // Make sure Event is correctly imported
import { Registration } from "./registration.entity";
import { Ticket } from "./ticket.entity";
import { Speaker } from "./speaker.entity";

@Entity()
export class Workshop extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  slug!: string;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  description!: string;

  @Column({ default: false })
  isPaidFor!: boolean;

  @ManyToOne(() => Event, (event) => event.workshops, { nullable: true })
  @JoinColumn()
  event?: Event; // Ensure correct referencing

  @ManyToOne(() => Ticket, (ticket) => ticket.workshops, { nullable: true })
  @JoinColumn()
  ticket?: Ticket;

  @OneToMany(() => Registration, (registration) => registration.workshop, { nullable: true })
  registrations?: Registration[];

  @OneToMany(() => Speaker, (speaker) => speaker.workshop, { nullable: true })
  speakers?: Speaker[];
}
