
let Calculations = [];
function draw_products() {
    contenedorProductos.innerHTML = "";
    Calculations.forEach((calc) => {
      let column = document.createElement("div");
        column.className = "col-md-4 mt-3";
        column.id = `columna-${calc.id}`;
        column.innerHTML = `
              <div class="card">
                  <div class="card-body">
                  <p class="card-text">Numero 1:
                      <b>${calc.number1}</b>
                  </p>
                  <p class="card-text">Numero 2:
                      <b>${calc.number2}</b>
                  </p>
                  <p class="card-text">Resultado:
                      <b>${calc.result}</b>
                  </p>
                  <p class="card-text">Operacion:
                      <b>${calc.operation}</b>
                  </p>
                  </div>
                  <div class="card-footer">
                      <button class="btn btn-danger" id="botonEliminar-${calc.id}" >Eliminar</button>
                  </div>
              </div>`;
  
      contenedorProductos.append(column);
  
      let botonEliminar = document.getElementById(`botonEliminar-${calc.id}`);
      botonEliminar.onclick = () => confirm_item_delete(calc.id);
    });
}

function initialize_elements(){
    clean_storage_btn = document.getElementById("clean_storage");
}
function initialize_events(){
    clean_storage_btn.onclick = delete_storage;
}

function get_calc_storage() {
    let CalculationsJSON = localStorage.getItem("Calculations");
    if (CalculationsJSON){
        Calculations =  (JSON.parse(CalculationsJSON));
        draw_products();
    }
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

  function delete_storage() {
    Swal.fire({
        title: 'Está seguro de eliminar todos los calculos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Calculations = [];
                draw_products();
                Swal.fire({
                    title: 'Borrado!',
                    icon: 'success',
                    text: 'Los calculos han sido eliminados'
                })
            }
        })
  }

  async function check_server_data() {
    fetch("./calculations.json")
      .then((response) => response.json())
      .then((data) => {
        Calculations = [...data]
        draw_products();
      })
      .catch((error) => console.log(error));
  }


  function delete_Calculation(id_Calc) {
    let columnaBorrar = document.getElementById(`columna-${id_Calc}`);
    let indiceBorrar = Calculations.findIndex(
      (id_Calc) => Number(Calculations.id) === Number(id_Calc)
    );
  
    Calculations.splice(indiceBorrar, 1);
    columnaBorrar.remove();
    update_calc_storage();
  }
  function update_calc_storage() {
    let CalculationsJSON = JSON.stringify(Calculations);
    localStorage.setItem("Calculations_data_base", CalculationsJSON);
  }

  function main(){
    initialize_elements();
    initialize_events();
    // check_server_data();
    get_calc_storage();
    //update_calc_storage();
  }

  main();