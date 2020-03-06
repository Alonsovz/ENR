<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;

class ENRController extends Controller
{
    public function getCodigoENR(){
        $codigos = DB::connection('facturacion')->select("
        select id, codigoTipo,TipoENR,tiempoRetroactivo from enr_gestionTipoEnr
         where idEliminado = 1 order by id desc
        ");


        return response()->json($codigos);
    }
    
    public function getMetodologiaCalc(){
        $codigos = DB::connection('facturacion')->select("
        select id, codigo,TipoENR,tipoEdesal from enr_metodologiaCalc where idEliminado = 1
        ");


        return response()->json($codigos);
    }

    public function saveCodigos(Request $request){
        $codigo = $request["codigoTipo"];
        $tipoENR = $request["tipoENR"];
        $tiempo = $request["tiempoRetroactivo"];


        $insertar =  DB::connection('facturacion')->table('enr_gestionTipoEnr')
                         ->insert(['codigoTipo' => "$codigo" , 'TipoENR' => $tipoENR,
                         'tiempoRetroactivo' => $tiempo,'idEliminado' => 1
                         ]);


        return response()->json($insertar);

    }




    public function updateCodigos(Request $request){
        $id = $request["id"];
        $codigo = $request["codigoTipo"];
        $tipoENR = $request["TipoENR"];
        $tiempo = $request["tiempoRetroactivo"];


        $editar =  DB::connection('facturacion')->table('enr_gestionTipoEnr')->where('id', $id)
                         ->update(['codigoTipo' => "$codigo" , 'TipoENR' => $tipoENR,
                         'tiempoRetroactivo' => $tiempo
                         ]);


        return response()->json($editar);

    }


    public function deleteCodigos(Request $request){
        $id = $request["id"];


        $delete =  DB::connection('facturacion')->table('enr_gestionTipoEnr')->where('id', $id)
                         ->update(['idEliminado' => 2
                         ]);


        return response()->json($delete);

    }
    

    public function saveMetodologia(Request $request){
        $codigo = $request["codigo"];
        $tipoENR = $request["TipoENR"];
        $tipo = $request["tipoEdesal"];


        $insertar =  DB::connection('facturacion')->table('enr_metodologiaCalc')
                         ->insert(['codigo' => "$codigo" , 'tipoENR' => $tipoENR,
                         'tipoEdesal' => $tipo,'idEliminado' => 1
                         ]);


        return response()->json($insertar);

    }


    public function updateMetodologia(Request $request){
        $id = $request["id"];
        $codigo = $request["codigo"];
        $tipoENR = $request["TipoENR"];
        $tipo = $request["tipoEdesal"];


        $editar =  DB::connection('facturacion')->table('enr_metodologiaCalc')->where('id', $id)
                         ->update(['codigo' => "$codigo" , 'TipoENR' => $tipoENR,
                         'tipoEdesal' => $tipo
                         ]);


        return response()->json($editar);

    }


    public function deleteMetodologia(Request $request){
        $id = $request["id"];


        $delete =  DB::connection('facturacion')->table('enr_metodologiaCalc')->where('id', $id)
                         ->update(['idEliminado' => 2
                         ]);


        return response()->json($delete);

    }

    public function getDatosbyNIS(Request $request)
    {
        $nis = $request["nis"];

        $getDatos =  DB::connection('facturacion')->select("
        select distinct cli.nombres+ ' '+cli.apellidos as usuario,
        fes.num_suministro as num_suministro,
        fes.anexo_direccion as direccion,feMun.nombre_municipio as municipio,
        feCol.nombre_colonia as colonia,'' as red,fr.descripcion_red_electrica as red_electrica,
        feTran.codigo_trafo as trafo,
        feApa.numero_medidor as medidor from fe_suministros fes
        inner join fe_cliente as cli on cli.CODIGO_CLIENTE = fes.CODIGO_CLIENTE
        inner join fe_departamentos as feDep on feDep.codigo_departamento = fes.codigo_departamento         
        inner join fe_municipios as feMun on feMun.codigo_municipio = fes.codigo_municipio
        and feMun.codigo_departamento = feDep.codigo_departamento
        inner join fe_colonias feCol on feCol.codigo_colonia = fes.codigo_colonia
        and feCol.codigo_departamento = fes.codigo_departamento
        and feCol.codigo_municipio = fes.codigo_municipio
        and feCol.codigo_poblacion = fes.codigo_poblacion
        inner join fe_aparatos feApa on feApa.num_suministro = fes.num_suministro
        inner join EDESAL_CALIDAD.dbo.ens_transformadores as feTran on feTran.codigo_trafo = feApa.codigo_elemento
        inner join EDESAL_CALIDAD.dbo.fe_red_maestro_redes as fr on fr.codigo_red_electrica = feTran.codigo_red
        where (feApa.bandera_activo = 1) and (fes.estado = 'A')
        and (fes.num_suministro = ?)",[$nis]);


        return response()->json($getDatos);

    }


    public function getOrdenesbyNIS(Request $request){
        $nis = $request["nis"];

        $getDatos =  DB::connection('facturacion')->select("
        select distinct fe.descripcion_tipo_ordentrabajo as tipo,
        feOr.numero_orden as orden,
        feOr.usuario_asignacion as asignado,
        convert(varchar(10), feOr.fecha_asignacion, 103) as fechaAsig,
        feOr.comentario as descripcion,
        feOr.usuario_resolucion as resolucion,
        convert(varchar(10), feOr.fecha_resolucion, 103) as fechaRes
        from EDESAL_CALIDAD.dbo.fe_calidad_reclamos_ordenes as feOr
        inner join EDESAL_CALIDAD.dbo.fe_calidad_tipo_ordentrabajo as fe
        on fe.codigo_tipo_ordentrabajo = feOr.codigo_tipo_ordentrabajo
        where (estado = 'F') and (num_suministro = ?)",[$nis]);


        return response()->json($getDatos);
    }


    public function getDiasRetroactivos(Request $request){
        $codigo = $request["codTipoENR"];

        $getDias = DB::connection('facturacion')->select("select tiempoRetroactivo as diasRetro 
        from enr_gestionTipoEnr where idEliminado = 1 and (id = ?)",[$codigo]);

        return response()->json($getDias);
    }



    public function saveDatosNISGenerales(Request $request){
        $num_suministro = $request["num_suministro"];
        $nNotificacion = $request["nNotificacion"];
        $fechaPrimeraNoti = $request["fechaPrimeraNoti"];
        $adScanNoti = $request["adScanNoti"];
        $fechaRegular = $request["fechaRegular"];
        $codTipoENR = $request["codTipoENR"];
        $codTipoMetENR = $request["codTipoMetENR"];
        $fechaInicioENR = $request["fechaInicioENR"];
        $fechaFinENR = $request["fechaFinENR"];
        $diasCobro = $request["diasCobro"];
        $usuario_creacion = 151;

         //convertir fecha primer notificacion enr
        $fecha1 = date_create_from_format('Y-m-d',$fechaPrimeraNoti);

        $fecha1Noti = date_format($fecha1,'Ymd');

         //convertir fecha regularozación enr
        $fecha2 = date_create_from_format('Y-m-d',$fechaRegular);

        $fecha2Regula = date_format($fecha2,'Ymd');

         //convertir fecha inicio enr
        $fecha3 = date_create_from_format('Y-m-d',$fechaInicioENR);

        $fecha3Inicio = date_format($fecha3,'Ymd');

        //convertir fecha fin enr
        $fecha4 = date_create_from_format('Y-m-d',$fechaFinENR);

        $fecha4Fin = date_format($fecha4,'Ymd');

        $insertar =  DB::connection('facturacion')->table('enr_DatosGenerales')
                         ->insert([
                        'num_suministro' => $num_suministro ,
                         'nNotiENR' => $nNotificacion,
                         'fechaPrimerNoti' => $fecha1Noti,
                         'scanPrimerNoti' => $adScanNoti,
                         'fechaRegularizacion'=>$fecha2Regula,
                         'codigoTipoENR'=>$codTipoENR,
                         'codigoTipoMet'=>$codTipoMetENR,
                         'fechaInicio'=>$fecha3Inicio,
                         'fechaFin'=>$fecha4Fin,
                         'diasCobro'=>$diasCobro,
                         'usuario_creacion'=>$usuario_creacion,
                         'estado'=>1,
                         'idEliminado'=>2,
                         ]);


        return response()->json($insertar);

    }

}