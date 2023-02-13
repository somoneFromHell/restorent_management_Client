import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DbOperation } from 'src/app/helpers/dbOperations';
import { TableModel } from 'src/app/models/TableMaster';
import { TableMasterService } from 'src/app/service/table-master.service';

@Component({
  selector: 'app-table-master',
  templateUrl: './table-master.component.html',
  styleUrls: ['./table-master.component.css']
})
export class TableMasterComponent {

  constructor(private _tableService: TableMasterService) { }

  TablesList: TableModel[] = []
  buttonText: string = "save";
  submitted: boolean = true;
  dbOps: DbOperation = DbOperation.create;
  backEndErrorMassage: string = "";
  updateTable:TableModel|undefined;



  tableForm = new FormGroup({
    id: new FormControl(''),
    tableNumber: new FormControl('', Validators.required),
    capacity: new FormControl(4, Validators.required)
  });


  ngOnInit() {
    this.getTables()
  }

  onSubmit() {

    if (this.tableForm.invalid && this.updateTable) {
      return;
    }
    switch(this.dbOps){
      case DbOperation.create:
        this._tableService.addTable(<TableModel>this.tableForm.value).subscribe((res) => {
          this.getTables()
          console.log(res)
        })  
      break;

      case DbOperation.update:
        this._tableService.updateTable(this.updateTable._id,<TableModel>this.tableForm.value).subscribe((res) => {
          this.getTables()
          console.log(res)
        })
        break;
    }
    this.onCancell()
    
  }

  getTables() {
    this._tableService.getTables().subscribe((res: any) => {
      this.TablesList = res;

      console.log(this.TablesList)
    })
  }

  edit(id: string) {
    console.log(id)
    this.buttonText = "update"
    this.dbOps = DbOperation.update;
    this.updateTable= this.TablesList.find((table:TableModel)=>table._id===id)
    if(this.updateTable){
      this.tableForm.patchValue(this.updateTable)
    }
    }

  delete(id: string) {
    console.log(id)
    this._tableService.deletetable(id).subscribe(res => {
      this.getTables();
    })
  }

  onCancell() {
    this.tableForm.reset();
    this.buttonText = "save"
  }


}
