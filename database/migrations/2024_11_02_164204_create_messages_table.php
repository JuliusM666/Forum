<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reciever_id')->references("id")->on("users");
            $table->foreignId('sender_id')->references("id")->on("users");
            $table->text("message");
            $table->boolean("is_seen")->default(false);
            $table->softDeletes();
            $table->boolean("deleted_for_sender")->default(false);
            $table->boolean("deleted_for_reciever")->default(false);
            $table->boolean("is_edited")->default(false);
            $table->timestamps();
            $table->index("created_at");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
