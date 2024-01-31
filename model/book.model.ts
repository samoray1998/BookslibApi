// NOTE: here we're using lowercase for naming convention, 
// the idea here is that we name the files with x.model.ts 
// which makes searching for the file easier, and straight forward,
// because at the end we could have route called user and model called user, which is a bit confusing.
// with this way we're sure that we are in the right file since it ends up with x.model.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Author } from "./author.model";
// title, author, ISBN, and publication year.
@Entity()
@Unique(['isbn'])
export class Book {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    isbn!: string;

    @Column()
    title!: string;

    @ManyToOne(() => Author, author => author.books)
    author!: Author;
    
    @Column()
    publish_year!: Date;


    
    @Column({ nullable: true })
    deleted_at?: Date;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at!: Date;

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at!: Date;



}