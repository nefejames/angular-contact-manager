import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsServerUrl: string = 'http://localhost:5000/contacts';
  private groupsServerUrl: string = 'http://localhost:5000/groups';

  constructor(private http: HttpClient) {}

  //he adds 'public' to his methods. brad didn't. what is diff?
  // GET ALL CONTACTS
  public getAllContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.contactsServerUrl).pipe();
  }

  // GET SINGLE CONTACT
  public getSingleContact(contactId: string): Observable<IContact> {
    const singleContactUrl: string = `${this.contactsServerUrl}/${contactId}`;
    return this.http.get<IContact>(singleContactUrl).pipe();
  }

  // CREATE NEW CONTACT
  public createContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.contactsServerUrl, contact).pipe();
  }

  // UPDATE CONTACT
  public updateContact(
    contact: IContact,
    contactId: string
  ): Observable<IContact> {
    const updateContactUrl: string = `${this.contactsServerUrl}/${contactId}`;
    return this.http.put<IContact>(updateContactUrl, contact).pipe();
  }

  // UPDATE CONTACT
  public deleteContact(contactId: string): Observable<{}> {
    const updateContactUrl: string = `${this.contactsServerUrl}/${contactId}`;
    return this.http.delete<{}>(updateContactUrl).pipe();
  }

  // GET ALL GROUPS
  public getAllGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.groupsServerUrl).pipe();
  }

  // GET SINGLE GROUP
  public getSingleGroup(contact: IContact): Observable<IGroup> {
    const singleGroupUrl: string = `${this.groupsServerUrl}/${contact.groupId}`;
    return this.http.get<IGroup>(singleGroupUrl).pipe();
  }
}
