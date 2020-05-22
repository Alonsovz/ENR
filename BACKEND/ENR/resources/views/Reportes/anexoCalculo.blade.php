
        <table>
            <thead>
                <tr>
                    <th style="margin-left:10px;">
                        <img  src="C:\xampp\htdocs\ENR\backend\ENR\public\images\logo1Anexo.png"
                        style="width: 80px; height: 80px">
                    </th>
                    <th >
                        <b style="margin-left:420px; font-size:14px;">
                            <?php

                                $nombresDias = array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" );
                                $nombresMeses = array(1=>"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");


                                $fecha = new DateTime('now', new DateTimeZone('America/El_Salvador'));

                                $nombreDia = $nombresDias[$fecha->format("w")];
                                $nombreMes = $nombresMeses[$fecha->format("n")];
                                $numeroDia = $fecha->format("j");
                                $anyo = $fecha->format("Y");


                                echo $nombreDia.' , '.$numeroDia.' de '.$nombreMes.' de '.$anyo.' ';
                            ?>
                        </b>
                    </th>
                </tr>
            </thead>
        
        </table>
        <h3 style="text-align:center;">CÁLCULO DE ENERGíA NO REGISTRADA (ENR)</h3>
        @foreach($data as $dat)
        <table style="font-weight:normal; font-size:14px;">
            <thead>
                <tr>
                    <th style="text-align:right;">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Nombre del usuario:</th>
                    <th style="font-weight:normal; font-size:14px;text-align:left;">       
                         {{$dat->cliente}}
                    </th>
                </tr>

                <tr>
                    <th style="text-align:right;">NIS:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->nis}}
                    </th>
                </tr>

                <tr>
                    <th style="text-align:right;">Base de Cálculo:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->resultado}}
                    </th>
                </tr>
            </thead>
        </table>

        <table style="margin-left:10px;margin-right:10px;margin-top:20px; border: 1px solid black; width:100%;
        border-collapse: separate;border-spacing: 12px;">
            <thead>
                <tr>
                    <th style="font-size:14px;margin-left:100px;text-align:right;"> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    NIS: </th>
                    <th style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->nis}}
                    </th>

                    <th style=" margin-left: 100px;font-size:14px;text-align:right;">Cliente: </th>
                    <th style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->cliente}}
                    </th>


                </tr>
     
                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Resultado:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->resultado}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Fecha de corrección de la Irregularidad:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->fechaRegularizacion}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Dias de Histórico:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->diasHistorico}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Consumo Diario (Kwh):</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->consumoDiario}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Dias a Cobrar:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->diasCobrar}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Fecha Inicio Cobro:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->fechaInicio}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Fecha Fin Cobro:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->fechaFin}}
                    </th>
                </tr>

                <tr>

                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Consumo Estimado (Kwh):</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->consumoEstimado}}
                    </th>
                </tr>

                <tr>

                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Consumo Registrado (kwh):</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->consumoRegistrado}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Consumo ENR (Kwh):</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->consumoENR}}
                    </th>
                </tr>

                <tr>

                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Cargo por Distribución:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->montoDistribucion}}
                    </th>
                </tr>

                <tr>

                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Cargo por Energía:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->montoEnergia}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Costo de Equipo de Medición:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    {{$dat->cobroEquipo}}
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">Sub Total:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    <b>{{$dat->subtotal}}</b>
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">IVA	:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    <b>{{$dat->iva}}</b>
                    </th>
                </tr>

                <tr>
                    <th colspan="3" style="font-size:14px;text-align:right;margin-top:20px;">TOTAL:</th>
                    <th  style="font-weight:normal; font-size:14px;text-align:left;">
                    <b>{{$dat->total}}</b>
                    </th>
                </tr>

                
            </thead>
        </table>

        @endforeach

        <br><br><br>
        <h4 style="text-align:center;font-weight:normal;">
            Para mayor información puede llamar al suscrito al teléfono 2345-6601 ó  de igual manera
            puede acercarse a nuestras oficinas ubicadas en Ciudad Real, Ciudad Versailles, San Miguel o Metropoli San Gabriel.
            <br>
            Sin otro particular aprovecho la oportunidad para saludarle y suscribirme.
            <br>
            Atentamente,
        </h4>

        <h4 style="text-align:center;">
        Empresa Distribuidora Eléctrica Salvadoreña, S.A. de C.V.<br>
        EDESAL, S.A. DE C.V.
        </h4>