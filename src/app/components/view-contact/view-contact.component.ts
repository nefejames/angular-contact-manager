import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  public loading: Boolean = false;
  public contactId: string | null = '';
  // public contact = <IContact>{}; this
  public contact = {} as IContact; //or this
  //fixes initializer issue

  public group: IGroup = {} as IGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactService
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

          //get group
          this.contactsService
            .getSingleGroup(this.contact)
            .subscribe((group) => {
              this.group = group;
            });
        });
    }
  }

  public isNotEmpty() {
    return (
      Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
    );
  }
}
