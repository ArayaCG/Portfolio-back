import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "aboutMe",
})
export class AboutMe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
    })
    rol: string;

    @Column()
    description: string;

    @Column({
        length: 100,
    })
    image: string;

    @CreateDateColumn()
    created_at: Date;
}
