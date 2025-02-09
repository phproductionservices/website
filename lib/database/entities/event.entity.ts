import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";

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

  @ManyToOne("City", "events")
  @JoinColumn()
  city!: any;

  @ManyToOne("State", "events")
  @JoinColumn()
  state!: any;

  @ManyToOne("Country", "events")
  @JoinColumn()
  country!: any;

  @OneToMany("Ticket", "event")
  tickets!: any[];

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations!: Registration[];

  @OneToMany("Workshop", "event")
  workshops!: any[];
}