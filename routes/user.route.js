import express from 'express'
import { getAllUsers,addUser,userregistration,editUser,updateUser,deleteUser } from '../controllers/user.con.js';
import multer from 'multer'
const usreRoute=express.Router()

// upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const imageName =file.fieldname+ "-" + Date.now() + '-' + file.originalname
      cb(null, imageName)
    }
  })
  
  const upload = multer({ storage: storage })

usreRoute.get('/',getAllUsers);
usreRoute.get('/add',addUser)
usreRoute.post('/add',upload.single('image'),userregistration)
usreRoute.get('/edit/:userId',editUser)
usreRoute.post('/edit/:userId',upload.single('image'),updateUser)
usreRoute.get('/delete/:userId',deleteUser)

export default usreRoute;