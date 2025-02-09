import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column("float")
  price!: number;

  @Column("int")
  quantity!: number;

  @Column()
  salesStartDate!: Date;

  @Column()
  salesEndDate!: Date;

  @ManyToOne("Event", "tickets")
  @JoinColumn()
  event!: any;

  @OneToMany(() => Registration, (registration) => registration.ticket)
  registrations!: Registration[];

  @OneToMany("Workshop", "ticket")
  workshops!: any[];
}