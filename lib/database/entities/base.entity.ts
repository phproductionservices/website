import {
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  @Generated("uuid")
  uuid!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at!: Date;
}