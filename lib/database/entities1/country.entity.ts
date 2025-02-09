import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";

@Entity()
export class Country extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Event, (event) => event.country, { nullable: true })
  events?: Event[];
}