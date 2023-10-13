export class ShippingAddress{
    public province: String = "None";
    public canton: String = "None";
    public district: String = "None";
    public preciseDirection: String = "None";

    public constructor(province: String, canton: String, district: String, preciseDirection: String){
        this.province = province;
        this.canton = canton;
        this.district = district;
        this.preciseDirection = preciseDirection;
    }
}