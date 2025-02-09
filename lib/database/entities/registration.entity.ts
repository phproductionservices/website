import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Registration extends BaseEntity {
  @ManyToOne("User", "registrations")
  @JoinColumn()
  user!: any;

  @ManyToOne("Event", "registrations")
  @JoinColumn()
  event!: any;

  @ManyToOne("Ticket", "registrations")
  @JoinColumn()
  ticket!: any;

  @ManyToOne("Workshop", "registrations")
  @JoinColumn()
  workshop!: any;
}