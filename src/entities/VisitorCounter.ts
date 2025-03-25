import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "visitorCounter",
})
export class VisitorCounter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    counter: number;
}
