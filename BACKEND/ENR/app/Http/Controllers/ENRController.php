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

}