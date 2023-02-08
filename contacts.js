 const fs = require('fs/promises');
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.resolve("./db/contacts.json");


const listContacts = async()=> {
const contacts = await fs.readFile(contactsPath);
return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
   const contacts = await listContacts();
   const contactById = await contacts.find(item => item.id === contactId.toString());
   return contactById || null;
  
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {id:v4(), name, email, phone};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
}
const removeContact = async(contactId) => {
 const contacts = await listContacts();
 const idx = contacts.findIndex(item => item.id === contactId.toString());
 if(idx === -1){
    return null;
     }
     const [result] = contacts.splice(idx, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts));
     return result;
}





module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};