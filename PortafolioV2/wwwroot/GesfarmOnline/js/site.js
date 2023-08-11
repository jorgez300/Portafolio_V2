


let datos = null;

let InfoGraficos = {
    Periodo: [],
    Facturas: [],
    Venta: [],
    MtoXVenta: [],
    Costo: [],
    Utilidad: [],
    PorCentajeUtilidad: [],
    Cantidad: [],
    ItemsFalla: [],
    CostoFalla: []
}

$("#OriData").change((e) => {

    if ($("#OriData").val() == "MIX")
    {
        $("#DivEspecifico").addClass("d-none")
        $("#DivMixto").removeClass("d-none")
        SetDataOperacionesMixto();
    }
    else
    {
        $("#DivEspecifico").removeClass("d-none")
        $("#DivMixto").addClass("d-none")
        SetDataOperacionesDiario();
    }



});

$("#Refrescar").click((e) => {

    GetDataOperacionesDiario();
    $("#OriData").val("X");
    SetDataOperacionesDiario();

});

$(function () {

    "use strict"; // Start of use strict
    GetDataOperacionesDiario();


})



const GetDataOperacionesDiario = () => {

    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch("https://gesfarmonlinefunc.azurewebsites.net/api/GetDataOperacionesDiario?code=MJD8vQXyncJzvzxM2JlLRQRgq-NvMHm7_-MPDz55NBfIAzFuhnoEdw==", requestOptions)
        .then(response => response.json())
        .then(result => {
            datos = [...result];
            $("#Filtros").removeClass("d-none");
        })
        .catch(error => console.log('error', error));

}

const SetDataOperacionesDiario = () => {

    console.log(datos);

    InfoGraficos = {
        Periodo: [],
        Facturas: [],
        Venta: [],
        MtoXVenta: [],
        Costo: [],
        Utilidad: [],
        PorCentajeUtilidad: [],
        Cantidad: [],
        ItemsFalla: [],
        CostoFalla: []
    }

    if ($("#OriData").val() != "X") {
        datos.forEach((item) => {

            if (item.rD_Origen == $("#OriData").val()) {
                InfoGraficos.Periodo.push(item.rD_Fecha);
                InfoGraficos.Costo.push(item.rD_Costos);
                InfoGraficos.Venta.push(item.rD_Ventas);
                InfoGraficos.MtoXVenta.push(item.rD_Monto_Venta);
                InfoGraficos.Facturas.push(item.rD_Fact_Emit);
                InfoGraficos.Utilidad.push(item.rD_Utilidad);
                InfoGraficos.PorCentajeUtilidad.push(item.rD_Porc_Util);
                InfoGraficos.Cantidad.push(item.rD_Art_Venta);
                InfoGraficos.ItemsFalla.push(item.rD_Cant_Fallas);
                InfoGraficos.CostoFalla.push(item.rD_Monto_Fallas);
            }

        })
    }

    InitGrafCostoVenta();
    InitGrafFacturas();
    InitGrafCostoUtilidad();
    InitGrafPorcenUtilidad();
    InitGrafCantidad();
    InitGrafMtoXVenta();
    InitGrafFallasCant();
    InitGrafFallasMonto();
}

let ctxCostoVenta = null;
let ChartCostoVenta = new Chart();

const InitGrafCostoVenta = () => {

    ChartCostoVenta.destroy();

    ctxCostoVenta = document.getElementById('ChartCostoVenta');
    ChartCostoVenta = new Chart(ctxCostoVenta, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Costo',
                data: InfoGraficos.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Venta',
                data: InfoGraficos.Venta,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

let ctxFacturas = null;
let ChartFacturas = new Chart();

const InitGrafFacturas = () => {

    ChartFacturas.destroy();

    ctxFacturas = document.getElementById('ChartFacturas');
    ChartFacturas = new Chart(ctxFacturas, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Facturas',
                data: InfoGraficos.Facturas,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxCostoUtilidad = null;
let ChartCostoUtilidad = new Chart();

const InitGrafCostoUtilidad = () => {

    ChartCostoUtilidad.destroy();

    ctxCostoUtilidad = document.getElementById('ChartCostoUtilidad');
    ChartCostoUtilidad = new Chart(ctxCostoUtilidad, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Costo',
                data: InfoGraficos.Costo,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Utilidad',
                data: InfoGraficos.Utilidad,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

let ctxPorcenUtilidad = null;
let ChartPorcenUtilidad = new Chart();

const InitGrafPorcenUtilidad = () => {

    ChartPorcenUtilidad.destroy();

    ctxPorcenUtilidad = document.getElementById('ChartPorcenUtilidad');
    ChartPorcenUtilidad = new Chart(ctxPorcenUtilidad, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: '% Utilidad',
                data: InfoGraficos.PorCentajeUtilidad,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

let ChartCantidad = new Chart();
let ctxCantidad = null;

const InitGrafCantidad = () => {

    ChartCantidad.destroy();

    ctxCantidad = document.getElementById('ChartCantidad');
    ChartCantidad = new Chart(ctxCantidad, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Articulo por venta',
                data: InfoGraficos.Cantidad,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

let ChartMtoXVenta = new Chart();
let ctxMtoXVenta = null;

const InitGrafMtoXVenta = () => {

    ChartMtoXVenta.destroy();

    ctxMtoXVenta = document.getElementById('ChartMtoXVenta');
    ChartMtoXVenta = new Chart(ctxMtoXVenta, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Monto por venta',
                data: InfoGraficos.MtoXVenta,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

let ChartFallasCant = new Chart();
let ctxFallasCant = null;

const InitGrafFallasCant = () => {

    ChartFallasCant.destroy();

    ctxFallasCant = document.getElementById('ChartFallasCant');
    ChartFallasCant = new Chart(ctxFallasCant, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Items fallas',
                data: InfoGraficos.ItemsFalla,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

let ChartFallasMonto = new Chart();
let ctxFallasMonto = null;

const InitGrafFallasMonto = () => {

    ChartFallasMonto.destroy();

    ctxFallasMonto = document.getElementById('ChartFallasMonto');
    ChartFallasMonto = new Chart(ctxFallasMonto, {
        type: 'bar',
        data: {
            labels: InfoGraficos.Periodo,
            datasets: [{
                label: 'Monto fallas',
                data: InfoGraficos.CostoFalla,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}







///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////


let InfoMixtos = {
    Periodo: [],
    VP: {
        Facturas: [],
        Venta: [],
        MtoXVenta: [],
        Utilidad: [],
        PorCentajeUtilidad: [],
        Cantidad: [],
        ItemsFalla: [],
        CostoFalla: []
    },
    FFD: {
        Facturas: [],
        Venta: [],
        MtoXVenta: [],
        Utilidad: [],
        PorCentajeUtilidad: [],
        Cantidad: [],
        ItemsFalla: [],
        CostoFalla: []
    }

}

const SetDataOperacionesMixto = () => {


    InfoMixtos = {
        Periodo: [],
        VP: {
            Facturas: [],
            Venta: [],
            MtoXVenta: [],
            Utilidad: [],
            PorCentajeUtilidad: [],
            Cantidad: [],
            ItemsFalla: [],
            CostoFalla: []
        },
        FFD: {
            Facturas: [],
            Venta: [],
            MtoXVenta: [],
            Utilidad: [],
            PorCentajeUtilidad: [],
            Cantidad: [],
            ItemsFalla: [],
            CostoFalla: []
        }

    }

    datos.forEach((item) => {

        

        if (item.rD_Origen == "VP") {
            InfoMixtos.Periodo.push(item.rD_Fecha);
            InfoMixtos.VP.Venta.push(item.rD_Ventas);
            InfoMixtos.VP.MtoXVenta.push(item.rD_Monto_Venta);
            InfoMixtos.VP.Facturas.push(item.rD_Fact_Emit);
            InfoMixtos.VP.PorCentajeUtilidad.push(item.rD_Porc_Util);
            InfoMixtos.VP.Cantidad.push(item.rD_Art_Venta);
            InfoMixtos.VP.ItemsFalla.push(item.rD_Cant_Fallas);
            InfoMixtos.VP.CostoFalla.push(item.rD_Monto_Fallas);
        }
        if (item.rD_Origen == "FFD") {
            InfoMixtos.FFD.Venta.push(item.rD_Ventas);
            InfoMixtos.FFD.MtoXVenta.push(item.rD_Monto_Venta);
            InfoMixtos.FFD.Facturas.push(item.rD_Fact_Emit);
            InfoMixtos.FFD.PorCentajeUtilidad.push(item.rD_Porc_Util);
            InfoMixtos.FFD.Cantidad.push(item.rD_Art_Venta);
            InfoMixtos.FFD.ItemsFalla.push(item.rD_Cant_Fallas);
            InfoMixtos.FFD.CostoFalla.push(item.rD_Monto_Fallas);
        }

    })

    InitGrafMixtoVenta();
    InitGrafMixtoPorcenUtilidad();
    InitGrafMixtoFacturas();
    InitGrafMixtoCantidad();
    InitGrafMixtoMtoXVenta();
    InitGrafMixtoFallasCant();
    InitGrafMixtoFallasMonto();
}


let ctxMixtoVenta = null;
let ChartMixtoVenta = new Chart();
const InitGrafMixtoVenta = () => {

    ChartMixtoVenta.destroy();

    ctxMixtoVenta = document.getElementById('ChartMixtoVenta');
    ChartMixtoVenta = new Chart(ctxMixtoVenta, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Venta VP',
                data: InfoMixtos.VP.Venta,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Venta FFD',
                data: InfoMixtos.FFD.Venta,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoPorcenUtilidad = null;
let ChartMixtoPorcenUtilidad = new Chart();
const InitGrafMixtoPorcenUtilidad = () => {

    ChartMixtoPorcenUtilidad.destroy();

    ctxMixtoPorcenUtilidad = document.getElementById('ChartMixtoPorcenUtilidad');
    ChartMixtoPorcenUtilidad = new Chart(ctxMixtoPorcenUtilidad, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: '% Utilidad VP',
                data: InfoMixtos.VP.PorCentajeUtilidad,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '% Utilidad FFD',
                data: InfoMixtos.FFD.PorCentajeUtilidad,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoFacturas = null;
let ChartMixtoFacturas = new Chart();
const InitGrafMixtoFacturas = () => {

    ChartMixtoFacturas.destroy();

    ctxMixtoFacturas = document.getElementById('ChartMixtoFacturas');
    ChartMixtoFacturas = new Chart(ctxMixtoFacturas, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Facturas VP',
                data: InfoMixtos.VP.Facturas,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Facturas FFD',
                data: InfoMixtos.FFD.Facturas,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoCantidad = null;
let ChartMixtoCantidad = new Chart();
const InitGrafMixtoCantidad = () => {

    ChartMixtoCantidad.destroy();

    ctxMixtoCantidad = document.getElementById('ChartMixtoCantidad');
    ChartMixtoCantidad = new Chart(ctxMixtoCantidad, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Cantidad VP',
                data: InfoMixtos.VP.Cantidad,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Cantidad FFD',
                data: InfoMixtos.FFD.Cantidad,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoMtoXVenta = null;
let ChartMixtoMtoXVenta = new Chart();
const InitGrafMixtoMtoXVenta = () => {

    ChartMixtoMtoXVenta.destroy();

    ctxMixtoMtoXVenta = document.getElementById('ChartMixtoMtoXVenta');
    ChartMixtoMtoXVenta = new Chart(ctxMixtoMtoXVenta, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Monto VP',
                data: InfoMixtos.VP.MtoXVenta,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Monto FFD',
                data: InfoMixtos.FFD.MtoXVenta,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoFallasCant = null;
let ChartMixtoFallasCant = new Chart();
const InitGrafMixtoFallasCant = () => {

    ChartMixtoFallasCant.destroy();

    ctxMixtoFallasCant = document.getElementById('ChartMixtoFallasCant');
    ChartMixtoFallasCant = new Chart(ctxMixtoFallasCant, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Fallas Items VP',
                data: InfoMixtos.VP.ItemsFalla,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Fallas Items FFD',
                data: InfoMixtos.FFD.ItemsFalla,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}


let ctxMixtoFallasMonto = null;
let ChartMixtoFallasMonto = new Chart();
const InitGrafMixtoFallasMonto = () => {

    ChartMixtoFallasMonto.destroy();

    ctxMixtoFallasMonto = document.getElementById('ChartMixtoFallasMonto');
    ChartMixtoFallasMonto = new Chart(ctxMixtoFallasMonto, {
        type: 'line',
        data: {
            labels: InfoMixtos.Periodo,
            datasets: [{
                label: 'Fallas Monto VP',
                data: InfoMixtos.VP.CostoFalla,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Fallas Monto FFD',
                data: InfoMixtos.FFD.CostoFalla,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}
