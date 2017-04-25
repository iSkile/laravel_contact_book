<?php

use App\Http\Middleware\formatNumber;

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

Route::get('/', 'IndexController@index');
Route::post('/', 'IndexController@store');
Route::put('/update/{id}', 'IndexController@update');
Route::delete('/destroy/{id}', 'IndexController@destroy');
