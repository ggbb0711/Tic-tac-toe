let UI_game_board=document.querySelectorAll('.square')
let square_container=document.querySelector('.game-board')
let result_screen=document.querySelector('.result-screen')
let result=document.querySelector('.result')
let replay=document.querySelector('.replay')
let reset_button=document.querySelector('.reset')
function result_popup(curr_player,status){
    result_screen.style.display='block'
    square_container.style.display='none'
    if(status==='win')result.innerText=`Player ${(curr_player==='close')?'X':'O'} wins`
    else result.innerText='It\'s a draw'
}
function reset_board() {
    UI_game_board.forEach(e=>{
        e.querySelector('.material-icons.md-80').innerText=''
        e.style.cursor='pointer'
    })
}
class tic_tac_toe{
    constructor(game_board,curr_player){
        this.game_board=game_board;
        this.curr_player=curr_player;
    }
    place_move=(el,index)=>{
        el.addEventListener('click',()=>{
            if(el.querySelector('.material-icons.md-80').innerText===''){
                el.querySelector('.material-icons.md-80').innerText=this.curr_player;
                (index%3===0)?this.game_board[index/3][index%3]=this.curr_player:this.game_board[Math.floor(index/3)][index%3]=this.curr_player
                el.style.cursor='default'
                if(tic_tac_toe.check_win(this.game_board,index,this.curr_player)) result_popup(this.curr_player,'win');
                else if(tic_tac_toe.check_draw(this.game_board)) result_popup(this.curr_player,'draw')
                //switch turn
                if(document.querySelector('.game-board').style.display!=='none'){
                    (this.curr_player==='radio_button_unchecked')?this.curr_player='close':this.curr_player='radio_button_unchecked'
                    document.querySelector('.curr-player').innerText=`Player ${(this.curr_player==='close')?'X':'O'}\'s turn`
                }
            }
        })
    }
    static check_left_rigth(game_board,curr_position){
        let count=1
        let move=1
        //check_left
        while(game_board[curr_position[0]][curr_position[1]-move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
        move=1
        //check_right
        while(game_board[curr_position[0]][curr_position[1]+move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
    }
    static check_up_down(game_board,curr_position){
        let count=1
        let move=1
        //check_up
        while(curr_position[0]-move>-1&&game_board[curr_position[0]-move][curr_position[1]]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
        move=1
        //check_down
        while(curr_position[0]+move<game_board.length&&game_board[curr_position[0]+move][curr_position[1]]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
    }
    static check_upright_downleft(game_board,curr_position){
        let count=1
        let move=1
        //check_upright
        while(curr_position[0]-move>-1&&game_board[curr_position[0]-move][curr_position[1]+move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
        move=1
        //check_downleft
        while(curr_position[0]+move<game_board.length&&game_board[curr_position[0]+move][curr_position[1]-move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
    }
    static check_upleft_downright(game_board,curr_position){
        let count=1
        let move=1
        //check_upleft
        while(curr_position[0]-move>-1&&game_board[curr_position[0]-move][curr_position[1]-move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
        move=1
        //check_downright
        while(curr_position[0]+move<game_board.length&&game_board[curr_position[0]+move][curr_position[1]+move]===game_board[curr_position[0]][curr_position[1]]){
            count++
            move++
        }
        if(count===3) return true
    }
    static check_win(game_board,index){
        let curr_position=(index%3===0)?[index/3,index%3]:[Math.floor(index/3),index%3]
        return(
        tic_tac_toe.check_left_rigth(game_board,curr_position)||
        tic_tac_toe.check_up_down(game_board,curr_position)||
        tic_tac_toe.check_upright_downleft(game_board,curr_position)||
        tic_tac_toe.check_upleft_downright(game_board,curr_position))
    }
    static check_draw(gameboard){
        return gameboard.every(row=>!row.includes(undefined))
    }
}
let game=new tic_tac_toe([[,,,],[,,,],[,,,]],'radio_button_unchecked')
UI_game_board.forEach(game.place_move)
replay.addEventListener('click',()=>{
    reset_board()
    game.game_board=[[,,,],[,,,],[,,,]]
    game.curr_player='radio_button_unchecked'
    document.querySelector('.curr-player').innerText='Player O\'s turn'
    square_container.style.display='block'
    result_screen.style.display='none'
})
reset_button.addEventListener('click',()=>{
    reset_board()
    game.game_board=[[,,,],[,,,],[,,,]]
    game.curr_player='radio_button_unchecked'
    document.querySelector('.curr-player').innerText='Player O\'s turn'
})