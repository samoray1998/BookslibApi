import { Router } from "express";
import { AuthorService } from "../services/author.service";
import { body } from "express-validator";
import { Author } from "../model/author.model";
import { DataSource } from "typeorm";

export class AuthorRoutes{
    
    public router = Router();
    private authorService:AuthorService;
    constructor(dataSource: DataSource)
    {
        this.authorService = new AuthorService(dataSource);
        this._init()
    }

    private _init(){
        this.router.post("/addAuthor",body('fname').isString(),body("lname").isString(),body("birthDate").isDate(),async(req,res)=>{
            const {fname,lname,birthDate}=req.body

            if (!fname||!lname||!birthDate) {
                return res.status(500).send({
                    "error":"something went wrong"
                })
            }

            const author=new Author()
            author.firstName=fname;
            author.lastName=lname;
            author.bithDate=birthDate;

          const savedAuthor= await this.authorService.addAuthor(author)
          return res.status(200).send({"status":"ok","data":savedAuthor})

        })
    }
}


