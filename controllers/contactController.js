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
         console.log("Please enter all fields");
         return res.json("Please enter all fields");
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
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        console.log('contact not found');
        res.status(404);
        return res.json('Contact not found');
    }
    res.status(200).json(contact);
});

//@des update contact
//@route PUT /api/contacts/:id
//@access Public

const updateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        console.log('contact not found');
        res.status(404);
        return res.json('Contact not found');
        
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
});

//@des Delete contact
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        console.log('contact not found');
        res.status(404);
        return res.json('Contact not found');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});


module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
