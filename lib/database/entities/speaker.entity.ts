import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Workshop } from "./workshop.entity";

@Entity()
export class Speaker extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({nullable : true})
  imageUrl?: string;

  @ManyToOne(() => Workshop, (workshop) => workshop.speakers)
  @JoinColumn()
  workshop!: Workshop;
}