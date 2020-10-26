<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'saveCodigoENR',
        'updateCodigoENR',
        'deleteCodigoENR',
        'saveMetodologia',
        'updateMetodologia',
        'deleteMetodologia',
        'getDatosbyNIS',
        'getOrdenesbyNIS',
        'getDiasRetroactivos',
        'saveDatosNISGenerales',
        'saveDocProbatoria',
        'saveDocOT',
        'moveDoc',
        'getRepositorioIngresados',
        'getRepositorioNotificados',
        'getRepositorioCalculados',
        'getAdjuntosOrdenes',
        'descargarArchivo',
        'eliminarArchivo',
        'getAdjuntosOrdenesENR',
        'eliminarArchivoENR',
        'getDatosENR',
        'cambiarScanENR',
        'getScan',
        'updateDatosNISGenerales',
        'updateDocProbatoria',
        'getLecturasbyNIS',
        'usuario',
        'getFechaInicioTarifa',
        'getFechaFinTarifa',
        'getTarifasFechas',
        'getConsumoEstimado',
        'getConsumoRegistrado',
        'getConsumoENR',
        'getTarifasFechasTotal',
        'getConsumoEstimadoTotal',
        'getConsumoRegistradoTotal',
        'getConsumoENRTotal',
        'getConsumoENR1erBloque',
        'getConsumoENR2doBloque',
        'getConsumoENR3erBloque',
        'getConsumoENR1erBloqueTotal',
        'getConsumoENR2doBloqueTotal',
        'getConsumoENR3erBloqueTotal',
        'getConsumoENRTotalGlobal',
        'getConsumoENRTotalFechas',
        'getConsumoENR1erBloqueEnergia',
        'getConsumoENR2doBloqueEnergia',
        'getConsumoENR3erBloqueEnergia',
        'getConsumoENR1erBloqueTotalEnergia',
        'getConsumoENR2doBloqueTotalEnergia',
        'getConsumoENR3erBloqueTotalEnergia',
        'getConsumoENRTotalGlobalEnergia',
        'getConsumoENRTotalFechasEnergia',
        'getConsumoENR1erBloqueDistribucion',
        'getConsumoENR2doBloqueDistribucion',
        'getConsumoENR3erBloqueDistribucion',
        'getConsumoENR1erBloqueTotalDistribucion',
        'getConsumoENR2doBloqueTotalDistribucion',
        'getConsumoENR3erBloqueTotalDistribucion',
        'getConsumoENRTotalGlobalDistribucion',
        'getConsumoENRTotalFechasDistribucion',
        'saveDatosCalCaso1',
        'updateDatosCalCaso1',  
        'saveDatosCalCaso2',
        'updateDatosCalCaso2',
        'savePeriodosSeleccionadosCaso2',
        'consumosRealesCaso3',
        'consumosRealesCaso3Totales',
        'savePeriodosSeleccionadosCaso3', 
        'updateDatosCalCaso3',
        'savePeriodosSeleccionadosCaso4',
        'saveDatosCalCaso4',
        'saveDatosCalCaso5',
        'savePeriodosSeleccionadosCaso5',
        'updateDatosCalCaso5',
        'cobroMedidor',
        'getConsumoENRBloqueEnergia1G',
        'getConsumoENRBloqueDistribucion1G',
        'getConsumoENRBloqueDistribucion1GTotal',
        'getConsumoENRBloqueEnergia1GTotal',
        'getDatosImprimir',
        'multiplesArchivos',
        'anexoCalculo',
        'repositorioGlobal',
        'eliminarCaso',
        'getLecturasbyNISum',
        'getOtbyNis',
        'getPagosENR',
        'getCasosRed',
        'savePeriodosSeleccionadosCaso6',
        'getCuadroAcumulado',
        'getTotalCuadroAcumulado',
        'getCasosIng',
        'getCasosCalc',
        'getCasosNoti',
        'getCasosEl',
        'getRepositorioEliminados',
        'getNumeroMedidor',
        'getNumeroMedidorE',
        'getTarifasFechasCalculo',
        'getTarifasFechasTotalCalculo',
        'getConsumoEstimadoCalculo',
        'getConsumoEstimadoTotalCalculo',
        'getConsumoRegistradoCalculo',
        'getConsumoRegistradoTotalCalculo',
        'getConsumoENRCalculo',
        'getConsumoENRTotalCalculo',
        'getConsumoENR1erBloqueCalculo',
        'getConsumoENR2doBloqueCalculo',
        'getConsumoENR3erBloqueCalculo',
        'getConsumoENR1erBloqueTotalCalculo',
        'getConsumoENR2doBloqueTotalCalculo',
        'getConsumoENR3erBloqueTotalCalculo',
        'getConsumoENRTotalFechasCalculo',
        'getConsumoENRTotalGlobalCalculo',
        'getConsumoENR1erBloqueEnergiaCalculo',
        'getConsumoENR2doBloqueEnergiaCalculo',
        'getConsumoENR3erBloqueEnergiaCalculo',
        'getConsumoENR1erBloqueTotalEnergiaCalculo',
        'getConsumoENR2doBloqueTotalEnergiaCalculo',
        'getConsumoENR3erBloqueTotalEnergiaCalculo',
        'getConsumoENRTotalGlobalEnergiaCalculo',
        'getConsumoENRTotalFechasEnergiaCalculo',
        'getConsumoENR1erBloqueDistribucionCalculo',
        'getConsumoENR2doBloqueDistribucionCalculo',
        'getConsumoENR3erBloqueDistribucionCalculo',
        'getConsumoENR1erBloqueTotalDistribucionCalculo',
        'getConsumoENR2doBloqueTotalDistribucionCalculo',
        'getConsumoENR3erBloqueTotalDistribucionCalculo',
        'getConsumoENRTotalGlobalDistribucionCalculo',
        'getConsumoENRTotalFechasDistribucionCalculo',
        'getConsumoENRBloqueDistribucion1GCalculo',
        'getConsumoENRBloqueEnergia1GCalculo',
        'getConsumoENRBloqueEnergia1GTotalCalculo',
        'getConsumoENRBloqueDistribucion1GTotalCalculo',
        'getTotalesCobro'
    ];
}
