import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShearchInput } from "../shearch-input/shearch-input";
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dinamic-table',
  imports: [ShearchInput, CommonModule, FilterPipe],
  templateUrl: './dinamic-table.html',
  styleUrl: './dinamic-table.css'
})
export class DinamicTable implements OnInit{
  @Input() columns: { key: string; label: string }[] = [];
  @Input() dataTable:any


  @Input() searchableKeys: string[] = []; 
  searchTerm: string = '';

  @Output() edit = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()
  @Output() otherAcction = new EventEmitter<any>()

  ngOnInit(): void {
    console.log(this.columns);
    console.log(this.dataTable);
    
    
  }

  onSearch(term: string): void {
    this.searchTerm = term;
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
