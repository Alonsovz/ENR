@foreach($data as $dat)

<table>
    <thead>
        <tr>
            <th style="margin-left:10px;width:440px !important;text-align:left;">
                <img  src="C:\xampp\htdocs\ENR\backend\ENRBack\public\images\logo2.png"
                style="width: 250px; height: 90px;">
                </th>
            <th style="font-size:14px;text-align:right;font-weight:normal;">
                {{$dat->municipio}},
                <?php

                    $nombresDias = array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" );
                    $nombresMeses = array(1=>"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");


                    $fecha = new DateTime('now', new DateTimeZone('America/El_Salvador'));

                    $nombreDia = $nombresDias[$fecha->format("w")];
                    $nombreMes = $nombresMeses[$fecha->format("n")];
                    $numeroDia = $fecha->format("j");
                    $anyo = $fecha->format("Y");


                    echo ''.$numeroDia.' de '.$nombreMes.' de '.$anyo.' ';
                ?>
            </th>
            </tr>
    </thead>

</table>

<br>
<table style="margin-left:10px;margin-right:10px;">
    <thead>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>Atención:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> {{$dat->cliente}} </th>
        </tr>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>NIS:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> {{$dat->nis}} </th>
        </tr>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>Dirección:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> {{$dat->direccion }} </th>
        </tr>
    </thead>
</table>




<p align="justify" style="font-size:14px;margin-left:400px;margin-right:10px;">
<b>Asunto:</b>
Notificación de Cobro ENR.
<br>
<b>Ref:</b>
    ENR-<?php 
    $fecha = new DateTime('now', new DateTimeZone('America/El_Salvador'));
    echo $fecha->format('d').$fecha->format('m');
    ?>-{{$dat->nCaso}}
</p>
<br>
<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">Estimado(a) usuario(a):</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Le informamos que en fecha <b>{{$dat->fechaRegularizacion}}</b> se realizó visita inspección técnica a su medidor
levantando acta en donde se detalla que el equipo de medición no se encontraba registrando
la energía consumida de forma correcta. </p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
<b>Se detectó la siguiente irregularidad:</b> Se detecto que en el medidor número <b>{{$dat->medidorCarta}}</b> existía una 
condición irregular a consecuencia de encontrar:<br>
<b>Tipo de caso ENR:</b> {{$dat->codigoENR}}<br>
<b>Base de Cálculo:</b> {{$dat->resultado}}<br>
<b>Detalle de la situación encontrada:</b> {{$dat->irregularidades}}<br>
</p>


<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Por dicha razón, hemos procedido a calcularle la energía no registrada, la cual asciende a:
    <br> <b>Consumo ENR: </b>  {{$dat->consumoENR}} kwh
    <br> <b>Total cargo ENR: </b> $ {{$dat->total}} 
    <br> <b>Fecha incio del cobro: </b> $ {{$dat->fechaInicio}} 
    <br> <b>Fecha fin del cobro: </b> $ {{$dat->fechaFin}}
    <br><br>
Dicho periodo y cálculo se estima de acuerdo con lo que establece el “Procedimiento para investigar
la existencia de condiciones irregulares en el suministro de energía eléctrica del usuario final”
</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Por las razones antes expuestas le solicitamos contactarse con EDESAL, a fin de realizar el pago de 
dicho monto, como también informarle sobre las diferentes opciones de pago que pueden aplicarse;
 caso contrario se le cargara en su totalidad en su próxima facturación de energía mensual.						
</p>


<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Para mayor información puede llamar al teléfono 2441-7019; 2345-6601 ó visitarnos en la agencia
EDESAL más cercana.												
</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Sin otro particular aprovecho la oportunidad para saludarle y suscribirme.												
</p>


<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Atentamente.												
</p>

<br><br><br><br><br>
<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Área de Control de Incidencias ENR<br>
EDESAL, S.A. DE C.V.												
</p>



@endforeach