// src/app/cat.service.ts
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';  
import { Cat } from '../models/cat.model';
@Injectable({
  providedIn: 'root',
})
export class CatService {
  private baseUrl: string = 'https://localhost:8080/api/Cat';  

  // Get all cats
  getCats(): Observable<Cat[]> {
    return from(fetch(`${this.baseUrl}/all`)
      .then((response) => response.json()) 
      .then((data) => {
        if (data.isSuccess) {
          return data.payload;  
        } else {
          throw new Error('Failed to fetch cats');
        }
      })
      .catch((error) => {
        console.error('Error fetching cats:', error);
        return [];  
      }));
  }

  // Get cat by name
  getCatById(id: string): Observable<Cat> {
    return from(fetch(`${this.baseUrl}/${id}`)
      .then(response => response.json()).then((data) => {
        if (data.isSuccess) {
          return data.payload;  
        } else {
          throw new Error('Failed to fetch cats');
        }
      })
      .catch(error => {
        console.error(`Error fetching cat with id ${id}:`, error);
        return null;  // Return null if there's an error
      }));
  }

  // Add a new cat
  addCat(cat: Cat): Observable<Cat> {
    return from(fetch(`${this.baseUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    }).then(response => response.json())
      .catch(error => {
        console.error('Error adding cat:', error);
        throw error;  
      }));
  }

  // Update an existing cat
  updateCat(name: string, cat: Cat): Observable<Cat> {
    return from(fetch(`${this.baseUrl}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    }).then(response => response.json())
      .catch(error => {
        console.error(`Error updating cat with name ${name}:`, error);
        throw error; 
      }));
  }

  // Delete a cat by name
  deleteCat(id: string): Observable<void> {
    return from(fetch(`${this.baseUrl}/delete?catId=${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .catch(error => {
        console.error(`Error deleting cat with name ${name}:`, error);
        throw error;
      }));
  }
}
