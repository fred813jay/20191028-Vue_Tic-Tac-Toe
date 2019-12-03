var blocks = { type: 0}
var vm = new Vue({
    el: "#app",
    data: {
        blocks: [],
        turn: 1,
        player_win: 0,
        CheckCooperation: []
    },
    mounted() {
        this.restart();
        this.turn=1;
    },
    methods: {
        restart(){
            this.blocks= Array.from( {length:9}, function(d,i){
                return {
                    id: i+1,
                    type: 0
                }
            })
            this.player_win=0;
        },
        player_go(block){
            this.CheckCooperation = this.blocks.filter((value)=>{
                return value.type==0
            });
            if (block.type==0 && this.player_win==0){
                block.type=this.turn
                this.turn=-this.turn
            }
            else if (this.player_win==1){
                alert("O Wins,Please Restart")
            }
            else if (this.player_win==-1){
                alert("X Wins,Please Restart")
            }
            else if (this.CheckCooperation.length==0 && this.player_win==0){
                alert("Cooperation,Please Restart")
            }
            else {
                alert("Not allow")
            }       
        },
    },
    computed: {
        pattern_data(){
            var verify_list= "123,456,789,147,258,369,159,357"
            var result= 
                verify_list.split(",").map((vtext)=>{
                    var add = this.blocks
                              .filter((d,i)=>(vtext.indexOf(i+1)!=-1))
                              .map((d,i)=>d.type)
                              .reduce((a,b)=>a+b,0)
                    return {
                        rule: vtext,
                        value: add
                    }
                })
            result= result.filter((obj)=>Math.abs(obj.value)==3)
            return result
        },
        win_text(){
            var winner = 0
            if (this.pattern_data.length>0){
                var winner= this.pattern_data[0].value
            }
            if (winner==3){
                this.player_win =1;
                return "O Wins"
            }
            else if(winner==-3){
                this.player_win =-1;
                return "X Wins"
            }
            return (this.turn==1?'O':'X')+"' turn"
        },
    },
});