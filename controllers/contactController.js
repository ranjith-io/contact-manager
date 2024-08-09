//@des Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts=(req,res)=>{
    res.status(200).json({message:"Get all contacts"});
}

//@des create contacts
//@route POST /api/contacts
//@access Public

const createContact=(req,res)=>{
    console.log("the request body is ",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"Please enter all fields"})};
    res.status(201).json({message:`create contact of`});
}
//@des Get contact
//@route GET /api/contacts/:id
//@access Public

const getContact=(req,res)=>{
    res.status(200).json({message:`Get  contact of ${req.params.id}`});
}

//@des update contact
//@route PUT /api/contacts/:id
//@access Public

const updateContact=(req,res)=>{
    res.status(200).json({message: `update  contact of ${req.params.id}`});
}

//@des Delete contact
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact=(req,res)=>{
    res.status(200).json({message:`Delete  contact for ${req.params.id}`});
}


module.exports={getContacts,createContact,getContact,updateContact,deleteContact};
