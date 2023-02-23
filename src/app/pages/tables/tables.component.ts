import { Component } from '@angular/core';
import { TableModel } from 'src/app/models/TableMaster';
import { TableMasterService } from 'src/app/service/table-master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  constructor(private _tableservice:TableMasterService) {}
  tableList: TableModel[] =[]

  ngOnInit() {
    this.getTable()
  }

  getTable(){
    this._tableservice.getTables().subscribe((res:any)=>{
      this.tableList = res
      console.log(this.tableList)
    })
  }

  buttonClick(id:string){
    
  }


}
