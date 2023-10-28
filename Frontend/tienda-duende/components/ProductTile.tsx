// @ts-nocheck
'use client'

export default function ProductTile({item}){
    return ( 
        <div>
            <div className="flex overflow-hidden items-center justify-center aspect-w-1 aspect-h-1 h-52">
                <img src={item.imageId} 
                alt="Product Image"
                className="object-cover transition-all duration-300 group-hover:scale-125" 
                style={{height:'200px', marginTop:'20px'}}
                />
            </div>
                <div className="my-4 mx-auto flex w-10/12 text-center flex-col items-center justify-center">
                    <div className="mb-2 flex">
                        <p className="mr-3 text-2xl font-semibold"> {`$ ${item.price}`} </p>
                    </div>
                    <h3 className="md-2 text-ba text-2xl" style={{paddingBottom:'10px'}}>{item.name}</h3>
                </div>
        </div>
    );
}