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
    id;
    constructor(func, id){
        this.func = func;
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
    draw_plot();
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

function draw_plot(){
//layout.push( = {title: "[y=" + exp1 + "] [y=" + exp2 + "] [y=" + exp3 + "]"});
    for (i = 0; i<Functions.length; i++){
        all_data[i] = (Functions[i].data);
    }
    Plotly.newPlot("myPlot", all_data);
    update_func_storage();
    draw_funcs();
}

function draw_funcs() {
    func_list.innerHTML = "";
    Functions.forEach((calc, index) => {
      let column = document.createElement("div");
        column.className = "";
        column.id = `row-${calc.id}`;
        column.innerHTML = `
              <div class="card">
                  <div class="card-body">
                  <li class="card-text">Trace (${index}): Y =
                      <b>${calc.func}</b>
                  </li>
                  </div>
                  <div class="card-footer">
                      <button class="delete_btn" id="botonEliminar-${calc.id}" ><p>Eliminar</p></button>
                  </div>
              </div>`;
  
      func_list.append(column);
  
      let botonEliminar = document.getElementById(`botonEliminar-${calc.id}`);
      botonEliminar.onclick = () => confirm_item_delete(calc.id);
    });
}


function confirm_item_delete(idProducto) {
    Swal.fire({
      icon: "question",
      title: "¿Estas seguro que quieres eliminar el producto?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        delete_Calculation(idProducto);
      }
    });
  }

  function delete_Calculation(id_Calc) {
    let index = 0;
    // let columnaBorrar = document.getElementById(`row-${id_Calc}`);
    for (let i = 0; i < Functions.length ; i++){
        if(Functions[i].id == id_Calc){
            index = i;
            break;
        }
    }
    Functions.splice(index, 1);
    Plotly.deleteTraces("myPlot", 0);
    draw_funcs();
    draw_plot();
  }

  function update_func_storage() {
    let FunctionsJSON = JSON.stringify(Functions);
    localStorage.setItem("Functions", FunctionsJSON);
  }

  function get_func_storage() {
    let FunctionsJSON = localStorage.getItem("Functions");
    if (FunctionsJSON){
        Functions =  (JSON.parse(FunctionsJSON));
        draw_plot();
    }
  }

function  main(){
    initialize_elements();
    initialize_events();
    get_func_storage();
}

main();