import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import { Book } from "./book.model";

@Entity()
export class Author{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    firstName!:string
    @Column()
    lastName!:string
    @Column()
    bithDate!:Date
    @OneToMany(() => Book, book => book.author)
    books!: Book[];
}
