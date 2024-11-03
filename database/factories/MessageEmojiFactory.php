<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MessageEmoji>
 */
class MessageEmojiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $emojis = ['😀', '😁', '😎', '😍', '😶', '😴', '😌', '😕', '😓'];

        return [
            'emoji' => $emojis[array_rand($emojis)],
        ];
    }

}
