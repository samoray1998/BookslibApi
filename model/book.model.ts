import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm"
import { Author } from "./author.model";

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