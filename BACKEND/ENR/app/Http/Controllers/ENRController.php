<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;

class ENRController extends Controller
{
    public function getCodigoENR(){
        $codigos = DB::connection('facturacion')->select("
        select * from enr_gestionTipoEnr where idEliminado = 1
        ");


        return response()->json($codigos);
    }
    
    public function getMetodologiaCalc(){
        $codigos = DB::connection('facturacion')->select("
        select * from enr_metodologiaCalc where idEliminado = 1
        ");


        return response()->json($codigos);
    }

    

}