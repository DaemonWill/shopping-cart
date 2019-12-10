import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  constructor(private modalService : NgbModal,
              private storageService : StorageService) { }

  ngOnInit() {
  }

  @Input() item : any = {
    "id" : null,
    "description" : null,
    "unit_price" : null,
    "volume_discounts" : []
  }
  shoppingCart : any = this.storageService.getCurrentCart();

  open(content){
    this.modalService.open(content, {"size": "sm"});
  }
}
