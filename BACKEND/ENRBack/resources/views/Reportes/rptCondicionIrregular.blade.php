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
Informe Técnico de Condición irregular encontrada.
<br>
<b>Ref:</b>
    ENR-<?php 
    $fecha = new DateTime('now', new DateTimeZone('America/El_Salvador'));
    echo $fecha->format('d').$fecha->format('m');
    ?>-{{$dat->nCaso}}
</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">Estimado(a) usuario(a):</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
Reciba un saludo de parte de la Empresa Distribuidora Eléctrica Salvadoreña, S.A. de CV.,
deseándole al mismo tiempo éxitos en las actividades que desempeña.</p>

<p align="justify" style="font-size:14px;margin-left:10px;margin-right:10px;">
<b>Irregularidad encontrada en su suministro:</b> Se detectó que en el medidor número <b>{{$dat->medidor}}</b> existía
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
<b>Base de Determinación de Energía consumida no registrada:</b><br>
Se evaluará el consumo no registrando en función del caso que resulte más conveniente para el usuario:</p>
<table style="margin-left:10px;margin-right:10px;">
<thead>
    <tr>
        <th style="font-size:14px;text-align:center;" valign="top"><b>1.</b></th>
            <th style="font-size:14px;text-align:left;font-weight:normal;"> 
        Se procederá con la estimación del consumo real del usuario durante el periodo que subsistió la 
        irregularidad, se estimará el consumo correcto en base a los registros de lecturas posterior a
         la eliminación de la irregularidad detectada.
        </th>
    </tr>
</thead>
</table>

<p style="font-size:14px;margin-left:10px;margin-right:10px;">
El siguiente informe contiene lo siguiente: <br>

<b>1.</b>&nbsp;&nbsp;Los registros históricos de facturación.<br>
<b>2.</b>&nbsp;&nbsp;Órdenes de servicio relacionadas con la detección de la condición irregular.<br>
<b>3.</b>&nbsp;&nbsp;Fotografías de la Condición encontrada.
<br>

Para mayor información puede llamar al teléfono 2441-7019; 2345-6601 ó visitarnos en la agencia EDESAL más cercana.
<br>
Sin otro particular aprovecho la oportunidad para saludarle y suscribirme.
<br>
Atentamente.
<br><br><br><br><br><br><br>
Área de Control de Incidencias ENR
<br><br>
EDESAL, S.A. DE C.V.
</p>


@endforeach