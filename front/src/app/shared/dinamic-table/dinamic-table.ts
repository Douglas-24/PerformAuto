import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dinamic-table',
  imports: [],
  templateUrl: './dinamic-table.html',
  styleUrl: './dinamic-table.css'
})
export class DinamicTable implements OnInit{
  @Input() columns: { key: string; label: string }[] = [];
  @Input() dataTable:any

  @Output() edit = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()
  @Output() otherAcction = new EventEmitter<any>()

  ngOnInit(): void {
    console.log(this.columns);
    console.log(this.dataTable);
    
    
  }
  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onOtherAcction(row:any){
    this.otherAcction.emit(row)
  }
}
