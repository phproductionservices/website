import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Speaker extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @ManyToOne("Workshop", "id")
  workshop!: Workshop;
}
