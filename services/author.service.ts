import { Author } from "../model/author.model";
import { DataSource } from "typeorm";

export class AuthorService{

    private dataSource: DataSource;
    constructor(dataSource: DataSource)
    {
        this.dataSource = dataSource;
    }

    async addAuthor(xauthor: Partial<Author>): Promise<Author> {
        return this.dataSource.getRepository(Author).save(xauthor);
    }

    async getAuthorById(id:number):Promise<Author|null>{
        let author: Author | null 
        author = await this.dataSource.getRepository(Author).findOne({where:{id:id}});
        if(!author){
            return null
        }
        return author

    }
}