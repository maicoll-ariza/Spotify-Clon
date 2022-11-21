import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/model/tracks.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  
   callback: EventEmitter<any>=new EventEmitter<any>()

   public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
   public audio!: HTMLAudioElement
   public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
   public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
   public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
   public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe( responseOK =>{
      if( responseOK ){
        this.setAudio(responseOK)
      }
    })
    this.listenAllEvents()
   }

   private listenAllEvents() {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
   }

   private setPlayerStatus = (state: any) => {
    console.log(state);
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break;
        case 'playing':
        this.playerStatus$.next('playing')
        break;
        case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
   }

   private calculateTime = () => {
    const { duration, currentTime } = this.audio
    console.table([duration, currentTime]);
    this.setTimeElapse(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPecentage(currentTime, duration)
   }

   private setPecentage(current: number, duration: number){
    let percentage = current * 100 / duration
    this.playerPercentage$.next(percentage)
   }

   private setTimeElapse(currentTime: number) {
    let seconds = Math.floor( currentTime % 60 )
    let minutes = Math.floor(( currentTime / 60 ) % 60 )

    const displaySeconds = ( seconds < 10 ) ? `0${seconds}` : seconds
    const displayMinutes = ( minutes < 10 ) ? `0${minutes}` : minutes

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
   }

   private setRemaining(currentTime: number, duration: number){
    let timeLeft = duration - currentTime
    let seconds = Math.floor( timeLeft % 60 )
    let minutes = Math.floor(( timeLeft / 60 ) % 60 )

    const displaySeconds = ( seconds < 10 ) ? `0${seconds}` : seconds
    const displayMinutes = ( minutes < 10 ) ? `0${minutes}` : minutes

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
   }

   public setAudio(track: TrackModel) {
      this.audio.src = track.url
      this.audio.play()
    }
    public togglePlayer(){
      (this.audio.paused) ? this.audio.play() : this.audio.pause()
    }

    public seekAudio(percentage: number) {
      const { duration } = this.audio
      const percentageToSecond = percentage * duration / 100
      this.audio.currentTime = percentageToSecond
    }
}

