<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use LynX39\LaraPdfMerger\Facades\PdfMerger;
use Session;

date_default_timezone_set("America/El_Salvador");

class DashboardController extends Controller
{
    public function getCuadroAcumulado(){

        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoCuadroAcumulado]");
 
 
        $getDatos = DB::connection('facturacion')->select(
            "select periodo, str(enrKwhPeriodo,12,3) as enrKwhPeriodo,
            str(cobroPeriodo,12,2) as cobroPeriodo,
            str(cobroAcumulado,12,2) as cobroAcumulado
            from enr_totalAcumulado order by 1 asc");
             
  
        return response()->json($getDatos);
    }

    public function getTotalCuadroAcumulado(){
        $getDatos = DB::connection('facturacion')->select(
            "select str(sum(enrKwhPeriodo),12,3) as enrKwhPeriodo,
            str(sum(cobroPeriodo),12,2) as cobroPeriodo,
            str(sum(cobroAcumulado),12,2) as cobroAcumulado
            from enr_totalAcumulado");
             
  
        return response()->json($getDatos);
    }


    public function getPagosENR(){
        $getDatos =  DB::connection('facturacion')->select("
            select CONVERT(char(2), cast(dg.fechaCreacion as datetime), 101) 
            +''+convert(varchar,year(dg.fechaCreacion)) as periodo, sum(tp.totalPagar) as pagos
            from enr_datosgenerales dg
            inner join enr_totalpagos tp on tp.casoENR = dg.id
            where dg.estado = 3 and dg.idEliminado = 1 and tp.totalPagar > 0
            group by CONVERT(char(2), cast(dg.fechaCreacion as datetime), 101) 
            +''+convert(varchar,year(dg.fechaCreacion))
        ");

        return response()->json($getDatos);
    }


    public function getCasosRed(){
        $getDatos =  DB::connection('facturacion')->select("
        select fr.descripcion_red_electrica as red_electrica, count(dg.id) as casos from fe_suministros fes
        inner join enr_datosGenerales dg on dg.num_suministro = fes.num_suministro
        inner join fe_aparatos feApa on feApa.num_suministro = fes.num_suministro
        inner join EDESAL_CALIDAD.dbo.ens_transformadores as feTran on feTran.codigo_trafo = feApa.codigo_elemento
         inner join EDESAL_CALIDAD.dbo.fe_red_maestro_redes as fr on fr.codigo_red_electrica = feTran.codigo_red
        where feApa.num_suministro =dg.num_suministro and feApa.bandera_activo = 1
        and dg.idEliminado = 1
        group by fr.descripcion_red_electrica
        ");

        return response()->json($getDatos);
    }

    public function getCasosIng(){

        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoCuadroAcumulado]");
 
 
        $getDatos = DB::connection('facturacion')->select(
            "select count(id) as ing from enr_datosGenerales where idEliminado = 1 and estado = 1");
             
  
        return response()->json($getDatos);
    }


    public function getCasosCalc(){

        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoCuadroAcumulado]");
 
 
        $getDatos = DB::connection('facturacion')->select(
            "select count(id) as calc from enr_datosGenerales where idEliminado = 1 and estado = 2");
             
  
        return response()->json($getDatos);
    }


    public function getCasosNoti(){

        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoCuadroAcumulado]");
 
 
        $getDatos = DB::connection('facturacion')->select(
            "select count(id) as noti from enr_datosGenerales where idEliminado = 1 and estado = 3");
             
  
        return response()->json($getDatos);
    }


    public function getCasosEl(){

        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoCuadroAcumulado]");
 
 
        $getDatos = DB::connection('facturacion')->select(
            "select count(id) as el from enr_datosGenerales where idEliminado = 2 ");
             
  
        return response()->json($getDatos);
    }

}