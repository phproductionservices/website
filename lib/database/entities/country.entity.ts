import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Country extends BaseEntity {
  @Column()
  name!: string;

  // @OneToMany("Event", "country")
  // events!: any[];
}