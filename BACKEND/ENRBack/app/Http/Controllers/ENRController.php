<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use LynX39\LaraPdfMerger\Facades\PdfMerger;
use Session;

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
        $usuario_creacion = $request["idUsuario"];
        $datosAdicionales = $request["datosAdicionales"];
        $datosIrregulares = $request["datosIrregularidades"];

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
                         'datosAdicionales'=>$datosAdicionales,
                         'datosIrregulares'=>$datosIrregulares,
                         ]);


        return response()->json($insertar);

    }

    public function saveDocProbatoria(Request $request){
        $doc = json_encode($request["documentacion"]);
        $documentacion = json_decode($doc);
       
        $contador = 0;
        
        $ultimoCaso = DB::connection('facturacion')->table('enr_DatosGenerales')
        ->select('enr_DatosGenerales.id')->orderBy('enr_DatosGenerales.id','desc')->first();

        $user = DB::connection('facturacion')->table('enr_DatosGenerales')
        ->select('enr_DatosGenerales.usuario_creacion')->orderBy('enr_DatosGenerales.id','desc')->first();

        foreach($documentacion as $docSave){
            $insertar =  DB::connection('facturacion')->table('enr_Documentacion')
                         ->insert([
                        'idCasoENR' => $ultimoCaso->id ,
                         'titulo' => $docSave->nombreDoc,
                         'tipo' => $docSave->tipoPrueba,
                         'ruta' => $docSave->archivo,
                         'fechaCreacion'=>date('Ymd H:i:s'),
                         'idEliminado'=>1,
                         'usuarioCreacion'=>$user->usuario_creacion,
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

      
      
        foreach($documentacion as $docSave){
          $insertar =  DB::connection('facturacion')->table('enr_DocumentacionOT')
                       ->insert([
                      'correlativoOrden' => $docSave->ordenN ,
                       'tipo' => $docSave->tipoAdjuntoOrden,
                       'ruta' => $docSave->file,
                       'fechaCreacion'=>date('Ymd H:i:s'),
                       'titulo'=>$docSave->nombreDocOrden,
                       'idEliminado'=>1,
                       'usuarioCreacion'=>$docSave->idUsuario,
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
        m.codigo as codBase,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR,
        fes.codigo_tarifa as tarifa, dg.fechaInicio as fechaIn, dg.fechaFin as fechaFin from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join EDESAL_CALIDAD.dbo.SGT_Usuarios u on u.id = dg.usuario_creacion
        inner join fe_suministros fes on fes.num_suministro = dg.num_suministro
        where dg.idEliminado = 1 and dg.estado = 1
        ");


        return response()->json($getDatos);
    }

    public function getRepositorioCalculados(){
        $getDatos =  DB::connection('facturacion')->select("
        select dg.id as caso, dg.num_suministro as nis, dg.scanPrimerNoti as ruta,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR,t.codigoTipo as codigoTipoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        m.codigo as codBase,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR,
        fes.codigo_tarifa as tarifa, dg.fechaInicio as fechaIn, dg.fechaFin as fechaFin from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join EDESAL_CALIDAD.dbo.SGT_Usuarios u on u.id = dg.usuario_creacion
        inner join fe_suministros fes on fes.num_suministro = dg.num_suministro
        where dg.idEliminado = 1 and dg.estado = 2
        ");


        return response()->json($getDatos);
    }


    public function getRepositorioNotificados(){
        $getDatos =  DB::connection('facturacion')->select("
        select dg.id as caso, dg.num_suministro as nis, dg.scanPrimerNoti as ruta,
        dg.diasCobro as diasCobrar, u.alias as usuarioCreacion, 
        convert(varchar,dg.fechaCreacion, 103)+' '+substring(convert(varchar,dg.fechaCreacion, 114),1,5) as fechaCreacion,
        t.tipoENR as codigoENR, m.tipoENR as metodologiaENR ,dg.estado as estado,
        m.codigo as codBase,
        (select count(id) from enr_documentacion where idCasoENR =
        dg.id and idEliminado = 1) as adjuntos,
        dg.codigoTipoENR as codTipoENR,
        fes.codigo_tarifa as tarifa, dg.fechaInicio as fechaIn, dg.fechaFin as fechaFin from enr_datosGenerales dg
        inner join enr_gestionTipoENR t on t.id = dg.codigoTipoENR
        inner join enr_metodologiaCalc m on m.id = dg.codigoTipoMet
        inner join EDESAL_CALIDAD.dbo.SGT_Usuarios u on u.id = dg.usuario_creacion
        inner join fe_suministros fes on fes.num_suministro = dg.num_suministro
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
        inner join EDESAL_CALIDAD.dbo.SGT_Usuarios u on u.id = d.usuarioCreacion
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
       
        
        $delete =  DB::connection('facturacion')->table('enr_documentacionOT')->where('id', $id)
                         ->update([
                             'idEliminado' => 2,
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
        inner join EDESAL_CALIDAD.dbo.SGT_usuarios u on u.id = d.usuarioCreacion
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
        (select voltaje_energia from fe_suministros where num_suministro =
        enr_datosGenerales.num_suministro) as voltajeSuministro,
        scanPrimerNoti as ruta,
        RIGHT(scanPrimerNoti,3) as ext,
        convert(varchar(10),fechaPrimerNoti,23) as fechaPri,
        convert(varchar(10),fechaRegularizacion,23) as fechaR,
        convert(varchar(10),fechaInicio,23) as fechaIn,
        convert(varchar(10),fechaFin,23) as fechaFin,
        convert(varchar(10),fechaInicio,103) as fechaIni,
        convert(varchar(10),fechaFin,103) as fechaFini,
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
        $datosAdicionales = $request["datosAdicionales"];
        $datosIrregulares = $request["datosIrregularidades"];

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
                         'idEliminado'=>1,
                         'datosAdicionales'=>$datosAdicionales,
                         'datosIrregulares'=>$datosIrregulares,
                         ]);


        return response()->json($update);

    }

    public function updateDocProbatoria(Request $request){
        
       
        $doc = json_encode($request["documentacion"]);
        $documentacion = json_decode($doc);
       
        $contador = 0;
        
        $ultimoCaso = DB::connection('facturacion')->table('enr_DatosGenerales')
        ->select('enr_DatosGenerales.id')->orderBy('enr_DatosGenerales.id','desc')->first();


        foreach($documentacion as $docSave){

            $user = DB::connection('facturacion')->table('enr_DatosGenerales')
            ->select('enr_DatosGenerales.usuario_creacion')->where('enr_DatosGenerales.id',$docSave->caso )->first();

            
            $insertar =  DB::connection('facturacion')->table('enr_Documentacion')
                         ->insert([
                        'idCasoENR' => $docSave->caso ,
                         'titulo' => $docSave->nombreDoc,
                         'tipo' => $docSave->tipoPrueba,
                         'ruta' => $docSave->archivo,
                         'fechaCreacion'=>date('Ymd H:i:s'),
                         'idEliminado'=>1,
                         'usuarioCreacion'=>$user->usuario_creacion,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($documentacion)){
        return response()->json("ok");
       }
    }



    public function getLecturasbyNIS(Request $request){
        $nis = $request["nis"];

        $getDatos =  DB::connection('facturacion')->select("
        select SUBSTRING ( periodo ,3 , 4 ) as anio,periodo as periodo,
        convert(varchar, fecha_lectura_ant, 103)as fechaLecturaAnterior,
        convert(varchar, fecha_lectura, 103)as fechaLectura,
        DATEDIFF(day, fecha_lectura_ant, fecha_lectura) as diasFacturado,
        CONVERT(decimal(18,2),sum (consumo * multiplicador)) as consumo,
        numero_medidor as medidor  from fe_lecturas 
        where (codigo_consumo = 'CO011' or codigo_consumo = 'CO012'
        or codigo_consumo = 'CO013' or codigo_consumo = 'CO014' ) and num_suministro = ?	
        group by periodo,fecha_lectura_ant,fecha_lectura,numero_medidor
        ORDER BY fecha_lectura DESC
        ",[$nis]);

        return response()->json($getDatos);
    }

    public function validarUsuario(Request $request){
        $usuario = $request["alias"];
        $password = $request["password"];

        $result = [];
        
        $usuariosesion =  json_encode( DB::connection('facturacion')->select("
        select * from EDESAL_CALIDAD.dbo.SGT_usuarios where 
        alias = '".$usuario."' and password = '".$password."'
        "));

      


        $idUser = DB::connection('facturacion')->table('EDESAL_CALIDAD.dbo.SGT_usuarios as u')
        ->select('u.id as idUser')->where('u.alias',$usuario)->where('u.password',$password)->first();


        Session::put('idUsuario',$idUser->idUser);

        $arrayJson = [];
        foreach (json_decode($usuariosesion, true) as $value){
            $arrayJson = $value;
        }

        return $arrayJson;
        
       
    }



    public function getTarifasFechas(Request $request){
        $fechaInicio = $request["fechaInicio"];
        $fechaFin = $request["fechaFin"];
        $caso = $request["numeroCaso"];

        $fechaIn = date_create_from_format('Y-m-d',$fechaInicio);

        $fechaIni = date_format($fechaIn,'Ymd').' 00:00:00';


        $fechaF = date_create_from_format('Y-m-d',$fechaFin);

        $fechaFi = date_format($fechaF,'Ymd').' 00:00:00';

       $execProcedure =  DB::connection('facturacion')->statement(
           "exec  [dbo].[enr_calculoTarifa] '".$fechaIni."','".$fechaFi."',".$caso."");


       $getFechasQuery = DB::connection('facturacion')->select(
           "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
           dias from enr_calculoTarifas where casoENR = ".$caso." order by 1 asc");
            
 
             return response()->json($getFechasQuery);
    }



    public function getConsumoEstimado(Request $request){
    
        $consumo = $request["consumoDiarioENR"];
        $caso = $request["numeroCaso"];

       $execProcedure =  DB::connection('facturacion')->statement(
           "exec  [dbo].[enr_consumoEstimadoKwh]  ".$consumo." , ".$caso." ");


       $getConsumo = DB::connection('facturacion')->select(
           "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
           str(consumo,12,2) as consumo from enr_consumoEstimado
           where casoENR = ".$caso." order by 1 asc");
            
 
             return response()->json($getConsumo);
    }

    public function getConsumoRegistrado(Request $request){
    
        $consumo = $request["consumoENRRegistrado"];
        $caso = $request["numeroCaso"];

       $execProcedure =  DB::connection('facturacion')->statement(
           "exec  [dbo].[enr_consumoRegistradoKwh]  ".$consumo." , ".$caso." ");


       $getConsumo = DB::connection('facturacion')->select(
           "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
           str(consumo,12,2) as consumo from enr_consumoRegistrado
           where casoENR = ".$caso." order by 1 asc");
            
 
             return response()->json($getConsumo);
    }


    public function getConsumoENR(Request $request){
    
       // $consumo = $request["consumoENRRegistrado"];
        $caso = $request["numeroCaso"];

       $execProcedure =  DB::connection('facturacion')->statement(
           "exec  [dbo].[enr_consumoENRKwh]  ".$caso." ");


       $getConsumo = DB::connection('facturacion')->select(
           "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
           str(consumo,12,2) as consumo from enr_consumoENR
           where casoENR = ".$caso." order by 1 asc");
            
 
             return response()->json($getConsumo);
    }


    public function getTarifasFechasTotal(Request $request){

        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select sum(dias) as dias from enr_calculoTarifas
            where casoENR = ".$caso."");
             
  
              return response()->json($getConsumo);

    }

    public function getConsumoEstimadoTotal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from enr_consumoEstimado
            where casoENR = ".$caso."");
             
  
              return response()->json($getConsumo);
    }

    public function getConsumoRegistradoTotal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from enr_consumoRegistrado
            where casoENR = ".$caso."");
             
  
              return response()->json($getConsumo);
    }

    public function getConsumoENRTotal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from enr_consumoENR
            where casoENR = ".$caso."");
             
  
              return response()->json($getConsumo);
    }




    public function getConsumoENR1erBloque(Request $request){
        $caso = $request["numeroCaso"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoBloquesConsumo]  ".$caso." ");
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, str(consumo,12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    
    
    public function getConsumoENR2doBloque(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, str(consumo,12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    


    public function getConsumoENR3erBloque(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, str(consumo,12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    



    public function getConsumoENR1erBloqueTotal(Request $request){
        $caso = $request["numeroCaso"];


       
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    
    
    public function getConsumoENR2doBloqueTotal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    


    public function getConsumoENR3erBloqueTotal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from 
            enr_bloquesConsumoENR where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
             
  
              return response()->json($getConsumo);
    }


    public function getConsumoENRTotalGlobal(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select str(sum(consumo),12,2) as consumo from enr_bloquesConsumoENR
             where casoENR = ".$caso."");
             
  
              return response()->json($getConsumo);
    }


    public function getConsumoENRTotalFechas(Request $request){
        $caso = $request["numeroCaso"];
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, str(sum(consumo),12,2) as consumo from enr_bloquesConsumoENR
             where casoENR = ".$caso."
            group by fechas order by 1 asc");
             
  
              return response()->json($getConsumo);
    }
    
    
    public function getConsumoENR1erBloqueEnergia(Request $request){

        $caso = $request["numeroCaso"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoMontoEnergia]  ".$caso." ");


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoEnergiaENR  where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENR2doBloqueEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoEnergiaENR  where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }



    public function getConsumoENR3erBloqueEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoEnergiaENR  where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }




    public function getConsumoENR1erBloqueTotalEnergia(Request $request){
        $caso = $request["numeroCaso"];




        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoEnergiaENR where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENR2doBloqueTotalEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoEnergiaENR  where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }



    public function getConsumoENR3erBloqueTotalEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoEnergiaENR  where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENRTotalGlobalEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from enr_montoEnergiaENR
            where casoENR = ".$caso."");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENRTotalFechasEnergia(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(sum(cobro),12,2) as consumo from enr_montoEnergiaENR
            where casoENR = ".$caso."
            group by fechas order by 1 asc");
            

            return response()->json($getConsumo);
    }



    public function getConsumoENR1erBloqueDistribucion(Request $request){

        $caso = $request["numeroCaso"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoDistribucion]  ".$caso." ");


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoDistribucionENR  where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENR2doBloqueDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoDistribucionENR  where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }



    public function getConsumoENR3erBloqueDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(cobro,12,2) as consumo from enr_montoDistribucionENR  where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }




    public function getConsumoENR1erBloqueTotalDistribucion(Request $request){
        $caso = $request["numeroCaso"];





        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoDistribucionENR where casoENR = ".$caso."
            and bloque = '1er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENR2doBloqueTotalDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoDistribucionENR  where casoENR = ".$caso."
            and bloque = '2do bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }



    public function getConsumoENR3erBloqueTotalDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from 
            enr_montoDistribucionENR  where casoENR = ".$caso."
            and bloque = '3er bloque' order by 1 asc");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENRTotalGlobalDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from enr_montoDistribucionENR
            where casoENR = ".$caso."");
            

            return response()->json($getConsumo);
    }


    public function getConsumoENRTotalFechasDistribucion(Request $request){
        $caso = $request["numeroCaso"];


        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, '$' + str(sum(cobro),12,2) as consumo from enr_montoDistribucionENR
            where casoENR = ".$caso."
            group by fechas order by 1 asc");
            

            return response()->json($getConsumo);
    }




    public function saveDatosCalCaso1(Request $request){
        $idCaso = $request["idCaso"];
        $amperaje1 = $request["amperaje1"];
        $linea1 = $request["voltaje1"];
        $amperaje2 = $request["amperaje2"];
        $linea2 = $request["voltaje2"];
        $horasEstimadas = $request["horasEstimadas"];
        $voltajeSuministro = $request["voltajeSuministro"];
      
       

        $notificar =  DB::connection('facturacion')->table('enr_datosGenerales')
        ->where('id', $idCaso)
        ->update(['estado' => 2]);
      
        $eliminar =  DB::connection('facturacion')->table('enr_datosCalculados')
        ->where('casoENR', $idCaso)->delete();

          $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
                       ->insert([
                      'casoENR' => $idCaso ,
                       'amperajeL1' => $amperaje1,
                       'voltajeL1 ' => $linea1,
                       'amperajeL2'=> $amperaje2,
                       'voltajeL2'=>$linea2,
                       'horasEstimadas '=>$horasEstimadas,
                       'voltajeSuministro '=>$voltajeSuministro,
                       ]);
        
          return response()->json($insertar); 
        
    }



    public function updateDatosCalCaso1(Request $request){
        $idCaso = $request["idCaso"];
        $consumo1 = $request["consumo1"];
        $consumo2 = $request["consumo2"];
        $consumoENRFacturar = $request["consumoENRFacturar"];

      
       

      
      

          $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
          ->where('casoENR', $idCaso)
          ->update(['consDL1' => $consumo1 , 'consDL2' => $consumo2,
          'consumoENRFacturar' => $consumoENRFacturar
          ]);
        
          return response()->json($insertar); 
        
    }



    public function saveDatosCalCaso2(Request $request){
        $idCaso = $request["idCaso"];
        $censoCarga = $request["censoCarga"];
        $consumoEstimado = $request["consumoEstimado"];
        $voltajeSuministro = $request["voltajeSuministro"];


        $notificar =  DB::connection('facturacion')->table('enr_datosGenerales')
        ->where('id', $idCaso)
        ->update(['estado' => 2]);

        $eliminar =  DB::connection('facturacion')->table('enr_datosCalculados')
        ->where('casoENR', $idCaso)->delete();
      

          $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
                       ->insert([
                      'casoENR' => $idCaso ,
                       'censoCarga' => $censoCarga ,
                       'consDiarioEstimado' => $consumoEstimado,
                       'voltajeSuministro'=> $voltajeSuministro,
                       ]);
        
          return response()->json($insertar); 
        
    }



    public function updateDatosCalCaso2(Request $request){
        $idCaso = $request["idCaso"];
        $consENRDiario = $request["consumoDiarioENR"];
        $consumoENRFacturar = $request["consumoENRFacturar"];


      
      

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->where('casoENR', $idCaso)
         ->update(['consENRDiario' => $consENRDiario ,
         'consumoENRFacturar' => $consumoENRFacturar
         ]);
        
          return response()->json($idCaso); 
        
    }



    public function savePeriodosSeleccionadosCaso2(Request $request){
        $periodos = json_encode($request["lecturas"]);
        $periodosDes = json_decode($periodos);
       
        $contador = 0;
        
        foreach($periodosDes as $p){
            $eliminar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
            ->where('casoENR', $p->idCaso)->delete();
        }   


        foreach($periodosDes as $p){
            $insertar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
                         ->insert([
                        'casoENR' => $p->idCaso ,
                         'periodo' => $p->periodo,
                         'diasFacturados' => $p->diasFacturados,
                         'consFacturado' => $p->consumo,
                         'consNoFacturado'=>$p->consumoNoFac,
                         'difConsumo'=>$p->difConsumo,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($periodosDes)){
        return response()->json("ok");
       }
       
        
    }



    public function consumosRealesCaso3(Request $request){
        $periodos = json_encode($request["consumosReales3"]);
        $periodosDes = json_decode($periodos);
       
        $contador = 0;
        
        foreach($periodosDes as $p){
            $eliminar =  DB::connection('facturacion')->table('enr_consumosReales')
            ->where('casoENR', $p->idCaso)->delete();
        }   

        foreach($periodosDes as $p){
            $insertar =  DB::connection('facturacion')->table('enr_consumosReales')
                         ->insert([
                        'casoENR' => $p->idCaso ,
                         'periodo' => $p->periodo,
                         'dias' => $p->diasCT3,
                         'consumo' => $p->consumoRegistradoCT3,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($periodosDes)){
        return response()->json("ok");
       }
       
        
    }


    
    public function consumosRealesCaso3Totales(Request $request){
        $idCaso = $request["idCaso"];
        $promedioDiasCT3 = $request["promedioDiasCT3"];
        $totalConsumoEstimadoCT3 = $request["totalConsumoEstimadoCT3"];

      
   

      
       $eliminar =  DB::connection('facturacion')->table('enr_datosCalculados')
        ->where('casoENR', $idCaso)->delete();
      

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->insert([
        'casoENR' => $idCaso ,
        'promedioDiarioSR' => $promedioDiasCT3,
         'consEstimadoMensual' => $totalConsumoEstimadoCT3
         ]);
        
          return response()->json($insertar); 
        
    }


    public function savePeriodosSeleccionadosCaso3(Request $request){
        $periodos = json_encode($request["lecturas"]);
        $periodosDes = json_decode($periodos);
       
        $contador = 0;
        
       


        foreach($periodosDes as $p){
            $eliminar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
            ->where('casoENR', $p->idCaso)->delete();
        }   


        foreach($periodosDes as $p){
            $insertar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
                         ->insert([
                        'casoENR' => $p->idCaso ,
                         'periodo' => $p->periodo,
                         'diasFacturados' => $p->diasFacturados,
                         'consFacturado' => $p->consumo,
                         'consNoFacturado'=>$p->consumoNoFac,
                         'difConsumo'=>$p->difConsumo,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($periodosDes)){
        return response()->json("ok");
       }
       
        
    }
    


    public function updateDatosCalCaso3(Request $request){
        $idCaso = $request["idCaso"];
        $consENRDiario = $request["consumoDiarioENR"];
        $consumoENRFacturar = $request["consumoENRFacturar"];

      

        $notificar =  DB::connection('facturacion')->table('enr_datosGenerales')
        ->where('id', $idCaso)
        ->update(['estado' => 2]);
      

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->where('casoENR', $idCaso)
         ->update(['consENRDiario' => $consENRDiario,
         'consumoENRFacturar' => $consumoENRFacturar
         ]);
        
          return response()->json($idCaso); 
        
    }




    public function savePeriodosSeleccionadosCaso4(Request $request){
        $periodos = json_encode($request["lecturas"]);
        $periodosDes = json_decode($periodos);
       
        $contador = 0;
        
        foreach($periodosDes as $p){
            $eliminar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
            ->where('casoENR', $p->idCaso)->delete();
        }  

        foreach($periodosDes as $p){
            $insertar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
                         ->insert([
                        'casoENR' => $p->idCaso ,
                         'periodo' => $p->periodo,
                         'diasFacturados' => $p->diasFacturados,
                         'consFacturado' => $p->consumo,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($periodosDes)){
        return response()->json("ok");
       }
       
        
    }


    public function saveDatosCalCaso4(Request $request){
        $idCaso = $request["idCaso"];
        $totalDias = $request["totalDias"];
        $totalConsumo = $request["totalConsumo"];
        $consumoHistorioPromedio = $request["consumoHistorioPromedio"];
        $consumoENREstimado = $request["consumoENREstimado"];
        $consumoENRRegistrado = $request["consumoENRRegistrado"];
        $consumoENRFacturar = $request["consumoENRFacturar"];

        $notificar =  DB::connection('facturacion')->table('enr_datosGenerales')
        ->where('id', $idCaso)
        ->update(['estado' => 2]);
      
        $eliminar =  DB::connection('facturacion')->table('enr_datosCalculados')
        ->where('casoENR', $idCaso)->delete();
      
      

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->insert([
        'casoENR' => $idCaso ,
        'consHistoricoTotal ' => $totalConsumo,
        'diasHistoricoTotal  ' => $totalDias,
         'consHistoricoPromedio' => $consumoHistorioPromedio,
         'consENREstimado' => $consumoENREstimado,
         'consRegistrado' => $consumoENRRegistrado,
         'consumoENRFacturar' => $consumoENRFacturar,
         ]);
        
          return response()->json($insertar); 
        
    }


    public function saveDatosCalCaso5(Request $request){
        $idCaso = $request["idCaso"];
        $porcentajeExactitudOT = $request["porcentajeExactitudOT"];
        $porcentajeExactitudBase = $request["porcentajeExactitudBase"];
        $diferenciaExactitud = $request["diferenciaExactitud"];
      
        

      
      $notificar =  DB::connection('facturacion')->table('enr_datosGenerales')
        ->where('id', $idCaso)
        ->update(['estado' => 2]);


        $eliminar =  DB::connection('facturacion')->table('enr_datosCalculados')
        ->where('casoENR', $idCaso)->delete();
      

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->insert([
        'casoENR' => $idCaso ,
        'porcExactitudOT' => $porcentajeExactitudOT,
        'porcExactitudBase' => $porcentajeExactitudBase,
         'difExactitud' => $diferenciaExactitud,
         ]);
        
          return response()->json($insertar); 
        
    }


    public function savePeriodosSeleccionadosCaso5(Request $request){
        $periodos = json_encode($request["lecturas"]);
        $periodosDes = json_decode($periodos);
       
        $contador = 0;
        
          foreach($periodosDes as $p){
            $eliminar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
            ->where('casoENR', $p->idCaso)->delete();
        }  

        foreach($periodosDes as $p){
            $insertar =  DB::connection('facturacion')->table('enr_periodosEvaluados')
                         ->insert([
                        'casoENR' => $p->idCaso ,
                         'periodo' => $p->periodo,
                         'diasFacturados' => $p->diasFacturados,
                         'consFacturado' => $p->consumo,
                         'consFueraRango' => $p->consumoFuera,
                         'consCorrecto' => $p->consumoCorrecto,
                         ]);

            $contador++;
        }     
            
        
       if($contador == count($periodosDes)){
        return response()->json("ok");
       }
       
        
    }



    public function updateDatosCalCaso5(Request $request){
        $idCaso = $request["idCaso"];
        $consFacturado  = $request["totalConsumo"];
        $consFueraRango  = $request["consumoFuera"];
        $consDFacturado  = $request["consumoDebioFacturar"];
        $consumoENRFacturar  = $request["consumoENRFacturar"]; 

         $insertar =  DB::connection('facturacion')->table('enr_datosCalculados')
         ->where('casoENR', $idCaso)
         ->update(['consFacturado' => $consFacturado,
         'consDFacturado' => $consDFacturado,
         'consFueraRango' => $consFueraRango,
         'consumoENRFacturar' => $consumoENRFacturar
         ]);
        
          return response()->json($idCaso); 
        
    }


    public function cobroMedidor(Request $request){
        $idCaso = $request["idCaso"];
        $cantidadCobrar = $request["cantidadCobrar"];

        $eliminar =  DB::connection('facturacion')->table('enr_totalPagos')
        ->where('casoENR', $idCaso)->delete();
      

         $insertar =  DB::connection('facturacion')->table('enr_totalPagos')
         ->insert([
        'casoENR' => $idCaso ,
        'cobro_medidor' => $cantidadCobrar,
         ]);
        
          return response()->json($insertar); 
        
    }




    public function getConsumoENRBloqueEnergia1G(Request $request){

        $caso = $request["numeroCaso"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_montoEnergiaENR1G]  ".$caso." ");
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
            '$' + str(cobro,12,2) as consumo from enr_montoEnergiaENR
            where casoENR = ".$caso." order by 1 asc");

            return response()->json($getConsumo);
    }


    
    public function getConsumoENRBloqueDistribucion1G(Request $request){

        $caso = $request["numeroCaso"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_calculoDistribucion1G]  ".$caso." ");
 
 
        $getConsumo = DB::connection('facturacion')->select(
            "select fechas, convert(varchar, fechas, 103) as fechasTarifa,
            '$' + str(cobro,12,2) as consumo from enr_montoDistribucionENR 
            where casoENR = ".$caso." order by 1 asc");

            return response()->json($getConsumo);
    }


    public function getConsumoENRBloqueEnergia1GTotal(Request $request){

        $caso = $request["numeroCaso"];
 
        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from enr_montoEnergiaENR
            where casoENR = ".$caso." order by 1 asc");

            return response()->json($getConsumo);
    }


    
    public function getConsumoENRBloqueDistribucion1GTotal(Request $request){

        $caso = $request["numeroCaso"];

        $getConsumo = DB::connection('facturacion')->select(
            "select '$' + str(sum(cobro),12,2) as consumo from enr_montoDistribucionENR 
            where casoENR = ".$caso." order by 1 asc");

            return response()->json($getConsumo);
    }



    public function getDatosImprimir(Request $request){
        $id = $request["caso"];

        $getDatos =  DB::connection('facturacion')->select("
        select 0 as id, 'Notificación inicial' as titulo, scanPrimerNoti as ruta 
        from enr_datosGenerales where id = ".$id."
        union 
        select id as id, titulo as titulo, ruta as ruta from enr_documentacion 
        where idCasoENR =  ".$id." and idEliminado = 1");

        return response()->json($getDatos);
    }


    
    public function multiplesArchivos(Request $request){


                $docs = json_encode($request["pdfs"]);

                $caso = $request["caso"];
                $codigoENR = $request["codigoTipoENR"];
                $tipoENR = $request["codigoENR"];

                $docsSeleccionados = json_decode($docs);

                $imagenes = '';

                foreach($docsSeleccionados as $p){
                    if(substr($p->archivo, -4) == 'JPEG' || substr($p->archivo, -3) == 'jpg' 
                        || substr($p->archivo, -3) == 'png')
                        {
                            $imagenes.=json_encode($p->archivo);
                        }
                    }

                    if(empty($imagenes)){
                    
                    }else{
                        $pdf = \PDF::loadView('Reportes.imagenesProbatorias', compact('docsSeleccionados'))->save( public_path('files/imagenesCaso'.$caso.'.pdf' )); 
                    }
            
                    //return $imagenes;
                
            
            $pdfMerger = PDFMerger::init();

            if($codigoENR == 'OT' && $tipoENR == 'Medidor con fallas internas'){
            //   $pdfMerger->addPDF(public_path('files/rptCobroCero'.$caso.'.pdf'), 'all');
                $pdfMerger->addPDF(public_path('files/infoGenAutoConsumoCero'.$caso.'.pdf'), 'all');
            }

            if($codigoENR == 'LD' || $codigoENR == 'MM' || $codigoENR == 'PE' || $codigoENR == 'AM'){
                $pdfMerger->addPDF(public_path('files/rptCondicionIrregular'.$caso.'.pdf'), 'all');
            $pdfMerger->addPDF(public_path('files/infoGenAutoFraude'.$caso.'.pdf'), 'all');
            }


            if($codigoENR == 'OT' && $tipoENR == 'Varias'){
                $pdfMerger->addPDF(public_path('files/rptCondicionIrregular'.$caso.'.pdf'), 'all');
                $pdfMerger->addPDF(public_path('files/infoGenAutoFraude'.$caso.'.pdf'), 'all');
            }
            $pdfMerger->addPDF(public_path('files/anexoCalculo'.$caso.'.pdf'), 'all');

            foreach($docsSeleccionados as $p){
                if(substr($p->archivo, -4) == 'JPEG' || substr($p->archivo, -3) == 'jpg' 
                    || substr($p->archivo, -3) == 'png')
                    {

                    }else{
                        $pdfMerger->addPDF(public_path('files/'.$p->archivo), 'all');
                    }
            
            }
            
            //validar pdf imagenes
            $imagenes = '';
            
            foreach($docsSeleccionados as $p){
                if(substr($p->archivo, -4) == 'JPEG' || substr($p->archivo, -3) == 'jpg' 
                    || substr($p->archivo, -3) == 'png')
                    {
                        $imagenes.=json_encode($p->archivo);
                    }
                }
                if(empty($imagenes)){ 
                }else{
                    $pdfMerger->addPDF(public_path('files/imagenesCaso'.$caso.'.pdf'), 'all');
                } 

        

            $pdfMerger->merge();

            
        

            $pdfMerger->save(public_path('files/reporteCaso'.$caso.'.pdf'), "file");


            if($codigoENR == 'OT' && $tipoENR == 'Medidor con fallas internas'){
            unlink(public_path('files/infoGenAutoConsumoCero'.$caso.'.pdf'));
                unlink(public_path('files/rptCobroCero'.$caso.'.pdf'));
            }

            if($codigoENR == 'LD' || $codigoENR == 'MM' || $codigoENR == 'PE' || $codigoENR == 'AM'){
        
                unlink(public_path('files/infoGenAutoFraude'.$caso.'.pdf'));
                unlink(public_path('files/rptCondicionIrregular'.$caso.'.pdf'));
                unlink(public_path('files/rptInformeTecnico'.$caso.'.pdf'));
                unlink(public_path('files/rptCobroFraude'.$caso.'.pdf'));
            }


            if($codigoENR == 'OT' && $tipoENR == 'Varias'){
        
                
                unlink(public_path('files/infoGenAutoFraude'.$caso.'.pdf'));
                unlink(public_path('files/rptCondicionIrregular'.$caso.'.pdf'));
                unlink(public_path('files/rptInformeTecnico'.$caso.'.pdf'));
                unlink(public_path('files/rptCobroFraude'.$caso.'.pdf'));
            }

            unlink(public_path('files/anexoCalculo'.$caso.'.pdf'));

            

    }



    public function anexoCalculo(Request $request){

        $caso = $request["caso"];
        $codigoENR = $request["codigoTipoENR"];
        $tipoENR = $request["codigoENR"];


        $execProcedure =  DB::connection('facturacion')->statement(
            "exec  [dbo].[enr_pagosTotales] ".$caso."");


        $data =  DB::connection('facturacion')->select(
            "select distinct dg.id as nCaso,dg.num_suministro as nis,
            cli.nombres+' '+cli.apellidos as cliente,
            feMun.nombre_municipio as municipio,
            fes.anexo_direccion as direccion,
            feApa.numero_medidor as medidor,
            met.TipoENR as resultado,
            tip.TipoENR as codigoENR,
            dg.datosIrregulares as irregularidades,
            convert(varchar(10), dg.fechaRegularizacion, 103) as fechaRegularizacion,
            (select sum(diasFacturados) from enr_periodosEvaluados where casoENR = dg.id) as diasHistorico,
            str(((select sum(consFacturado) from enr_periodosEvaluados where casoENR = dg.id)
            /
            (select sum(diasFacturados) from enr_periodosEvaluados where casoENR = dg.id)
            ),12,3) as consumoDiario ,
            tip.tiempoRetroactivo as diasCobrar,
            convert(varchar(10), dg.fechaInicio, 103) as fechaInicio,
            convert(varchar(10), dg.fechaFin, 103) as fechaFin,
            (select str(sum(consumo),12,2) from enr_consumoEstimado where casoENR= dg.id)
            as consumoEstimado,
            (select str(sum(consumo),12,2) from enr_consumoRegistrado where casoENR= dg.id)
            as consumoRegistrado,
             (select str(sum(consumo),12,2) from enr_consumoENR where casoENR= dg.id)
            as consumoENR,
            (select '$'+str(sum(cobro),12,2) from enr_montoDistribucionENR where casoENR =
            dg.id) as montoDistribucion,
            (select '$'+str(sum(cobro),12,2) from enr_montoEnergiaENR where casoENR =
            dg.id) as montoEnergia,
           
            (select  case when cobro_medidor is null 
            then 
            '$ 0.00'
            else
            '$'+str(cobro_medidor,12,2)
            end from enr_totalPagos where casoENR = dg.id)
            as cobroEquipo,
            '$' + str((select subtotal from enr_totalPagos where casoENR = dg.id),12,2) as subtotal,
             '$' + str((select iva from enr_totalPagos where casoENR = dg.id),12,2) as iva,


            '$' + str((select totalPagar from enr_totalPagos where casoENR = dg.id),12,2) as total
            from enr_datosGenerales dg 
            inner join fe_suministros fes on fes.num_suministro = dg.num_suministro
            inner join fe_cliente as cli on cli.CODIGO_CLIENTE = fes.CODIGO_CLIENTE
            inner join enr_metodologiaCalc met on met.id = dg.codigoTipoMet
            inner join enr_datosCalculados cal on cal.casoENR = dg.id
            inner join enr_gestionTipoENR tip on tip.id = dg.codigoTipoENR
			inner join fe_municipios feMun on feMun.codigo_municipio = fes.codigo_municipio
			and feMun.codigo_departamento = fes.codigo_departamento
			inner join fe_aparatos feApa on feApa.num_suministro = fes.num_suministro
            where (feApa.bandera_activo = 1) and dg.id = ".$caso."");


    
    $pdf = \PDF::loadView('Reportes.anexoCalculo', compact('data'))->save( public_path('files/anexoCalculo'.$caso.'.pdf' )); 
 
    if($codigoENR == 'OT' && $tipoENR == 'Medidor con fallas internas'){
        $pdf = \PDF::loadView('Reportes.infoGenAutoConsumoCero', compact('data'))->save( public_path('files/infoGenAutoConsumoCero'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.rptCobroCero', compact('data'))->save( public_path('files/rptCobroCero'.$caso.'.pdf' )); 

    }

    if($codigoENR == 'LD' || $codigoENR == 'MM' || $codigoENR == 'PE' || $codigoENR == 'AM'){
        $pdf = \PDF::loadView('Reportes.rptCobroFraude', compact('data'))->save( public_path('files/rptCobroFraude'.$caso.'.pdf' )); 
      
        $pdf = \PDF::loadView('Reportes.infoGenAutoFraude', compact('data'))->save( public_path('files/infoGenAutoFraude'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.rptInformeTecnico', compact('data'))->save( public_path('files/rptInformeTecnico'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.rptCondicionIrregular', compact('data'))->save( public_path('files/rptCondicionIrregular'.$caso.'.pdf' )); 
 
    }

    if($codigoENR == 'OT' && $tipoENR == 'Varias'){
        $pdf = \PDF::loadView('Reportes.rptCobroFraude', compact('data'))->save( public_path('files/rptCobroFraude'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.infoGenAutoFraude', compact('data'))->save( public_path('files/infoGenAutoFraude'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.rptInformeTecnico', compact('data'))->save( public_path('files/rptInformeTecnico'.$caso.'.pdf' )); 
        $pdf = \PDF::loadView('Reportes.rptCondicionIrregular', compact('data'))->save( public_path('files/rptCondicionIrregular'.$caso.'.pdf' )); 
 
    }

    return response()->json($data);
    }


    public function repositorioGlobal(Request $request){

        $fecha1r = $request["fechaInicio"];
        $fecha2r = $request["fechaFin"];


        $fecha1 = date_create_from_format('Y-m-d',$fecha1r);

        $fechaIn = date_format($fecha1,'Ymd');

        $fecha2 = date_create_from_format('Y-m-d',$fecha2r);

        $fechaFin = date_format($fecha2,'Ymd');


        $data =  DB::connection('facturacion')->select(
            "select convert(varchar(10),dg.fechaRegularizacion, 103) as fechaIrregular,
            case when month(dg.fechaRegularizacion) = 1
            then
            'Enero'
            when month(dg.fechaRegularizacion) = 2
            then
            'Febrero'
            when month(dg.fechaRegularizacion) = 3
            then
            'Marzo'
            when month(dg.fechaRegularizacion) = 4
            then
            'Abril'
            when month(dg.fechaRegularizacion) = 5
            then
            'Mayo'
            when month(dg.fechaRegularizacion) = 6
            then
            'Junio'
            when month(dg.fechaRegularizacion) = 7
            then
            'Julio'
            when month(dg.fechaRegularizacion) = 8
            then
            'Agosto'
            when month(dg.fechaRegularizacion) = 9
            then
            'Septiembre'
            when month(dg.fechaRegularizacion) = 10
            then
            'Octubre'
            when month(dg.fechaRegularizacion) = 11
            then
            'Noviembre'
            when month(dg.fechaRegularizacion) = 12
            then
            'Diciembre'
            end as mesIrregular,convert(varchar(10),dg.fechaCreacion,103) as fechaAnalisis,
            dg.num_suministro as nis,feCol.nombre_colonia as residencial, cod.TipoENR as expCodENR, met.TipoENR as expMetCal,
            convert(varchar(10), dg.fechaPrimerNoti, 103) as fechaPrimerNoti,
            (select str(sum(consumo),12,2) from enr_consumoENR where casoENR= dg.id)
            as consumoENR,
            (select '$'+str(sum(cobro),12,2) from enr_montoDistribucionENR where casoENR =
            dg.id) as montoDistribucion,
            (select '$'+str(sum(cobro),12,2) from enr_montoEnergiaENR where casoENR =
            dg.id) as montoEnergia,
            (select  case when cobro_medidor is null 
            then 
            '$ 0.00'
            else
            '$'+str(cobro_medidor,12,2)
            end from enr_totalPagos where casoENR = dg.id)
            as cobroMedicion,
            '$' + str((select iva from enr_totalPagos where casoENR = dg.id),12,2) as iva,
            '$' + str((select totalPagar from enr_totalPagos where casoENR = dg.id),12,2) as total
            from enr_datosGenerales dg 
            inner join enr_gestionTipoEnr as cod on cod.id = dg.codigoTipoENR
            inner join enr_metodologiaCalc as met on met.id = dg.codigoTipoMet
            
            inner join fe_suministros fes on fes.num_suministro = dg.num_suministro
            
            inner join fe_departamentos feD on feD.codigo_departamento = fes.codigo_departamento
            
            inner join fe_municipios feM on feM.codigo_municipio = fes.codigo_municipio
            and feM.codigo_departamento = fes.codigo_departamento
            
            inner join fe_poblacion feP on feP.codigo_poblacion = fes.codigo_poblacion
            and feP.codigo_municipio = fes.codigo_municipio 
            and feP.codigo_departamento = fes.codigo_departamento
            
            inner join fe_colonias feCol on feCol.codigo_colonia = fes.codigo_colonia
            and feCol.codigo_poblacion = fes.codigo_poblacion
            and feCol.codigo_municipio = fes.codigo_municipio 
            and feCol.codigo_departamento = fes.codigo_departamento
            where dg.estado = 3 and dg.fechaRegularizacion between '".$fechaIn." 00:00:00' and '".$fechaFin." 23:59:59' 
            ");


            return response()->json($data);
    }
}
