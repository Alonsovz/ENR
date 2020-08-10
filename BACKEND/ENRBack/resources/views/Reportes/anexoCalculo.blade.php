
        <table>
            <thead>
                <tr>
                    <th style="margin-left:10px;">
                        <img  src="C:\xampp\htdocs\ENR\backend\ENRBack\public\images\logo1Anexo.png"
                        style="width: 80px; height: 80px">
                        </th>
                    <th >
                        <b style="margin-left:400px; font-size:13px;">
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
        <h3 style="text-align:center;">CÁLCULO DE ENERGíA NO REGISTRADA (ENR)</h3><br><br>
        @foreach($data as $dat)
        <table style="font-weight:normal; font-size:13px;">
            <thead>
                <tr>
                    <th style="text-align:right;">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Nombre del usuario:</th>
                    <th style="font-weight:normal; font-size:13px;text-align:left;">       
                         {{$dat->cliente}}
                    </th>
                </tr>

                <tr>
                    <th style="text-align:right;">NIS:</th>
                    <th  style="font-weight:normal; font-size:13px;text-align:left;">
                    {{$dat->nis}}
                    </th>
                </tr>

                <tr>
                    <th style="text-align:right;">Base de Cálculo:</th>
                    <th  style="font-weight:normal; font-size:13px;text-align:left;">
                    {{$dat->resultado}}
                    </th>
                </tr>
            </thead>
        </table>

        <table style="margin-left:10px;margin-right:10px; margin-top:30px; border: 1px solid black; width:100%;
        border-collapse: separate;border-spacing: 12px;">
        
            <tbody>
            <tr>
                            <td style="text-align:center !important;font-weight:bold; font-size:15px;"> Datos ENR</td>
                            <td style="text-align:center !important;font-weight:bold; font-size:15px;"> Datos de Cobro</td>
            </tr>
                <tr>
                 <td>
                 <table>
                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Corrección de irregularidad:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->fechaRegularizacion}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Dias de Histórico:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->diasHistorico}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Dias a Cobrar:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->diasCobrar}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Fecha Inicio Cobro:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->fechaInicio}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Fecha Fin Cobro:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->fechaFin}}
                            </td>
                        </tr>

                        <tr>

                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Consumo Estimado (Kwh):</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->consumoEstimado}}
                            </td>
                        </tr>

                        <tr>

                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Consumo Registrado (kwh):</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->consumoRegistrado}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;font-weight:bold; text-align:right !important">Consumo ENR (Kwh):</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->consumoENR}}
                            </td>
                        </tr>
                </table>
 
                 </td>
                   

                 <td style="margin-top:-35px !important;">
                    <table>
                        <tr>
                            <td colspan="3" style="font-size:13px;margin-top:-100px;text-align:right;font-weight:bold">Cargo por Distribución:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->montoDistribucion}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="font-size:13px;text-align:right;font-weight:bold">Cargo por Energía:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->montoEnergia}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;text-align:right;font-weight:bold">Equipo de Medición:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            {{$dat->cobroEquipo}}
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;text-align:right;font-weight:bold">Sub Total:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            <b>{{$dat->subtotal}}</b>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;text-align:right;font-weight:bold">IVA	:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            <b>{{$dat->iva}}</b>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3" style="font-size:13px;text-align:right;font-weight:bold">TOTAL:</td>
                            <td  style="font-weight:normal; font-size:13px;text-align:left;">
                            <b>{{$dat->total}}</b>
                            </td>
                        </tr>
                    </table>
 
                 </td>
                </tr>
            </tbody>
        </table>

        @endforeach

        <br>
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