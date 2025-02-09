import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Speaker extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @ManyToOne("Workshop", "id",{ nullable: true })
  workshop?: Workshop;
}
