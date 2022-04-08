import { Component, OnInit } from '@angular/core';
import {
  faPlusCircle,
  faPen,
  faEye,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from '../../models/iContact';
import { IGroup } from '../../models/IGroup';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faPen = faPen;
  faEye = faEye;
  faTrashAlt = faTrashAlt;

  public loading: Boolean = false;
  public contacts: IContact[] = [];

  constructor(private contactsService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  getAllContactsFromServer() {
    this.loading = true;
    this.contactsService.getAllContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

  deleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactsService.deleteContact(contactId).subscribe(() => {
        this.getAllContactsFromServer();
      });
    }
  }
}
