export interface Event {
  id: string;
  title: string;
  slug: string
  startDay: string;     
  endDay: string;
  startTime: string;    
  endTime: string;
  category: string;
  location: string;
  description: string;
  price: number;         
  maxCapacity: number;   
  status: "UPCOMING" | "ONGOING" | "DONE"; 
  imageURL: string;      
  createdAt: string;     
  updatedAt: string;     
  organizerId: string;  
  organizer: {
    orgName: string;
  } 
  ticketCategories: {
    id: string;
    name: string;
    price: number;
    quota: number;
  }[];
}
