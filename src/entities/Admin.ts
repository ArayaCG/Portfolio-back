import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "admin",
})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    username: string;

    @Column({
        length: 100,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    token: string;
}
