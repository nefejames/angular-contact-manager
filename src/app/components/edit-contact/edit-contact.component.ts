import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public loading: Boolean = false;
  public contact = <IContact>{};
  public groups: IGroup[] = [];
  public contactId: string | null = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      //fetch the sinlge contact
      this.contactsService
        .getSingleContact(this.contactId)
        .subscribe((contact) => {
          this.contact = contact;
          this.loading = false;

          //get all groups
          this.contactsService.getAllGroups().subscribe((groups) => {
            this.groups = groups;
          });
        });
    }
  }

  public updateContact() {
    if (this.contactId) {
      this.contactsService
        .updateContact(this.contact, this.contactId)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
