import { Entity, Column, OneToMany, JoinColumn, Relation } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Registration } from "./registration.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  phone!: string;

  @OneToMany(() => Registration, (registration) => registration.user)
  registration!: Registration[];
}
