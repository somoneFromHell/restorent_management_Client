import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormsModule,FormGroup, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-table-master',
  templateUrl: './table-master.component.html',
  styleUrls: ['./table-master.component.css']
})
export class TableMasterComponent {

  constructor( private _http : HttpClient,private _fb : FormBuilder ) {  }

  uri:string = "http://localhost:3200/api/table" 
  
  tableForm:FormGroup = this._fb.group({
    id:[0],
    tavleNumber:['',Validators.required],
    capacity:['',Validators.required]
  });

  ngOnInit(){

  }

  addTable(item:any){
    console.log(item)
    return this._http.post(this.uri,item)
  }
}
