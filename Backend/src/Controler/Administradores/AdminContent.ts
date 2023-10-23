import { Content } from '../../Model/Content';
import { DAOContent } from '../DAO/DAOContent';
import { DTOContent } from '../DTO/DTOContent';
import { API_URL } from '../config';

export class AdminContent{
    constructor(){}

    public async addContent(object: any){
        try {
            const daoUser = new DAOContent();
            const user = daoUser.create(object);
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

    public async updateContent(object: any){
        try {
            const daoContent = new DAOContent();
            const content = daoContent.update(object);
            return content;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    public async deleteContent(contentId: number){
        try {
            const daoContent = new DAOContent();
            const content = daoContent.delete(contentId);
            return content;
        } catch (error) {
            console.log("Error", error);
        }
        
    }
}