import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";
import { TicketType } from "@/lib/base";

@Entity()
export class Ticket extends BaseEntity {
  @Column(
    {
      type: "enum",
      enum: TicketType,
      default: TicketType.Event,
    }
  )
  type!: TicketType;

  @Column()
  name!: string;

  @Column("float")
  price!: number;

  @Column("int")
  quantity!: number;

  @ManyToOne("Event", "tickets", { nullable: true })
  @JoinColumn()
  event!: any;

  @OneToMany(() => Registration, (registration) => registration.ticket)
  registrations!: Registration[];

  @ManyToOne("Workshop", "ticket", { nullable: true })
  @JoinColumn()
  workshops!: any;
}