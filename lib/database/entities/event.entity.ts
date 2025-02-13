import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { UserRegistration } from "./userRegistration.entity";
import { EventStatus } from "@/lib/base";

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

  @Column()
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
      array: true,
      default: [EventStatus.ACTIVE],
    })
  isEventActive!: EventStatus;

  @Column({ default: false })
  isPaidFor!: boolean;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  country!: string;

  @ManyToOne("UserRegistration", "event")
  @JoinColumn()
  registeredusers!: any;

  @OneToMany("Ticket", "event")
  tickets!: any[];

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations!: Registration[];

  @OneToMany("Workshop", "event")
  workshops!: UserRegistration[];

}