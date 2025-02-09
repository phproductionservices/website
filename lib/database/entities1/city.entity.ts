import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";

@Entity()
export class City extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Event, (event) => event.city, { nullable: true })
  events?: Event[];
}