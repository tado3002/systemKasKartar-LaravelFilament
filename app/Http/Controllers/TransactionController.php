<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        return Transaction::with('user')->with('category')->orderBy('updated_at', 'desc')->paginate($perPage);
    }

    public function getSummary()
    {
        $incomes = Transaction::whereHas('category', fn($query) => $query->where('is_expense', false))->sum('amount');
        $expenses = Transaction::whereHas('category', fn($query) => $query->where('is_expense', true))->sum('amount');

        return response()
            ->json([
                'incomes' => $incomes,
                'expenses' => $expenses,
                'balance' => $incomes - $expenses
            ]);
    }
}
