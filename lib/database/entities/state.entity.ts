import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class State extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany("Event", "state")
  events!: any[];
}