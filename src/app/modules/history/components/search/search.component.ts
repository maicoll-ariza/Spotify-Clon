import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output()
  callbackData: EventEmitter<any> = new EventEmitter()

  src: string =''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string){
    if(term.length < 3) return
    this.callbackData.emit(term)
  }
}
