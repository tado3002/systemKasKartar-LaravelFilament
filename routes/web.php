<?php

use App\Http\Controllers\FinanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/dashboard', function () {*/
/*    return Inertia::render('Dashboard');*/
/*})->middleware(['auth', 'verified'])->name('dashboard');*/
/**/
/*Route::middleware('auth')->group(function () {*/
/*    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');*/
/*    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');*/
/*    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');*/
/*});*/
/**/

Route::group(['prefix' => 'finance'], function () {
    Route::get('/', [FinanceController::class, 'index'])->name('finance.index');
});

Route::group(['prefix' => 'transactions'], function () {
    Route::get('/', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/summary', [TransactionController::class, 'getSummary'])->name('transactions.summary');
});

require __DIR__ . '/auth.php';
