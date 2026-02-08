import { UserRole } from 'src/common/enums/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'varchar',
    default: UserRole.caregiver,
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;
}
