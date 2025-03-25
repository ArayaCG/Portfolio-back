import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "experience",
})
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
    })
    image: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    url: string;

    @Column()
    year: number;
}
