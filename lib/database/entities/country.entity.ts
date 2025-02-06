import { Entity, Column, OneToMany, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";

@Entity()
export class Country extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Event, (event) => event.country)
  event!: Event[];
}