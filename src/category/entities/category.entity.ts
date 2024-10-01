import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Comment, (comment) => comment.categories)
  comments: Comment[];
}
