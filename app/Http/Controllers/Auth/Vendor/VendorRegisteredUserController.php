<?php

namespace App\Http\Controllers\Auth\Vendor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Vendor;
use App\Events\RoleSpecificEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class VendorRegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    public function createVendor(): Response
    {
        return Inertia::render('Auth/Vendor/VendorRegister');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'mobile' => 'required|numeric|digits:10|unique:'.User::class,
            'document'=> 'mimes:pdf,jpg,jpeg,png,gif,svg|max:2048',
        ]);

        if($request->hasFile('document')){
            $document = $request->file('document');
            $documentName = time().'.'.$document->getClientOriginalExtension();
            $path = $document->store("uploads/$documentName", 'public');
        
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('Vendor');
        event(new RoleSpecificEvent($user, 'Vendor'));
        $user->syncPermissions(\Spatie\Permission\Models\Role::findByName('Vendor')->permissions);
        // Auth::login($user);

        return redirect(route('verification.notice', absolute: false));
    }
    public function vendorStore(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'mobile' => 'required|numeric|digits:10|unique:'.User::class,
            'business' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'gst' => 'required|string|max:255',
            'gst_certificate' => 'required|mimes:pdf|max:2048',
            'trademark' => 'required|mimes:pdf|max:2048',
            'address_proof' => 'required|mimes:pdf|max:2048',
            'password' => ['required', Rules\Password::defaults()],
            
        ]);

        if($request->has('gst_certificate')){
            $document = $request->file('gst_certificate');
            if($document){
            $documentName = time().'.'.$document->getClientOriginalExtension();
            $path = $document->store("uploads/$documentName", 'public');
            }
            $gstPath = "storage/$path";
        }

        if($request->has('trademark')){
            $document = $request->file('trademark');
            if($document){
            $documentName = time().'.'.$document->getClientOriginalExtension();
            $path = $document->store("uploads/$documentName", 'public');
            }
            $trademarkPath = "storage/$path";
        }

        if($request->has('address_proof')){
            $document = $request->file('address_proof');
            if($document){
            $documentName = time().'.'.$document->getClientOriginalExtension();
            $path = $document->store("uploads/$documentName", 'public');
            }
            $addressProofPath = "storage/$path";
        }



        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => Hash::make($request->password),
        ]);

        $user->vendor()->create([
                'business_name' => $request->business,
                'gst_number' => $request->gst,
                'phone_number' => $request->mobile,
                'brand_name' => $request->brand,
                'gst_certificate' => $gstPath,
                'trademark_certificate' => $trademarkPath,
                'address_proof' => $addressProofPath,
            ]);

        $user->assignRole('Vendor');
        $user->syncPermissions(\Spatie\Permission\Models\Role::findByName('Vendor')->permissions);
        
        event(new RoleSpecificEvent($user, 'Vendor'));
        $user->VendorVerificationEmail();
        Auth::login($user);

        return redirect()->route('vendor-verification.notice');
    }

}