import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm"

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

}