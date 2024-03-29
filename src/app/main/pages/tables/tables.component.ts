import { Component } from '@angular/core';
import { TableModel } from 'src/app/models/TableMaster';
import { TableMasterService } from 'src/app/service/table-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesService } from 'src/app/service/tables.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {


  constructor(private route: ActivatedRoute, private router: Router, private _tableMasterService: TableMasterService, private _tableService: TablesService, private _orderService: OrderService) {
    route.params.subscribe(val => this.loadTables());
  }
  tableList: TableModel[] = []
  selectedTableNo = ''
  selectedTableId = ''
  isOccupied = false

  selectedtable(tableId: string): any {
    const item = this.tableList.find(obj => obj._id === tableId)
    this.selectedTableNo = item.tableNumber
    this.selectedTableId = item._id
  }

  loadTables() {
    this.tableList = JSON.parse(localStorage.getItem('tables'))
    this.tableList.forEach((element: any) => {
      const tableexist = localStorage.getItem(element._id)
      if (tableexist) element.occupied = true
    })
  }

  ngOnInit() {
    // fetch table and store in local stroage
    this._tableMasterService.getTables().subscribe((res: any) => {
      localStorage.setItem("tables", JSON.stringify(res));
      this.loadTables()
    })


  }


  buttonClick(id: string) {
    this._orderService.addOrder({
      TableId: id, orderDate: new Date()
    })
    this._tableService.changeTableStatus({ _id: id })
  }

}
