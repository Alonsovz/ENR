<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

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
        'multiplesArchivos'
    ];
}
