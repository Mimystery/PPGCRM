import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClientCardData } from '../interfaces/client-card-data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  http = inject(HttpClient)

  getClients(){
    return this.http.get<ClientCardData[]>(`https://localhost:7189/api/Clients/AllClients`)
  }

  createClient(name: string){
    const createClientBody = { companyName: name }
    return this.http.post(`https://localhost:7189/api/Clients/AddClient`, createClientBody)
  }
  updateClient(clientId: string, client: ClientCardData): Observable<ClientCardData> {
    return this.http.put<ClientCardData>(`https://localhost:7189/api/Clients/UpdateClient/${clientId}`, client);
  }
}
