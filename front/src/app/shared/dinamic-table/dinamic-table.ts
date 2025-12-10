import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShearchInput } from "../shearch-input/shearch-input";
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from '../../core/pipes/paginator.pipe';
@Component({
  selector: 'app-dinamic-table',
  imports: [ShearchInput, CommonModule, FilterPipe, PaginatorPipe],
  templateUrl: './dinamic-table.html',
  styleUrl: './dinamic-table.css'
})
export class DinamicTable{
  @Input() columns: { key: string; label: string }[] = [];
  @Input() dataTable:any
  @Input() otherAcctionButon:boolean = false

  @Input() searchableKeys: string[] = [];
  searchTerm: string = ''


  currentPage: number = 1
  @Input() itemsPerPage: number = 6
  

  totalFilteredCount: number = 0

  @Output() edit = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()
  @Output() otherAcction = new EventEmitter<any>()



  updateFilteredCount(count: number): void {
    if (this.totalFilteredCount !== count) {
      this.totalFilteredCount = count
      if (this.currentPage > this.getTotalPages()) {
        this.currentPage = 1
      }
    }
  }

  getTotalPages(): number {
    if (this.totalFilteredCount === 0) {
      return 1
    }
    return Math.ceil(this.totalFilteredCount / this.itemsPerPage)
  }

  goToPage(page: number): void {
    const totalPages = this.getTotalPages()
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page
    }
  }
  
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages()
    return Array.from({ length: totalPages }, (_, i) => i + 1)
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
