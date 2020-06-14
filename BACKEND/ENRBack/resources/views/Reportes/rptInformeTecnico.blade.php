@foreach($data as $dat)

<table style="margin-left:10px;margin-right:10px;">
    <thead>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>Fecha:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;">
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

<br>
<table style="margin-left:10px;margin-right:10px;">
    <thead>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>Asunto:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> 
            Informe Técnico de Condición encontrada Medidor defectuoso por fallas internas.</th>
        </tr>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>Ref:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;">
            ENR-<?php 
            $fecha = new DateTime('now', new DateTimeZone('America/El_Salvador'));
            echo $fecha->format('d').$fecha->format('m');
            ?>-{{$dat->nCaso}} </th>
        </tr>
        <tr>
            <th style="font-size:14px;text-align:left;"><b>N° Caso ENR:</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> {{$dat->nCaso}} </th>
        </tr>
    </thead>
</table>
<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">Estimado(a) usuario(a):</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Le informamos que en fecha <b>{{$dat->fechaRegularizacion}}</b> se realizó visita inspección técnica a su medidor
levantando acta en donde se detalla que el equipo de medición no se encontraba registrando
la energía consumida de forma correcta. </p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
<b>Se detectó la siguiente irregularidad:</b> Se detecto que en el medidor número <b>{{$dat->medidor}}</b> existía
una condición irregular a consecuencia de encontrar medidor con línea directa que no pasaba por medición,
se evaluaron lecturas posterior a la eliminación de la irregularidad, encontrando una lectura de L-1153
con fecha <b>06/04/2020</b>.
</p>


<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Establecido lo anterior, debe mencionarse que la estimación de la energía consumida y no registrada, se
realizará en base a Términos y Condiciones del pliego tarifario y del Procedimiento para investigar la
existencia de condiciones irregulares en el suministro de energía eléctrica del usuario final”,
estableciendo dicha normativa que una vez acreditado que el usuario ha cometido una irregularidad-alteración
en la acometida para evitar el registro correcto del consumo de energía eléctrica, el marco regulatorio
habilita al distribuidor a recuperar el valor de la energía consumida y no registrada. 
</p>


<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
<b>Base de Determinación de Energía consumida no registrada:</b></p>

<table style="margin-left:10px;margin-right:10px;">
<thead>
    <tr>
        <th style="font-size:14px;text-align:center;" valign="top"><b>1.</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> 
        Se procederá con la estimación del consumo real del usuario durante el periodo que subsistió la 
        irregularidad, se estimará el consumo correcto mediante la metodología de cálculo: 
        <b>{{$dat->resultado}}</b>.
        </th>
    </tr>
</thead>
</table>

<p style="font-size:14px;margin-left:10px;margin-right:10px;">
El siguiente informe contiene lo siguiente: <br>

<b>1.</b>&nbsp;&nbsp;Los registros históricos de facturación.<br>
<b>2.</b>&nbsp;&nbsp;Ordenes de servicio relacionadas con la detección de la condición irregular.<br>
<b>3.</b>&nbsp;&nbsp;Fotografías de la Condición encontrada.<br><br>


Para mayor información puede llamar al teléfono 2441-7019; 2345-6601 ó visitarnos en la agencia EDESAL más cercana.
<br><br>
Sin otro particular aprovecho la oportunidad para saludarle y suscribirme.
<br><br>
Atentamente.
<br><br><br><br><br><br><br>
Área de Control de Incidencias ENR
<br><br>
EDESAL, S.A. DE C.V.
</p>

@endforeach