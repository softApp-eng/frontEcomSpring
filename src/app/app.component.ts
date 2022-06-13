import { CatalogueService } from './services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontEcomSpring'; 
  categories:any;
  currentCat:any;
  constructor(private CatalogueService:CatalogueService,
    private router:Router){

  }
  ngOnInit() {
    this.getCategories()
  }
  

  private getCategories(){
   this.CatalogueService.getResource("/categories").subscribe(data=>{
        console.log(data)
        this.categories = data;
   },err=>{
      console.log("error")
   })
  }



  getProductsByCat(c:any){
    this.currentCat = c ;
    this.router.navigateByUrl("/products/2/"+c.id);
  }
}
