import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { Speaker } from "./speaker.entity";

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

  @ManyToOne("Event", "workshops")
  @JoinColumn()
  event!: any;

  @ManyToOne("Ticket", "workshops")
  @JoinColumn()
  ticket!: any;

  @OneToMany(() => Registration, (registration) => registration.workshop)
  registrations!: Registration[];

  @OneToMany(() => Speaker, (speaker) => speaker.workshop)
  speakers!: Speaker[];
}