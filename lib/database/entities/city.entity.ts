import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class City extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany("Event", "city")
  events!: any[];
}