import BaseEntity from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class TodoEntity extends BaseEntity {
  @Column()
  key: string;

  @Column()
  description: string;

  @Column()
  categoryId: number;
}
