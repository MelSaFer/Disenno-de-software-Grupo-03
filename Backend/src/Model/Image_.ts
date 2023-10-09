import { ImageType } from "./ImageType";


export class Image_ {
    private id : Number = 0;
    private height : Number = 0;
    private width : Number = 0;
    private imageType: ImageType = 0;

    public constructor(id : Number, height : Number, width : Number, imageType: ImageType){
        this.id = id;
        this.height = height;
        this.width = width;
        this.imageType = imageType;
    }

}