import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Registration extends BaseEntity {
  // @ManyToOne("User", "registrations")
  // @JoinColumn()
  // user!: any;

  // @ManyToOne("Event", "registrations")
  // @JoinColumn()
  // event!: any;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column({
    default: 'TkT-2025'
  })
  ticketRef!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column("float")
  pricePerTicket!: number;

  @Column("float")
  amount!: number;

  @Column("int")
  quantity!: number;

  @ManyToOne("Ticket", "registrations")
  @JoinColumn()
  ticket!: any;

  // @ManyToOne("Workshop", "registrations")
  // @JoinColumn()
  // workshop!: any;
}