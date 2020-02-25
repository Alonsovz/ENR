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
    
