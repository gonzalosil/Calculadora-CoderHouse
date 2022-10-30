let Functions = [];
let function2add;
let layout = [];
let id = 0;
let all_data = [];

let exp1 = "x";
let exp2 = "1.5*x";
let exp3 = "2**x";

class Function{
    x = [];
    y = [];
    data = [];
    constructor(func, id){
        for (let x = 0; x <= 10; x += 0.4){
            this.x.push(x);
            this.y.push(eval(func))
        }
        this.id = id;
        this.data = ({x: this.x, y: this.y, mode:"lines"})
    }
    
}

function new_function(event) {
    event.preventDefault();
    function2add = inputUsuario.value;
    add_function.reset();
    Functions.push(new Function(function2add, id));
    
    // actualizarUsuarioStorage();
    // mostrarTextoUsuario();
    draw_plot(id);
    id++;
  }

function initialize_elements(){
    add_function = document.getElementById(
        "add_function"
      );
}
function initialize_events(){
    add_function.onsubmit = (event) => new_function(event);
}

function draw_plot(id){
//layout.push( = {title: "[y=" + exp1 + "] [y=" + exp2 + "] [y=" + exp3 + "]"});
for (i = 0; i<Functions.length; i++){
    all_data[i] = (Functions[i].data);
}
Plotly.newPlot("myPlot", all_data);
}


function  main(){
    initialize_elements();
    initialize_events();
}

main();