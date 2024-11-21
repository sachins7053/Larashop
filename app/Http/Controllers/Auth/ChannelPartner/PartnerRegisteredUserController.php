<?php

namespace App\Http\Controllers\Auth\ChannelPartner;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Events\RoleSpecificEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class PartnerRegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    public function createPartner(): Response
    {
        return Inertia::render('Auth/Partner/PartnerRegister');
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

        $user->assignRole('Agent');
        event(new RoleSpecificEvent($user, 'Agent'));
        $user->syncPermissions(\Spatie\Permission\Models\Role::findByName('Admin')->permissions);
        // Auth::login($user);

        return redirect(route('verification.notice', absolute: false));
    }
    public function partnerStore(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'mobile' => 'required|numeric|digits:10|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
            
        ]);

        if($request->has('document')){
            $document = $request->file('document');
            if($document){
            $documentName = time().'.'.$document->getClientOriginalExtension();
            $path = $document->store("uploads/$documentName", 'public');
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('Agent');
        event(new RoleSpecificEvent($user, 'Agent'));
        $user->syncPermissions(\Spatie\Permission\Models\Role::findByName('Agent')->permissions);
        //Auth::login($user);

        return redirect(route('partner-verification.notice', absolute: false));
    }

}
