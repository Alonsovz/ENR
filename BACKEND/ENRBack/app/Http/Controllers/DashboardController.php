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
        where feApa.num_suministro =dg.num_suministro
        group by fr.descripcion_red_electrica
        ");

        return response()->json($getDatos);
    }
}