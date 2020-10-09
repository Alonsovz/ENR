<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use LynX39\LaraPdfMerger\Facades\PdfMerger;
use Session;

date_default_timezone_set("America/El_Salvador");

class UserController extends Controller
{
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

}