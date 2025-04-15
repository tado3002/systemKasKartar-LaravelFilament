<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    //
    public function index(Request $request): Response
    {
        $perPage = $request->get('perPage', 10);
        $transactions = Transaction::with('user')->orderBy('updated_at', 'desc')->with('category')->paginate($perPage);
        return Inertia::render('Finance', ['transactions' => $transactions]);
    }
}
