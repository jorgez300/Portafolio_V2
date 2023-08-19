let DataVP = [];
let DataFFD = [];

let SelVP = [];
let SelFFD = [];


$(function () {

    GetListaInventariosComp((data) => {

        GetDetalleInventariosComp(data[0], (reg) => {

            DataFFD = reg;

        })

        GetDetalleInventariosComp(data[1], (reg) => {

            DataVP = reg;

        })
    })

})


//7591196000101

$("#BtnFiltrar").click(() => {

    $("#DivFFD").empty();
    $("#DivVP").empty();

    SelVP = [];
    SelFFD = [];

    Filtrar();

})


const Filtrar = () => {


    if ($("#CodProd").val() == "") {

        toastr.error('Ingrese codigo', 'Error')
        return;
    }




    DataVP.forEach((item) => {

        if (item.Codigo == $("#CodProd").val().toUpperCase() || item.Descripcion.includes($("#CodProd").val().toUpperCase())) {
            SelVP.push(item);
        }

    })

    DataFFD.forEach((item) => {

        if (item.Codigo == $("#CodProd").val().toUpperCase() || item.Descripcion.includes($("#CodProd").val().toUpperCase())) {
            SelFFD.push(item);
        }

    })


    InitComparacion();

}

let RegPA = "";

const InitComparacion = () => {


    if (SelVP.length == 0) {

        $("#DivVP").append(
            `
                    <div class="col-12 mt-1">
                        <div class="card border-warning">
                            <div class="card-body">
                               <h2>Sin registros</h2>
                               <p>Si no se refleja el producto puede que el mismo no tenga datos para esta farmacia o no tenga un principio activo asignado</p>
                            </div>
                        </div>
                    </div>
                `
        )

    }
    else {
        SelVP.forEach((item) => {

            RegPA = "";

            item.ListPrinAct.forEach((PA) => {
                RegPA += `<tr><td>${PA.Id + " - " + PA.Dsc}</td></tr>`
            });

            $("#DivVP").append(
                `
                    <div class="col-12 mt-1">
                        <div class="card">
                            <div class="card-body">
                                <table>
                                    <tbody>
                                        <tr><td><b>Codigo:</b> ${item.Codigo}</td></tr>
                                        <tr><td><b>Descripcion:</b> ${item.Descripcion}</td></tr>
                                        <tr><td><b>Existen:</b> ${item.Existen}</td></tr>
                                        <tr><td><b>Costo USD:</b> ${FormatNumber(item.CostoUsd)}</td></tr>
                                        <tr><td><b>Costo Bs:</b> ${FormatNumber(item.CostoBs)}</td></tr>
                                        <tr><td><b>Precio Bs:</b> ${FormatNumber(item.PrecioBs)}</td></tr>
                                    </tbody>
                                </table>
                                <button id="BtnCollVP${item.Codigo}" class="btn btn-success w-100 mt-1 mb-1" data-bs-toggle="collapse" data-bs-target="#CollVP${item.Codigo}">Principios activos</button>
                                <div id="CollVP${item.Codigo}" class="collapse">
                                    <table>
                                        <tbody>
                                           ${RegPA}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )

        })
    }


    if (SelFFD.length == 0) {

        $("#DivFFD").append(
            `
                    <div class="col-12 mt-1">
                        <div class="card border-warning">
                            <div class="card-body">
                               <h2>Sin registros</h2>
                               <p>Si no se refleja el producto puede que el mismo no tenga datos para esta farmacia o no tenga un principio activo asignado</p>
                            </div>
                        </div>
                    </div>
                `
        )

    }
    else {
        SelFFD.forEach((item) => {

            RegPA = "";

            item.ListPrinAct.forEach((PA) => {
                RegPA += `<tr><td>${PA.Id + " - " + PA.Dsc}</td></tr>`
            });


            $("#DivFFD").append(
                `
                    <div class="col-12 mt-1">
                        <div class="card">
                            <div class="card-body">
                                <table>
                                    <tbody>
                                        <tr><td><b>Codigo:</b> ${item.Codigo}</td></tr>
                                        <tr><td><b>Descripcion:</b> ${item.Descripcion}</td></tr>
                                        <tr><td><b>Existen:</b> ${item.Existen}</td></tr>
                                        <tr><td><b>Costo USD:</b> ${FormatNumber(item.CostoUsd)}</td></tr>
                                        <tr><td><b>Costo Bs:</b> ${FormatNumber(item.CostoBs)}</td></tr>
                                        <tr><td><b>Precio Bs:</b> ${FormatNumber(item.PrecioBs)}</td></tr>
                                    </tbody>
                                </table>
                                <button id="BtnCollFFD${item.Codigo}" class="btn btn-success w-100 mt-1 mb-1" data-bs-toggle="collapse" data-bs-target="#CollFFD${item.Codigo}">Principios activos</button>
                                <div id="CollFFD${item.Codigo}" class="collapse">
                                    <table>
                                        <tbody>
                                           ${RegPA}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )

        })
    }



}


const GetListaInventariosComp = (Callback) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Carpeta": "Inventario"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://gesfarmonlinefunc.azurewebsites.net/api/GetInventario?code=X2Ht1SvYpBIG475OHuORr1r_C5Y5VsLMExHvnnzvOuKfAzFuidCBaw==", requestOptions)
        .then(response => response.json())
        .then(result => Callback(result))
        .catch(error => console.log('error', error));
}

const GetDetalleInventariosComp = (URL, Callback) => {

    console.log(URL);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(URL, requestOptions)
        .then(response => response.json())
        .then(result => Callback(result))
        .catch(error => console.log('error', error));
}

const FormatNumber = (data) => {

    return new Intl.NumberFormat('de-DE').format(data)
}