const Product=require("../models/Product");

const filterByCategory=async (req,res)=>{

 const {category}=req.params;


 if(!category){

    return res.status(400).json({message:"  Category is required"});

    
 } try {

    const products=await Product.find({category});

    if(!products.length/* or products.length==0  */){
        return res.status(404).json({message:"No products found with this Category"});

    }

    return res.status(200).json(products)
 }
 catch(err){
    console.error(err);
   return res.status(500).json({message:"Server error"});
 }
   

  


}



module.exports={
    filterByCategory,
}
