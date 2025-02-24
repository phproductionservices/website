import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { Speaker } from "./speaker.entity";

@Entity()
export class Workshop extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column()
  description!: string;

  @Column({ default: false })
  isPaidFor!: boolean;

  @ManyToOne("Event", "workshops")
  @JoinColumn()
  event!: any;

  @OneToMany("Ticket", "workshops")
  @JoinColumn()
  ticket!: any[];

  // @OneToMany(() => Registration, (registration) => registration.workshop)
  // registrations!: Registration[];

  @OneToMany(() => Speaker, (speaker) => speaker.workshop)
  speakers!: Speaker[];
}