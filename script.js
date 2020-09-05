/*
  Business Logic
*/

class AddressBook {
  constructor() {
    this.contacts = [],
      this.currentId = 0;
  }
  addContact(contact) {
    contact.id = ++this.currentId;
    this.contacts.push(contact);
  }
  findContact = id =>
    this.contacts.filter(c => c.id = id);
  deleteContact = id =>
    this.contacts = this.contacts.filter(c => c.id != id);
}

class Contact {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName,
      this.lastName = lastName,
      this.phoneNumber = phoneNumber;
  }
  fullName() {
    return this.firstName + " " + this.lastName;
  }
}

/*
  User Interface Logic
*/
var addressBook = new AddressBook();

const renderContactList = addressBook => {
  var html = "";
  addressBook.contacts.forEach(contact => {
    html += `<tr id=tr-${contact.id}>
      <th scope="row">${contact.id}</th>
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.phoneNumber}&nbsp;
      <button type="button" class="close" aria-label="Close" onclick=removeContact(${contact.id})>
      <span aria-hidden="true">&times;</span>
      </button></td></tr>`;
  });
  $("#contacts").html(html);
}

function removeContact(id) {
  addressBook.deleteContact(id);
  $(`#tr-${id}`).remove();
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

$(document).ready(function () {
  $("form#new-contact").submit(event => {
    var firstName = $("input#new-first-name").val();
    var lastName = $("input#new-last-name").val();
    var phoneNumber = $("input#new-phone-number").val();
    addressBook.addContact(new Contact(firstName, lastName, phoneNumber));
    renderContactList(addressBook);
    event.preventDefault();
  })
})