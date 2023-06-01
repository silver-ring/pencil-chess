import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {PlayerComponent} from "./player.component";
import {NgxChessBoardView} from "ngx-chess-board";
import {compact} from "lodash";

describe('PlayerComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [PlayerComponent, RouterTestingModule],
    declarations: []
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PlayerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  fit('should render title', () => {
    const fixturePlayer1 = TestBed.createComponent(PlayerComponent);
    const fixturePlayer2 = TestBed.createComponent(PlayerComponent);
    const compiled = fixturePlayer1.nativeElement as HTMLElement;

    fixturePlayer1.componentInstance.myMove = true;
    fixturePlayer2.componentInstance.myMove = false;

    fixturePlayer1.componentInstance.playerName = 'Player1';
    fixturePlayer2.componentInstance.playerName = 'Player2';

    fixturePlayer1.componentInstance.isRevered = false;
    fixturePlayer2.componentInstance.isRevered = true;

    try {
      fixturePlayer1.detectChanges();
      fixturePlayer2.detectChanges();
    } catch (ex) {

    }

    const board = fixturePlayer1.componentInstance.board;
    expect(board?.getFEN()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    // fixturePlayer1.componentInstance.onMoveChange({fen: board?.getFEN(), checkmate: false})
    board?.move('e2e4')
    try {
      fixturePlayer1.detectChanges()
      fixturePlayer2.detectChanges()
    } catch (ex) {

    }

    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('h7h6')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('f1c4')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('h8h7')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('d1h5')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('h7h8')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    board?.move('h5f7')
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
    console.log(board?.getFEN());
    expect(fixturePlayer1.componentInstance.myMove).toBeFalsy();
    expect(fixturePlayer2.componentInstance.myMove).toBeFalsy();
  });
});
