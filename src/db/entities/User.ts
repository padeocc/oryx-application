import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from "typeorm"
import type { Favorite } from "./Favorite"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 36,
    })
    uuid!: string

    @Column()
    pseudo!: string

    @Column({ nullable: true })
    firstname!: string

    @Column({ nullable: true })
    lastname!: string
    
    @Column()
    email!: string

    @OneToMany("Favorite", (favorite: Favorite) => favorite.user)
    favorites!: Favorite[]
}