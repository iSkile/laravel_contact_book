<?php

namespace App\Http\Controllers;

use Image;
use App\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = Contact::all();

        return view('index', [
            'contacts' => $contacts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:255',
            'phone' => 'required|phone:AUTO,UA,mobile|min:9|max:20|unique:contacts',
            'photo' => 'image'
        ]);

        $name = request('name');
        $phone = request('phone');
        $photo = $request->file('photo');

        $phone = preg_replace('/[^\d\+]/', '', $phone);

        if ($photo) {
            $photo = $photo->store('photos', 'public');
            $path = public_path(Storage::url($photo));
            Image::make($path)->fit(64)->save($path);
        } else {
            $photo = '';
        }

        try {
            $contact = Contact::create(
                compact('name', 'phone', 'photo')
            );

            return response()->json([
                'success' => true,
                'html' => View(
                    'partials.contacts',
                    ['contacts' => compact('contact')]
                )->render(),
            ]);
        } catch (QueryException $e) {
            $errors = ['Something wrong with database'];

            return response()->json([
                'success' => false,
                'errors' => $errors,
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|min:3|max:255',
            'phone' => [
                'required',
                'phone:AUTO,UA,mobile',
                'min:9',
                'max:20',
                Rule::unique('contacts')->ignore($id)
            ],
            'photo' => 'image',
        ]);


        $name = request('name');
        $phone = request('phone');
        $deletePhoto = request('delete-photo') === 'true';
        $photo = $request->file('photo');

        $phone = preg_replace('/[^\d\+]/', '', $phone);

        try {
            $contact = Contact::find($id);

            if (($deletePhoto || $photo) && $contact->photo != '') {
                Storage::disk('public')->delete($contact->photo);
            }

            if ($photo) {
                $photo = $photo->store('photos', 'public');
                $path = public_path(Storage::url($photo));
                Image::make($path)->fit(64)->save($path);
            } else {
                $photo = $deletePhoto ? '' : $contact->photo;
            }

            $contact->fill(
                compact('name', 'phone', 'photo')
            );
            $contact->save();

            return response()->json([
                'success' => true,
                'html' => View(
                    'partials.contacts',
                    ['contacts' => compact('contact')]
                )->render(),
            ]);
        } catch (QueryException $e) {
            $errors = ['Something wrong with database'];

            return response()->json([
                'success' => false,
                'errors' => $errors,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Contact::destroy($id);
        return response()->json([
            'success' => true,
        ]);
    }
}
