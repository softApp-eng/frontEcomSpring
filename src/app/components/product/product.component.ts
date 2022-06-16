import { CatalogueService } from './../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public products: any;
  editPhoto: boolean = false;
  currentProduct: any;
  selectedFiles: any;
  progress = 0;
  currentFileUpload: any;
  public title!: String;
  timestamp: number = 0;
  constructor(
    public CatalogueService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1'];
        if (p1 == 1) {
          this.title = 'selected products';
          this.getProducts('/products/search/selectedproducts');
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params['p2'];
          this.title = 'products by cat ' + idCat;
          this.getProducts('/categories/' + idCat + '/products');
        } else if (p1 == 3) {
          this.title = 'promo products';

          this.getProducts('/products/search/promoProducts');
        } else if (p1 == 4) {
          this.title = 'available products';

          this.getProducts('/products/search/availableProducts');
        } else if (p1 == 5) {
          this.title = 'Search products';

          this.getProducts('/products/search/availableProducts');
        }
      }
    });
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
  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.CatalogueService.uploadPhotoProduct(
      this.currentFileUpload,
      this.currentProduct.id
    ).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          let v: any = event.total;
          // console.log(this.progress, '================');
          this.progress = Math.round((100 * event.loaded) / v);
          // console.log(this.progress);
        } else if (event instanceof HttpResponse) {
          //console.log(this.router.url);
          //this.getProducts(this.currentRequest);
          //this.refreshUpdatedProduct();
          // this.currentTime=Date.now();
         // this.getProducts('/products/search/selectedproducts');
          this.timestamp = Date.now();
          //alert("Problème de chargement 1");
        }
      },
      (err) => {
        alert('Problème de chargement 2');
      }
    );

    this.selectedFiles = undefined;
  }

  getTs() {
    return this.timestamp;
  }
}
