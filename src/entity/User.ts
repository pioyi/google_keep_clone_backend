import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, BeforeInsert } from "typeorm";
import { IsEmail, Length } from "class-validator"
import { Note } from "./Note";

import generateProfileColor from "../utils/generateProfileColor"
import bcrypt from "bcrypt"

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Length(5, 20)
    username: string;
    
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Length(5, 100)
    password: string;

    @Column()
    profileColor: string;

    @OneToMany(() => Note, note => note.author)
    notes: Note[];

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 12)
        this.profileColor = generateProfileColor(this.username)
    }
}