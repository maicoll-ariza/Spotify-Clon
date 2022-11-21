import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/model/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  // mockCover!:TrackModel ;

   listObservers$: Array<Subscription>=[]
   state: string = 'paused'
  constructor(public _multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer$1 = this._multimediaService.playerStatus$.subscribe(
      status => this.state = status
    )
    this.listObservers$ = [observer$1]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

  handlePosition(event: MouseEvent){
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x
    const percentageFromX = ( clickX * 100 ) / width
    this._multimediaService.seekAudio(percentageFromX)    
  }

}
