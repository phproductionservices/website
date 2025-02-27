import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Eventspeaker extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  speakerUrl?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne("Event", "eventspeakers", { onDelete: "CASCADE" })
  @JoinColumn()
  event!: any;
}