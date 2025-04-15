<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    protected $model = Transaction::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'amount' => $this->faker->randomFloat(2, 10000, 1000000),
            'note' => $this->faker->boolean(30) ? $this->faker->sentence : null,
            'attachment' => $this->faker->boolean(20) ? 'sample-' . $this->faker->randomNumber(3) . '.pdf' : null,
            'attachment_mime_type' => $this->faker->boolean(20) ? $this->faker->randomElement(['application/pdf', 'image/jpeg', 'image/png']) : null,
            'attachment_size' => $this->faker->boolean(20) ? $this->faker->numberBetween(1000, 5000000) : null,
        ];
    }
}
