import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";

@Entity()
export class State extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Event, (event) => event.state, { nullable: true })
  events?: Event[];
} 