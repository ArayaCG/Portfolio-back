import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "../enum/type.enum";

@Entity({
    name: "experience",
})
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 36,
    })
    name: string;

    @Column()
    description: string;

    @Column()
    technologies: string;

    @Column()
    date: string;

    @Column()
    url_deploy: string;

    @Column()
    image_url: string;

    @Column()
    logo_url: string;

    @Column({ type: "enum", enum: Type })
    type: Type;
}
