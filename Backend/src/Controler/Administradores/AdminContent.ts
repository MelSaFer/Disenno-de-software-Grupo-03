import { Content } from '../../Model/Content';
import { DAOContent } from '../DAO/DAOContent';
import { DTOContent } from '../DTO/DTOContent';
import { API_URL } from '../config';

export class AdminContent{
    constructor(){}

    public async addContent(contentId: number, title: string, description: string, date: Date, imageId: number, categoryId: number, tags: []){
        try {
            const daoUser = new DAOContent();
            const dtoContent = new DTOContent(contentId, title, description, date, imageId, categoryId, tags)
            const user = daoUser.create(dtoContent);
            return user;
        } catch (error) {
            console.log("Error", error);
        }
        
    };

    public async getAllContent(){
        try {
            const daoContent = new DAOContent();
            const content = daoContent.getAll();
            return content;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    public async getContent(contentId: number){
        try {
            const daoContent = new DAOContent();
            const content = daoContent.getObject(contentId);
            return content;
        } catch (error) {
            console.log("Error", error);
        }
        
    }
}