<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



    Route::any('test', 'TestController@index');
    Route::any('getCodigoENR', 'ENRController@getCodigoENR');

    Route::any('getMetodologiaCalc', 'ENRController@getMetodologiaCalc');

    Route::post('saveCodigoENR', 'ENRController@saveCodigos');
    Route::post('updateCodigoENR', 'ENRController@updateCodigos');
    Route::post('deleteCodigoENR', 'ENRController@deleteCodigos');
    Route::post('saveMetodologia', 'ENRController@saveMetodologia');
    Route::post('updateMetodologia', 'ENRController@updateMetodologia');
    Route::post('deleteMetodologia', 'ENRController@deleteMetodologia');


    Route::post('getDatosbyNIS', 'ENRController@getDatosbyNIS');
    Route::post('getOrdenesbyNIS', 'ENRController@getOrdenesbyNIS');
    
    Route::post('getDiasRetroactivos', 'ENRController@getDiasRetroactivos');

    
    Route::post('saveDatosNISGenerales', 'ENRController@saveDatosNISGenerales');

    Route::post('saveDocProbatoria', 'ENRController@saveDocProbatoria');
    Route::post('saveDocOT', 'ENRController@saveDocOT');
    Route::post('moveDoc', 'ENRController@moveDoc');
    Route::any('getRepositorioIngresados', 'ENRController@getRepositorioIngresados');
    Route::any('getRepositorioNotificados', 'ENRController@getRepositorioNotificados');
    Route::any('getRepositorioCalculados', 'ENRController@getRepositorioCalculados');
    
    Route::post('getAdjuntosOrdenes', 'ENRController@getAdjuntosOrdenes');


    Route::any('descargarArchivo', 'ENRController@descargarArchivo');
    Route::post('eliminarArchivo', 'ENRController@eliminarArchivo');
    Route::post('eliminarArchivoENR', 'ENRController@eliminarArchivoENR');
    Route::any('getAdjuntosOrdenesENR', 'ENRController@getAdjuntosOrdenesENR');
    
    Route::post('getDatosENR', 'ENRController@getDatosENR');
    Route::post('cambiarScanENR', 'ENRController@cambiarScanENR');

    
    
    Route::post('getScan', 'ENRController@getScan');
    Route::post('updateDatosNISGenerales', 'ENRController@updateDatosNISGenerales');
    
    Route::post('updateDocProbatoria', 'ENRController@updateDocProbatoria');
    
    Route::post('getLecturasbyNIS', 'ENRController@getLecturasbyNIS');


    Route::post('usuario', 'ENRController@validarUsuario');
    
    Route::post('getFechaInicioTarifa', 'ENRController@getFechaInicioTarifa');
    
    Route::post('getFechaFinTarifa', 'ENRController@getFechaFinTarifa');
    
    Route::post('getTarifasFechas', 'ENRController@getTarifasFechas');

    Route::post('getConsumoEstimado', 'ENRController@getConsumoEstimado');

    Route::post('getConsumoRegistrado', 'ENRController@getConsumoRegistrado');
    
    Route::post('getConsumoENR', 'ENRController@getConsumoENR');

    
    