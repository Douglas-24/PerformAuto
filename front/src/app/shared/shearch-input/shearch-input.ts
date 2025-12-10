import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './shearch-input.html',
  styleUrl: './shearch-input.css'
})
export class ShearchInput {
  placeholder: string = 'Buscar...'
  @Input() initialValue: string = ''

  @Output() search = new EventEmitter<string>()

  searchTerm: string = this.initialValue

  onSearchTermChange(term: string): void {
    this.search.emit(term)
  }
}
