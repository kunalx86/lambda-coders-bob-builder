<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    //All secure URL's
Route::post('/createworker',[userController::class,'createWorker']);
Route::post('/createcontractors',[userController::class,'createContractors']);
Route::post('/createowner',[userController::class,'createOwner']);
Route::post('/createcontractor',[userController::class,'createContractor']);
Route::get('/getworker',[userController::class,'getWorker']);
Route::get('/getworkerbyaadhar/{id}',[userController::class,'getWorkerByAadhar']);
Route::get('/getowner',[userController::class,'getOwner']);
Route::get('/getownerbyaadhar/{id}',[userController::class,'getOwnerByAadhar']);
Route::get('/getcontractor',[userController::class,'getContractor']);
Route::get('/getcontractorbyaadhar/{id}',[userController::class,'getContractorByAadhar']);
Route::put('/updateworkerpassword',[userController::class,'updateWorkerPassword']);
Route::put('/updateownerpassword',[userController::class,'updateOwnerPassword']);

Route::put('/updateworker',[userController::class,'updateWorker']);
Route::post('/createproject',[userController::class,'createProject']);
Route::get('/getproject',[userController::class,'getProject']);

Route::delete('/deleteproject/{id}',[userController::class,'deleteProject']);


});




Route::post("login",[UserController::class,'index']);
Route::post('/createcontractors',[userController::class,'createContractors']);