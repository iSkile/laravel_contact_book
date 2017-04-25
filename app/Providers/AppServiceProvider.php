<?php

namespace App\Providers;

use App\Contact;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Contact::deleting(function ($contact) {
            if ($contact->photo != '') {
                Storage::disk('public')->delete($contact->photo);
            }
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
