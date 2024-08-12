const asyncHandler = require('express-async-handler');
const Contact =require('../models/contactModel');
//@des Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.find();
    res.status(200).json(contact);
});

//@des create contacts
//@route POST /api/contacts
//@access Public

const createContact=asyncHandler(async(req,res)=>{
    console.log("the request body is ",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
         res.status(400);
         throw new Error("Please enter all fields");
        };
    console.log('CONTACT CREATED');
    const contact = await Contact.create({
        // console.log('contact is inside'),
        name,
        email,
        phone,
    });
    console.log('contact still');
    res.status(201).json(contact);
});
//@des Get contact
//@route GET /api/contacts/:id
//@access Public

const getContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Get  contact of ${req.params.id}`});
})

//@des update contact
//@route PUT /api/contacts/:id
//@access Public

const updateContact=asyncHandler(async(req,res)=>{
    res.status(200).json({message: `update  contact of ${req.params.id}`});
})

//@des Delete contact
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact=asyncHandler(async(req,res)=>{
    res.status(400).json({message:`Delete  contact for ${req.params.id}`});
})


module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
