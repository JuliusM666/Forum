<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Topic;
use \App\Models\User;
use \App\Models\Theme;
use \App\Models\Reply;
use \App\Models\Post;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $titles = [
            "Technology" => ['IT', 'Electronics', 'News', 'Developing', 'Hardware'],
            "Hobbies" => ['Fishing', 'Camping', 'Hunting', 'Games'],
            "Sport" => ['Football', 'Basketball', 'Fitness', 'Running'],
            "Job" => ['Ideas', 'Projects']
        ];

        User::factory()->create([
            'name' => 'user',
            'password' => 'user',
        ]);

        User::factory(100)->create();

        foreach ($titles as $key => $value) {
            $topic = Topic::factory()->create([
                'title' => $key,

            ]);
            foreach ($value as $theme) {
                Theme::factory()->create([
                    'title' => $theme,
                    'topic_id' => $topic->id,

                ]);
            }
        }
        $themes = Theme::all()->shuffle();
        $users = User::all()->shuffle();
        for ($i = 0; $i < 100; $i++) {
            Post::factory()->create([
                'user_id' => $users->pop()->id,
                'theme_id' => $themes->random()->id,


            ]);
        }
        $posts = Post::all()->shuffle();
        $users = User::all()->shuffle();
        for ($i = 0; $i < 300; $i++) {
            Reply::factory()->create([
                'user_id' => $users->random()->id,
                'post_id' => $posts->random()->id,


            ]);
        }
        $replies = Reply::all()->shuffle();
        for ($i = 0; $i < 500; $i++) {
            $reply = $replies->random();
            Reply::factory()->create([
                'user_id' => $users->random()->id,
                'post_id' => $reply->post_id,
                'reply_id' => $reply->id,


            ]);
        }


    }
}
