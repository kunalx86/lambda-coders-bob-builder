<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\workers;
use App\Models\owner;
use App\Models\contractor;
use App\Models\projects;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    function index(Request $request)
    {

        $matchThese = ['email' => $request->email,'password' => $request->password];
        $user= User::where($matchThese)->first();
        // print_r($data);
            if (!$user) {
                return response([
                    'message' => ['These credentials do not match our records.']
                ], 404);
            }
        
             $token = $user->createToken('my-app-token')->plainTextToken;
        
            $response = [
                'user' => $user,
                'token' => $token
            ];
        
             return response($response, 201);
    }
    function createWorker(Request $req)
		{
			$work = new workers;
            $work -> Name = $req->name;
            $work -> phone = $req->phone;
            $work -> aadhar = $req->aadhar;
            $work -> photo = $req->photo;
            $result=$work->save();

            if($result)
            {
                    return["Result"=>"secc"];
            }
            else{
                    return["Result"=>"fail"];
            }
		}
    function createContractors(Request $req)
		{
			$user = new User;
            $user -> name = $req->name;
            $user -> email = $req->email;
            $user -> password = $req->password;
            $user -> Aadhar = $req->aadhar;
            $result=$user->save();

            if($result)
            {
                    return["Result"=>"secc"];
            }
            else{
                    return["Result"=>"fail"];
            }
	}


    function getWorker()
		{
            return workers::all();
		}

    function getWorkerByAadhar($id=null)
		{
            $data = DB::select("select * from workers where aadhar=?", [$id]);
            if (!$data) {
                return "Something went wrong";
            }
            return $data;
		}

    function updateWorkerPassword(Request $req)
		{
            $aadhar= $req->aadhar;
            $pass=$req->pass;
            $query = DB::update("UPDATE workers SET password = ? WHERE aadhar=?;", [$pass,$aadhar]);

            if(!$query)
            {
                return ["Result"=>"Something went wrong"];
            }
            else
            {
                    return ["Result"=>"updated"];
            }
		}

    function updateWorker(Request $req)
		{

            $aadhar= $req->aadhar;
            $name= $req->name;
            $photo= $req->photo;
            $phone= $req->phone;
            $user= workers::where('aadhar',$aadhar)->first();
                if (!$user) {
                    return ["Result"=>"Something went wrong"];
                }
                else{
                    DB::update("UPDATE workers SET Name=?,phone=?,photo=? WHERE aadhar= ?", [ $name, $phone,$photo,$aadhar]);
                      return ["Result"=>"secc"];
                }
		}

        

    function createOwner(Request $req)
		{
            $own = new owner;
            $own -> Name = $req->name;
            $own -> phone = $req->phone;
            $own -> aadhar = $req->aadhar;
            $own -> password = $req->pass;
            $own -> type = $req->type;
            $result=$own->save();
            if($result)
            {
                    return["Result"=>"secc"];
            }
            else{
                    return["Result"=>"fail"];
            }
		}

    function getOwner()
		{
            return owner::all();
		}

    function getOwnerByAadhar($id=null)
		{
    
            $data = DB::select("select * from owners where aadhar=?", [$id]);
            if (!$data) {
                return "Something went wrong";
            }
            return $data;
    
		}

    function updateOwnerPassword(Request $req)
		{
            $aadhar= $req->aadhar;
            $pass=$req->pass;
            $query = DB::update("UPDATE owners SET password = ? WHERE aadhar=?;", [$pass,$aadhar]);

            if(!$query)
            {
                return ["Result"=>"Something went wrong"];
            }
            else
            {
                    return ["Result"=>"updated"];
            }
		}

    function createContractor(Request $req)
		{
            $con = new contractor;
            $con -> Name = $req->name;
            $con -> phone = $req->phone;
            $con -> aadhar = $req->aadhar;
            $con -> password = $req->pass;
            $con -> type = $req->type;
            $result=$con->save();
            if($result)
            {
                    return["Result"=>"secc"];
            }
            else{
                    return["Result"=>"fail"];
            }
		}
    function getContractor()
		{
            return contractor::all();
		}

    function getContractorByAadhar($id=null)
		{
    
            $data = DB::select("select * from contractors where aadhar=?", [$id]);
            if (!$data) {
                return "Something went wrong";
            }
            return $data;
    
		}
    
    function updateContractorPassword(Request $req)
		{
            $aadhar= $req->aadhar;
            $pass=$req->pass;
            $query = DB::update("UPDATE contractors SET password = ? WHERE aadhar=?;", [$pass,$aadhar]);

            if(!$query)
            {
                return ["Result"=>"Something went wrong"];
            }
            else
            {
                    return ["Result"=>"updated"];
            }
		}


        
    function createProject(Request $req)
    {
        $pro = new projects;
        $pro -> Name = $req->name;
        $pro -> longitude = $req->longitude;
        $pro -> latitude = $req->latitude;
        $result=$pro->save();
        if($result)
        {
                return["Result"=>"secc"];
        }
        else{
                return["Result"=>"fail"];
        }
    }
    function getProject()
    {
        
        return projects::all();
    }

    function deleteProject($id=null)
    {
       
        $data = DB::select("select * from projects where Name=?", [$id]);
        if (!$data) {
            return "Something went wrong";
        }
        else{
            DB::select(" DELETE FROM projects WHERE  Name=?", [$id]);
            return["Result"=>"secc"];
        }
    

    }



    


}
