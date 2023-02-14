import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DbOperation } from 'src/app/helpers/dbOperations';
import { TableModel } from 'src/app/models/TableMaster';
import { TableMasterService } from 'src/app/service/table-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-master',
  templateUrl: './table-master.component.html',
  styleUrls: ['./table-master.component.css']
})
export class TableMasterComponent {

  constructor(private _tableService: TableMasterService,private _tosetrService:ToastrService) { }

  TablesList: TableModel[] = []
  buttonText: string = "save";
  submitted: boolean = true;
  dbOps: DbOperation = DbOperation.create;
  backEndErrorMassage: string = "";



  tableForm = new FormGroup({
    _id: new FormControl(),
    tableNumber: new FormControl('', Validators.required),
    capacity: new FormControl(4, Validators.required)
  });


  ngOnInit() {
    this.getTables()
  }

  onSubmit() {

    if (this.tableForm.invalid ) {
      return;
    }
    switch(this.dbOps){
      case DbOperation.create:
        this._tableService.addTable(<TableModel>this.tableForm.value).subscribe(() => {
          this.getTables()
          this._tosetrService.success('data added',"success")
        })  
      break;

      case DbOperation.update:
        this._tableService.updateTable(<TableModel>this.tableForm.value).subscribe(() => {
          this.getTables()
          this._tosetrService.success('data updated ', 'success')
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
    const updateTable= this.TablesList.find((table:TableModel)=>table._id===id)
    if(updateTable){
      this.tableForm.patchValue(updateTable)
    }
    }

  delete(id: string) {
    console.log(id)
    Swal.fire({
      title:'Confirem Delete !',
      text:'deleted data is not recoverable.',
      showCancelButton: true,
      denyButtonText:'no',
      icon:'question',
      confirmButtonText:'yas'
    
    }).then((result)=>{
      if(result.value){
        this._tableService.deletetable(id).subscribe(res => {
          this.getTables();

          Swal.fire({
            title:'success',
            text:'data is deleted successfully !',
            icon:'success'
          })

        })
      }else{
        Swal.fire({
          title:'cancelled',
          text:' data is safe !',
          icon:'error'
        })
      }
    })
    
  }

  onCancell() {
    this.tableForm.reset();
    this.buttonText = "save"
  }


}
