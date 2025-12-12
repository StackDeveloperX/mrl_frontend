// src/types/clients.ts

export interface Client {
    id: number;
    user_id: number;
    client_number?: string;
  
    email?: string;
    first_name: string;
    last_name?: string;
  
    company_name?: string;
    contact_person?: string;
    phone?: string;
  
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
  
    notes?: string;
    is_active?: boolean;
  
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ClientCreate {
    email: string;
    first_name: string;
    password: string;
  
    last_name?: string;
    company_name?: string;
    contact_person?: string;
    phone?: string;
  
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
  }
  
  export interface ClientUpdate {
    first_name?: string;
    last_name?: string;
  
    company_name?: string;
    contact_person?: string;
    phone?: string;
  
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
  
    notes?: string;
    is_active?: boolean;
  }
  