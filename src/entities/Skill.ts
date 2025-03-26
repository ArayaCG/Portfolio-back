import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "skills",
})
export class Skill {
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
}
