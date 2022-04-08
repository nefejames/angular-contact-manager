import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  public loading: Boolean = false;
  public contact = <IContact>{};
  public groups: IGroup[] = [];

  constructor(
    private contactsService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loading = true;
    this.contactsService
      .getAllGroups()
      .subscribe((groups) => (this.groups = groups));
  }

  public onSubmit() {
    this.contactsService.createContact(this.contact).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
