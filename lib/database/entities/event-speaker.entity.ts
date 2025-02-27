import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Event } from "./event.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Eventspeaker extends BaseEntity {

  @Column()
  name!: string;

  @Column({ nullable: true })
  speakerUrl?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Event, (event) => event.eventspeakers, { onDelete: "CASCADE" })
  event!: Event;

}
