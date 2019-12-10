import { Component, OnInit, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private modalService : NgbModal,
              private storageService : StorageService) { }

  ngOnInit() {
    if(!this.shoppingCart){
      this.shoppingCart = this.storageService.getCurrentCart();
    }
  }

  @Input() shoppingCart : any = this.storageService.getCurrentCart();

  open(content){
    this.modalService.open(content);
  }
}
