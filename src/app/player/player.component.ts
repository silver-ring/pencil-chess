import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {NgxChessBoardModule, NgxChessBoardView} from "ngx-chess-board";
import {NgClass, NgIf} from "@angular/common";
import {MoveChange} from "ngx-chess-board/lib/engine/outputs/move-change/move-change";
import {ActivatedRoute} from "@angular/router";
import * as _ from "lodash";

@Component({
  standalone: true,
  imports: [NgxChessBoardModule, NgIf, NgClass],
  providers: [],
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss'],
  selector: 'app-player'
})
export class PlayerComponent implements OnInit, AfterViewInit {

  playerName: string = '';
  isRevered = false;

  @ViewChild('board', {static: false})
  board?: NgxChessBoardView;

  myMove = false;

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    if (this.board) {
      localStorage.setItem(this.playerName, JSON.stringify({fen: this.board?.getFEN(), myMove: this.myMove}))
    }
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.playerName = this.activatedRoute.snapshot.queryParamMap.get('playerName') ?? 'player1';
    this.isRevered = this.activatedRoute.snapshot.queryParamMap.get('isRevered') === 'true';
    this.myMove = this.activatedRoute.snapshot.queryParamMap.get('isRevered') === 'false';
  }

  ngAfterViewInit() {
    const player = localStorage.getItem(this.playerName);
    if (player) {
      const board = JSON.parse(player);
      this.board?.setFEN(board.fen);
      this.myMove = board.myMove;
    }
    if (this.isRevered) {
      this.board?.reverse();
    }
    window.addEventListener('message', ev => {
      if (ev.origin !== `${window.location.protocol}//${window.location.host}`) {
        return;
      }
      if (ev.data === 'reset') {
        this.board?.reset();
        this.myMove = !this.isRevered;
        localStorage.removeItem(this.playerName);
        if (this.isRevered) {
          this.board?.reverse();
        }
        return;
      }
      if (_.isEmpty(ev.data?.source) || ev.data.source === this.playerName) {
        return;
      }
      this.myMove = true;
      const event = ev.data?.event;
      this.board?.setFEN(event.fen);
      if (this.isRevered) {
        this.board?.reverse();
      }
    });
  }

  onMoveChange($event: MoveChange) {
    this.myMove = false;
    window.parent.postMessage({source: this.playerName, event: $event}, `${window.location.protocol}//${window.location.host}`);
  }

}
