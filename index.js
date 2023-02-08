const contacts = require('./contacts');
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if(!contact){
        throw new Error(`Contact whith id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
     const removeContact = await contacts.removeContact(id);
     console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}



const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);



