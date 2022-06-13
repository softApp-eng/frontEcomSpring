import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public products: any;
  constructor(
    public CatalogueService: CatalogueService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1'];
        if (p1 == 1) {
          this.getProducts('/products/search/selectedproducts');
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params['p2'];
          this.getProducts('/categories/' + idCat + '/products');
        }
      }
    })
  }
  public getProducts(url: any) {
    this.CatalogueService.getResource(url).subscribe(
      (data) => {
        // console.log(data)
        this.products = data;
      },
      (err) => {
        console.log('products erreur');
      }
    );
  }

}
