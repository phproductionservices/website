import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoleType } from "@/lib/base";
import { Event } from "./event.entity";

@Entity()
export class UserRegistration extends BaseEntity {

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({
    type: "enum",
    enum: RoleType,
    array: true,
    default: [RoleType.REFEREE],
  })
  roles!: RoleType;

  @Column()
  fullName!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone!: string;

  @OneToMany("Event", "registeredusers")
  event!: any[];
}