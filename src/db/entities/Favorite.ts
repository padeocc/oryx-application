import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm"
import type { User } from "./User"

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    serviceCode!: string

    @ManyToOne("User", (user: User) => user.favorites, {onDelete:'CASCADE'})
    user!: User

}