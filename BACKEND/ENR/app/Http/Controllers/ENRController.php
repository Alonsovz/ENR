<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;


date_default_timezone_set("America/El_Salvador");

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
        convert(varchar(10), feOr.fecha_resolucion, 103) as fechaRes,
        (select count(id) from enr_documentacionOT where correlativoOrden =
        feOr.numero_orden and idEliminado = 1) as adjuntos
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
                         'scanPrimerNoti' => substr($adScanNoti,12),
                         'fechaRegularizacion'=>$fecha2Regula,
                         'codigoTipoENR'=>$codTipoENR,
                         'codigoTipoMet'=>$codTipoMetENR,
                         'fechaInicio'=>$fecha3Inicio,
                         'fechaFin'=>$fecha4Fin,
                         'diasCobro'=>$diasCobro,
                         'usuario_creacion'=>$usuario_creacion,
                         'estado'=>1,
                         'idEliminado'=>1,
                         'fechaCreacion'=>date('Ymd H:i:s'),
                         ]);


        return response()->json($insertar);

    }

    public function saveDocProbatoria(Request $request){
        $doc = json_encode($request["documentacion"]);
        $usuario_creacion = 151;
        $documentacion = json_decode($doc);
       
        $contador = 0;
        
        $ultimoCaso = DB::connection('facturacion')->table('enr_DatosGenerales')
        ->select('enr_DatosGenerales.id')->orderBy('enr_DatosGenerales.id','desc')->first();


        foreach($documentacion as $docSave){
            $insertar =  DB::connection('facturacion')->table('enr_Documentacion')
                         ->insert([
                        'idCasoENR' => $ultimoCaso->id ,
                         'titulo' => $docSave->nombreDoc,
                         'tipo' => $docSave->tipoPrueba,
                         'ruta' => $docSave->archivo,
                         'fechaCreacion'=>date('Ymd H:i:s'),
                         'idEliminado'=>1,
                         'usuarioCreacion'=>$usuario_creacion,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($documentacion)){
        return response()->json("ok");
       }
       
        
    }


    public function saveDocOT(Request $request){
        $doc = json_encode($request["documentacionOrden"]);

        $documentacion = json_decode($doc);
       
        $contador = 0;
        $usuario_creacion = 151;

      
      
        foreach($documentacion as $docSave){
          $insertar =  DB::connection('facturacion')->table('enr_DocumentacionOT')
                       ->insert([
                      'correlativoOrden' => $docSave->ordenN ,
                       'tipo' => $docSave->tipoAdjuntoOrden,
                       'ruta' => $docSave->file,
                       'fechaCreacion'=>date('Ymd H:i:s'),
                       'titulo'=>$docSave->nombreDocOrden,
                       'idEliminado'=>1,
                       'usuarioCreacion'=>$usuario_creacion,
                       ]);
            $contador++;
        }     
        
        
       if($contador == count($documentacion)){
        return response()->json("ok");
       }
       
        
    }


    public function getRepositorioIngresados(){
        $getDatos =  DB::connection('facturacion')->select("
        select dg.id as caso, dg.num_suministro as nis, dg.scanPrimerNoti as ruta,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join comanda_db.dbo.users u on u.id = dg.usuario_creacion
        where dg.idEliminado = 1 and dg.estado = 1
        ");


        return response()->json($getDatos);
    }

    public function getRepositorioCalculados(){
        $getDatos =  DB::connection('facturacion')->select("
        select dg.id as caso, dg.num_suministro as nis,dg.scanPrimerNoti as ruta,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join comanda_db.dbo.users u on u.id = dg.usuario_creacion
        where dg.idEliminado = 1 and dg.estado = 2
        ");


        return response()->json($getDatos);
    }


    public function getRepositorioNotificados(){
        $getDatos =  DB::connection('facturacion')->select("
        select dg.id as caso, dg.num_suministro as nis,dg.scanPrimerNoti as ruta,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join comanda_db.dbo.users u on u.id = dg.usuario_creacion
        where dg.idEliminado = 1 and dg.estado = 3
        ");


        return response()->json($getDatos);
    }


    public function moveDoc(Request $request){
    
      
        $file = $request->file('file');

        $nombreoriginal = $file->getClientOriginalName();
        $file->move('files/',(string)$nombreoriginal);

        return response()->json($nombreoriginal);
      
      

    }


    public function getAdjuntosOrdenes(Request $request){
        $codigo = $request["orden"];

        $getDatos =  DB::connection('facturacion')->select("
        select d.titulo as titulo, d.tipo as tipo,
        d.id as id,
        d.correlativoOrden as orden,
        d.ruta as ruta,
        convert(varchar(10),d.fechaCreacion,103) as fechaCreacion,
        u.alias as creador,RIGHT(d.ruta,3) as ext
        from enr_documentacionOT d
        inner join comanda_db.dbo.users u on u.id = d.usuarioCreacion
        where d.idEliminado = 1 and d.correlativoOrden = ?
        ",[$codigo]);


        return response()->json($getDatos);
    }


    public function descargarArchivo(Request $request){

        $file = $request["ruta"];

        if(file_exists(public_path('files/'.$file))){
            return response()->download(public_path('files/'.$file));
        }else{
            return response()->json('Archivo no encontrado');
        }
        
    }


    public function eliminarArchivo(Request $request){

        $file = $request["rutaEliminar"];
        $id = $request["idEliminar"];
        $user = 151;
        
        $delete =  DB::connection('facturacion')->table('enr_documentacionOT')->where('id', $id)
                         ->update([
                             'idEliminado' => 2,
                              'usuario_borrado' => $user,
                              'fechaBorrado' => date('Ymd H:i:s'),
                         ]);

        unlink(public_path('files/'.$file));
        
    }

    
    public function eliminarArchivoENR(Request $request){

        $file = $request["rutaEliminar"];
        $id = $request["idEliminar"];
        $user = 151;
        
        $delete =  DB::connection('facturacion')->table('enr_documentacion')->where('id', $id)
                         ->update([
                             'idEliminado' => 2,
                              'usuario_borrado' => $user,
                              'fechaBorrado' => date('Ymd H:i:s'),
                         ]);

        unlink(public_path('files/'.$file));
        
    }


    public function getAdjuntosOrdenesENR(Request $request){
        $codigo = $request["caso"];

        $getDatos =  DB::connection('facturacion')->select("
        select distinct d.titulo as titulo, d.tipo as tipo,
        d.id as id,
        d.ruta as ruta,
        convert(varchar(10),d.fechaCreacion,103) as fechaCreacion,
        u.alias as creador,RIGHT(d.ruta,3) as ext,
        dg.id as caso, dg.num_suministro as nis,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR
        from enr_documentacion d
        inner join comanda_db.dbo.users u on u.id = d.usuarioCreacion
        inner join enr_datosGenerales dg on dg.id = d.idCasoENR
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        where d.idEliminado = 1 and d.idCasoENR = ?
        ",[$codigo]);


        return response()->json($getDatos);
    }

    public function getDatosENR(Request $request){
        $codigo = $request["caso"];

        $getDatos =  DB::connection('facturacion')->select("
        select *, 
        scanPrimerNoti as ruta,
        RIGHT(scanPrimerNoti,3) as ext,
        convert(varchar(10),fechaPrimerNoti,23) as fechaPri,
        convert(varchar(10),fechaRegularizacion,23) as fechaR,
        convert(varchar(10),fechaInicio,23) as fechaIn,
        convert(varchar(10),fechaFin,23) as fechaFin,
        convert(varchar,fechaCreacion, 103)+' '+substring(convert(varchar,fechaCreacion, 114),1,5) as fechaCreacionF
        from enr_datosGenerales
        where idEliminado = 1 and id =?
        ",[$codigo]);
        return response()->json($getDatos);
    }

    public function cambiarScanENR(Request $request){

        $file = $request["nuevoScanENR"];
        $id = $request["idCambio"];
        $fileViejo = $request["rutaVieja"];
        
        $delete =  DB::connection('facturacion')->table('enr_datosGenerales')->where('id', $id)
                         ->update([
                             'scanPrimerNoti' => substr($file,12),
                         ]);

       unlink(public_path('files/'.$fileViejo));
       //return response()->json();
    }

    

    public function getScan(Request $request){
        $codigo = $request["caso"];

        $getDatos =  DB::connection('facturacion')->select("
        select *, 
        id as caso,
        scanPrimerNoti as ruta,
        RIGHT(scanPrimerNoti,3) as ext,
        convert(varchar(10),fechaPrimerNoti,23) as fechaPri,
        convert(varchar(10),fechaRegularizacion,23) as fechaR,
        convert(varchar(10),fechaInicio,23) as fechaIn,
        convert(varchar(10),fechaFin,23) as fechaFin,
        convert(varchar,fechaCreacion, 103)+' '+substring(convert(varchar,fechaCreacion, 114),1,5) as fechaCreacionF
        from enr_datosGenerales
        where idEliminado = 1 and id =?
        ",[$codigo]);
        return response()->json($getDatos);
    }



    public function updateDatosNISGenerales(Request $request){
        $id = $request["caso"];
        $nNotificacion = $request["nNotificacion"];
        $fechaPrimeraNoti = $request["fechaPrimeraNoti"];
       // $adScanNoti = $request["adScanNoti"];
        $fechaRegular = $request["fechaRegular"];
        $codTipoENR = $request["codTipoENR"];
        $codTipoMetENR = $request["codTipoMetENR"];
        $fechaInicioENR = $request["fechaInicioENR"];
        $fechaFinENR = $request["fechaFinENR"];
        $diasCobro = $request["diasCobro"];
        //$usuario_creacion = 151;

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

        $update =  DB::connection('facturacion')->table('enr_DatosGenerales')
        ->where('id', $id)
        ->update([
                    
                         'nNotiENR' => $nNotificacion,
                         'fechaPrimerNoti' => $fecha1Noti,
                         'fechaRegularizacion'=>$fecha2Regula,
                         'codigoTipoENR'=>$codTipoENR,
                         'codigoTipoMet'=>$codTipoMetENR,
                         'fechaInicio'=>$fecha3Inicio,
                         'fechaFin'=>$fecha4Fin,
                         'diasCobro'=>$diasCobro,
                         'estado'=>1,
                         'idEliminado'=>1,
                         ]);


        return response()->json($update);

    }

    public function updateDocProbatoria(Request $request){
        
       
        $doc = json_encode($request["documentacion"]);
        $usuario_creacion = 151;
        $documentacion = json_decode($doc);
       
        $contador = 0;
        
        $ultimoCaso = DB::connection('facturacion')->table('enr_DatosGenerales')
        ->select('enr_DatosGenerales.id')->orderBy('enr_DatosGenerales.id','desc')->first();


        foreach($documentacion as $docSave){
            $insertar =  DB::connection('facturacion')->table('enr_Documentacion')
                         ->insert([
                        'idCasoENR' => $docSave->caso ,
                         'titulo' => $docSave->nombreDoc,
                         'tipo' => $docSave->tipoPrueba,
                         'ruta' => $docSave->archivo,
                         'fechaCreacion'=>date('Ymd H:i:s'),
                         'idEliminado'=>1,
                         'usuarioCreacion'=>$usuario_creacion,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($documentacion)){
        return response()->json("ok");
       }
    }
}
