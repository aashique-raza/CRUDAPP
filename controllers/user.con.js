import userModel from "../models/user.model.js"
import fs from 'fs'


const getAllUsers = async (req, res) => {

    try {
        const user = await userModel.find();
        res.render('index', { title: 'home page', data: user })


    } catch (error) {
        res.json({ type: 'danger', message: 'Users fetching failed ' })

    }
}

const addUser = async (req, res) => {
    res.render('add-user', { title: 'add-user' })
}

const userregistration = async (req, res) => {
    try {
        const imageName = req.file.fieldname + "-" + Date.now() + '-' + req.file.originalname
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.filename
        })
        const result = await user.save()
        req.session.message = {
            type: 'success',
            message: 'User Added Successfully'
        }
        res.status(201).redirect('/')

    } catch (error) {
        res.json({ type: 'danger', message: error.message })

    }
}


const editUser =  (req, res) => {
    const ID = req.params.userId;
    console.log(ID)
     userModel.find({_id:ID}).then((data)=>{
        console.log(data)
        console.log(data[0].image)
        const image=data[0].image
        res.render('edit-user',{title:'edit-user',user:data,file:image})
     }).catch((error)=>console.log(error,error.message))
    
}

const updateUser=async(req,res)=>{
    const ID=req.params.userId;
    let new_image=''
    if(req.file){
        new_image=req.file.filename
        console.log(new_image)
        try {
            fs.unlinkSync(`./uploads/${req.body.oldimage}`)
            console.log(req.body.oldimage)
        } catch (error) {
            console.log(error.message)
        }
    }else{
        new_image=req.body.oldimage;
    }

    try {
        const result=await userModel.findByIdAndUpdate(ID,{name:req.body.name,email:req.body.email,mobile:req.body.mobile,image:new_image},{new:true})
        console.log(result)
    if(result){
        req.session.message={
            type:'success',
            message:'user updated successfully'
        }
        res.redirect('/')
    }else{
        res.redirect('/edit-user')
    }
    } catch (error) {
        console.log(error)
    }

}

const deleteUser=async(req,res)=>{
    const ID=req.params.userId;
   try {
    const user=await userModel.findById({_id:ID})
    console.log(user)
    let imageDelete=user.image;
    fs.unlinkSync(`./uploads/${imageDelete}`)
    const result=await userModel.findByIdAndDelete({_id:ID})
    req.session.message={
        type:'success',
        message:'user deleted successfully'
    }
    res.redirect('/')
   } catch (error) {
    console.log(error.message)
   }
}




export { getAllUsers, addUser, userregistration, editUser,updateUser,deleteUser }