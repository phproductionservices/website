import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { UserRegistration } from "./userRegistration.entity";
import { EventStatus } from "@/lib/base";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  category!: string;

  @Column()
  overview!: string;

  @Column()
  eventType!: string;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column()
  startTime!: Date;

  @Column()
  endTime!: Date;

  @Column()
  venue!: string;

  @Column()
  address!: string;

  @Column()
  postcode!: string;

  @Column()
  eventImageUrl!: string;

  @Column({ default: false })
  isAllowWorkshop!: boolean;

  @Column({
    type: "enum",
    enum: EventStatus,
    default: EventStatus.ACTIVE
  })
  status!: EventStatus;

  @Column({ default: false })
  isPaidFor!: boolean;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  country!: string;

  @ManyToOne(() => UserRegistration, user => user.events)
  @JoinColumn()
  registeredusers!: UserRegistration;

  @OneToMany(() => Registration, registration => registration.event)
  registrations!: Registration[];

  @OneToMany(() => Ticket, (ticket) => ticket.event, { nullable: true })
  tickets?: Ticket[];

  @OneToMany("Workshop", "event")
  workshops!: any[];
}