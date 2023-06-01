import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  standalone: true,
  templateUrl: 'home.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('player1')
  player1Frame?: ElementRef;

  @ViewChild('player2')
  player2Frame?: ElementRef;

  player1FrameUrl: SafeResourceUrl;
  player2FrameUrl: SafeResourceUrl;

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    if (this.onGame) {
      localStorage.setItem('onGame', `${this.onGame}`)
    }
  }

  onGame = false;
  winner? : string;

  constructor(private domSanitizer: DomSanitizer) {
    this.player1FrameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${window.location.protocol}//${window.location.host}/player?playerName=player1&isRevered=false`);
    this.player2FrameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`${window.location.protocol}//${window.location.host}/player?playerName=player2&isRevered=true`);
  }

  ngOnInit() {
    const onGame = localStorage.getItem('onGame')
    if (onGame) {
      this.onGame = true;
    }
    addEventListener('message', ev => {
      if (!ev.data) {
        return;
      }
      if (ev.data.source === 'player1') {
        this.player2Frame?.nativeElement.contentWindow?.postMessage(ev.data, '*')
      }
      if (ev.data.source === 'player2') {
        this.player1Frame?.nativeElement.contentWindow?.postMessage(ev.data, '*')
      }
      if (ev.data.event?.checkmate) {
        this.onGame = false;
        this.winner = ev.data?.source;
      }
      if (ev.data.event?.stalemate) {
        this.onGame = false;
        this.winner = 'Draw';
      }
    });
  }

  startGame() {
    this.onGame = true;
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');
    localStorage.removeItem('onGame');
    this.player1Frame?.nativeElement.contentWindow?.postMessage('reset', '*')
    this.player2Frame?.nativeElement.contentWindow?.postMessage('reset', '*')
  }

}
