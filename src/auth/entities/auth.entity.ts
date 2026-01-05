import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "auth"})
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    otp: string;
}
