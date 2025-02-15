import { Entity, Column, OneToMany, BeforeInsert } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoleType } from "@/lib/base";
import { Event } from "./event.entity";
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserRegistration extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({
    type: "enum",
    enum: RoleType,
    default: RoleType.ADMIN
  })
  role!: RoleType;

  @Column()
  fullName!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone!: string;

  @OneToMany(() => Event, event => event.registeredusers)
  events!: Event[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(enteredPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  }
}