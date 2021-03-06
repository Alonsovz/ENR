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


    
    Route::post('getFechaInicioTarifa', 'ENRController@getFechaInicioTarifa');
    
    Route::post('getFechaFinTarifa', 'ENRController@getFechaFinTarifa');
    
    Route::post('getTarifasFechas', 'ENRController@getTarifasFechas');

    Route::post('getConsumoEstimado', 'ENRController@getConsumoEstimado');

    Route::post('getConsumoRegistrado', 'ENRController@getConsumoRegistrado');
    
    Route::post('getConsumoENR', 'ENRController@getConsumoENR');



    Route::post('getTarifasFechasTotal', 'ENRController@getTarifasFechasTotal');

    Route::post('getConsumoEstimadoTotal', 'ENRController@getConsumoEstimadoTotal');

    Route::post('getConsumoRegistradoTotal', 'ENRController@getConsumoRegistradoTotal');
    
    Route::post('getConsumoENRTotal', 'ENRController@getConsumoENRTotal');
    
    Route::post('getConsumoENR1erBloque', 'ENRController@getConsumoENR1erBloque');
    Route::post('getConsumoENR2doBloque', 'ENRController@getConsumoENR2doBloque');
    Route::post('getConsumoENR3erBloque', 'ENRController@getConsumoENR3erBloque');


    Route::post('getConsumoENR1erBloqueTotal', 'ENRController@getConsumoENR1erBloqueTotal');
    Route::post('getConsumoENR2doBloqueTotal', 'ENRController@getConsumoENR2doBloqueTotal');
    Route::post('getConsumoENR3erBloqueTotal', 'ENRController@getConsumoENR3erBloqueTotal');


    Route::post('getConsumoENRTotalGlobal', 'ENRController@getConsumoENRTotalGlobal');

    Route::post('getConsumoENRTotalFechas', 'ENRController@getConsumoENRTotalFechas');



    Route::post('getConsumoENR1erBloqueEnergia', 'ENRController@getConsumoENR1erBloqueEnergia');
    Route::post('getConsumoENR2doBloqueEnergia', 'ENRController@getConsumoENR2doBloqueEnergia');
    Route::post('getConsumoENR3erBloqueEnergia', 'ENRController@getConsumoENR3erBloqueEnergia');


    Route::post('getConsumoENR1erBloqueTotalEnergia', 'ENRController@getConsumoENR1erBloqueTotalEnergia');
    Route::post('getConsumoENR2doBloqueTotalEnergia', 'ENRController@getConsumoENR2doBloqueTotalEnergia');
    Route::post('getConsumoENR3erBloqueTotalEnergia', 'ENRController@getConsumoENR3erBloqueTotalEnergia');


    Route::post('getConsumoENRTotalGlobalEnergia', 'ENRController@getConsumoENRTotalGlobalEnergia');

    Route::post('getConsumoENRTotalFechasEnergia', 'ENRController@getConsumoENRTotalFechasEnergia');


    Route::post('getConsumoENR1erBloqueDistribucion', 'ENRController@getConsumoENR1erBloqueDistribucion');
    Route::post('getConsumoENR2doBloqueDistribucion', 'ENRController@getConsumoENR2doBloqueDistribucion');
    Route::post('getConsumoENR3erBloqueDistribucion', 'ENRController@getConsumoENR3erBloqueDistribucion');


    Route::post('getConsumoENR1erBloqueTotalDistribucion', 'ENRController@getConsumoENR1erBloqueTotalDistribucion');
    Route::post('getConsumoENR2doBloqueTotalDistribucion', 'ENRController@getConsumoENR2doBloqueTotalDistribucion');
    Route::post('getConsumoENR3erBloqueTotalDistribucion', 'ENRController@getConsumoENR3erBloqueTotalDistribucion');


    Route::post('getConsumoENRTotalGlobalDistribucion', 'ENRController@getConsumoENRTotalGlobalDistribucion');

    Route::post('getConsumoENRTotalFechasDistribucion', 'ENRController@getConsumoENRTotalFechasDistribucion');
    
    Route::post('saveDatosCalCaso1', 'ENRController@saveDatosCalCaso1');
    Route::post('updateDatosCalCaso1', 'ENRController@updateDatosCalCaso1');
    
    Route::post('saveDatosCalCaso2', 'ENRController@saveDatosCalCaso2');
    Route::post('updateDatosCalCaso2', 'ENRController@updateDatosCalCaso2');
    Route::post('savePeriodosSeleccionadosCaso2', 'ENRController@savePeriodosSeleccionadosCaso2');
    
    Route::post('consumosRealesCaso3', 'ENRController@consumosRealesCaso3');
    Route::post('consumosRealesCaso3Totales', 'ENRController@consumosRealesCaso3Totales');
    Route::post('savePeriodosSeleccionadosCaso3', 'ENRController@savePeriodosSeleccionadosCaso3');
    Route::post('updateDatosCalCaso3', 'ENRController@updateDatosCalCaso3');
    


    Route::post('savePeriodosSeleccionadosCaso4', 'ENRController@savePeriodosSeleccionadosCaso4');
    Route::post('saveDatosCalCaso4', 'ENRController@saveDatosCalCaso4');

    Route::post('saveDatosCalCaso5', 'ENRController@saveDatosCalCaso5');
    Route::post('savePeriodosSeleccionadosCaso5', 'ENRController@savePeriodosSeleccionadosCaso5');

    Route::post('updateDatosCalCaso5', 'ENRController@updateDatosCalCaso5');

    Route::post('savePeriodosSeleccionadosCaso6', 'ENRController@savePeriodosSeleccionadosCaso6');

    Route::post('cobroMedidor', 'ENRController@cobroMedidor');
    Route::post('getConsumoENRBloqueEnergia1G', 'ENRController@getConsumoENRBloqueEnergia1G');
    Route::post('getConsumoENRBloqueDistribucion1G', 'ENRController@getConsumoENRBloqueDistribucion1G');

    Route::post('getConsumoENRBloqueEnergia1GTotal', 'ENRController@getConsumoENRBloqueEnergia1GTotal');
    Route::post('getConsumoENRBloqueDistribucion1GTotal', 'ENRController@getConsumoENRBloqueDistribucion1GTotal');

    Route::post('getDatosImprimir', 'ENRController@getDatosImprimir');
    Route::post('multiplesArchivos', 'ENRController@multiplesArchivos');

    Route::post('anexoCalculo', 'ENRController@anexoCalculo');

    Route::post('repositorioGlobal', 'ENRController@repositorioGlobal');

    Route::post('eliminarCaso', 'ENRController@eliminarCaso');
    
    
    Route::post('getLecturasbyNISum', 'ENRController@getLecturasbyNISum');
    Route::post('getOtbyNis', 'ENRController@getOtbyNis');
    

    Route::any('getPagosENR', 'DashboardController@getPagosENR');
    
    Route::any('getCasosRed', 'DashboardController@getCasosRed');
    
    Route::post('usuario', 'UserController@validarUsuario');
    
    
    Route::any('getCuadroAcumulado', 'DashboardController@getCuadroAcumulado');
    
    Route::any('getTotalCuadroAcumulado', 'DashboardController@getTotalCuadroAcumulado');

    Route::any('getCasosIng', 'DashboardController@getCasosIng');
    Route::any('getCasosCalc', 'DashboardController@getCasosCalc');
    Route::any('getCasosNoti', 'DashboardController@getCasosNoti');
    Route::any('getCasosEl', 'DashboardController@getCasosEl');
    Route::any('getCasosRec', 'DashboardController@getCasosRec');
    Route::any('getRepositorioEliminados', 'ENRController@getRepositorioEliminados');

    Route::post('getNumeroMedidor', 'ENRController@getNumeroMedidor');
    Route::post('getNumeroMedidorE', 'ENRController@getNumeroMedidorE');
    
    Route::post('getTarifasFechasCalculo', 'ENRController@getTarifasFechasCalculo');
    Route::post('getTarifasFechasTotalCalculo', 'ENRController@getTarifasFechasTotalCalculo');

    Route::post('getConsumoEstimadoCalculo', 'ENRController@getConsumoEstimadoCalculo');
    Route::post('getConsumoEstimadoTotalCalculo', 'ENRController@getConsumoEstimadoTotalCalculo');

    Route::post('getConsumoRegistradoCalculo', 'ENRController@getConsumoRegistradoCalculo');
    Route::post('getConsumoRegistradoTotalCalculo', 'ENRController@getConsumoRegistradoTotalCalculo');

    Route::post('getConsumoENRCalculo', 'ENRController@getConsumoENRCalculo');
    Route::post('getConsumoENRTotalCalculo', 'ENRController@getConsumoENRTotalCalculo');

    Route::post('getConsumoENR1erBloqueCalculo', 'ENRController@getConsumoENR1erBloqueCalculo');
    Route::post('getConsumoENR2doBloqueCalculo', 'ENRController@getConsumoENR2doBloqueCalculo');
    Route::post('getConsumoENR3erBloqueCalculo', 'ENRController@getConsumoENR3erBloqueCalculo');

    Route::post('getConsumoENR1erBloqueTotalCalculo', 'ENRController@getConsumoENR1erBloqueTotalCalculo');
    Route::post('getConsumoENR2doBloqueTotalCalculo', 'ENRController@getConsumoENR2doBloqueTotalCalculo');
    Route::post('getConsumoENR3erBloqueTotalCalculo', 'ENRController@getConsumoENR3erBloqueTotalCalculo');

    Route::post('getConsumoENRTotalFechasCalculo', 'ENRController@getConsumoENRTotalFechasCalculo');
    Route::post('getConsumoENRTotalGlobalCalculo', 'ENRController@getConsumoENRTotalGlobalCalculo');
    
    Route::post('getConsumoENR1erBloqueEnergiaCalculo', 'ENRController@getConsumoENR1erBloqueEnergiaCalculo');
    Route::post('getConsumoENR2doBloqueEnergiaCalculo', 'ENRController@getConsumoENR2doBloqueEnergiaCalculo');
    Route::post('getConsumoENR3erBloqueEnergiaCalculo', 'ENRController@getConsumoENR3erBloqueEnergiaCalculo');

    Route::post('getConsumoENR1erBloqueTotalEnergiaCalculo', 'ENRController@getConsumoENR1erBloqueTotalEnergiaCalculo');
    Route::post('getConsumoENR2doBloqueTotalEnergiaCalculo', 'ENRController@getConsumoENR2doBloqueTotalEnergiaCalculo');
    Route::post('getConsumoENR3erBloqueTotalEnergiaCalculo', 'ENRController@getConsumoENR3erBloqueTotalEnergiaCalculo');

    Route::post('getConsumoENRTotalGlobalEnergiaCalculo', 'ENRController@getConsumoENRTotalGlobalEnergiaCalculo');
    Route::post('getConsumoENRTotalFechasEnergiaCalculo', 'ENRController@getConsumoENRTotalFechasEnergiaCalculo');


    Route::post('getConsumoENR1erBloqueDistribucionCalculo', 'ENRController@getConsumoENR1erBloqueDistribucionCalculo');
    Route::post('getConsumoENR2doBloqueDistribucionCalculo', 'ENRController@getConsumoENR2doBloqueDistribucionCalculo');
    Route::post('getConsumoENR3erBloqueDistribucionCalculo', 'ENRController@getConsumoENR3erBloqueDistribucionCalculo');

    Route::post('getConsumoENR1erBloqueTotalDistribucionCalculo', 'ENRController@getConsumoENR1erBloqueTotalDistribucionCalculo');
    Route::post('getConsumoENR2doBloqueTotalDistribucionCalculo', 'ENRController@getConsumoENR2doBloqueTotalDistribucionCalculo');
    Route::post('getConsumoENR3erBloqueTotalDistribucionCalculo', 'ENRController@getConsumoENR3erBloqueTotalDistribucionCalculo');

    Route::post('getConsumoENRTotalFechasDistribucionCalculo', 'ENRController@getConsumoENRTotalFechasDistribucionCalculo');
    Route::post('getConsumoENRTotalGlobalDistribucionCalculo', 'ENRController@getConsumoENRTotalGlobalDistribucionCalculo');


    Route::post('getConsumoENRBloqueDistribucion1GCalculo', 'ENRController@getConsumoENRBloqueDistribucion1GCalculo');
    Route::post('getConsumoENRBloqueEnergia1GCalculo', 'ENRController@getConsumoENRBloqueEnergia1GCalculo');
    Route::post('getConsumoENRBloqueEnergia1GTotalCalculo', 'ENRController@getConsumoENRBloqueEnergia1GTotalCalculo');
    Route::post('getConsumoENRBloqueDistribucion1GTotalCalculo', 'ENRController@getConsumoENRBloqueDistribucion1GTotalCalculo');

    
    Route::post('getTotalesCobro', 'ENRController@getTotalesCobro');

        
    Route::post('guardarDatosRecibidoCliente', 'ENRController@guardarDatosRecibidoCliente');
    Route::any('getRepositorioRecibidosCliente', 'ENRController@getRepositorioRecibidosCliente');
    Route::post('guardarSeleccionEE', 'ENRController@guardarSeleccionEE');

    Route::any('getCodigosCargos', 'ENRController@getCodigosCargos');
    Route::any('saveDatosCalCaso6','ENRController@saveDatosCalCaso6');
    Route::any('getRepositorioFacturados', 'ENRController@getRepositorioFacturados');
    Route::any('getRepositorioFacturadosManual', 'ENRController@getRepositorioFacturadosManual');
    Route::any('getRepositorioFacturadosEE', 'ENRController@getRepositorioFacturadosEE');
    
