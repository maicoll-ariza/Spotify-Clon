import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/model/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  dataTracksTrending$: Observable<TrackModel[]> = of([])
  dataTracksRandom$: Observable<any> = of([])

  constructor(private http: HttpClient ) { }

  private skipBy_id( listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
    return new Promise(( resolve, reject) => {
      const listTmp = listTracks.filter( a => a._id !== id)
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      map(( dataRaw: any ) => {
          return dataRaw.data
      })
    )
  }

  getAllRandom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      mergeMap(( { data }: any ) => this.skipBy_id(data, 10 )),
      catchError(( error) => {
        alert('Página no encontrada')
        return of([])
      })
    )
  }


}
