<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class TokenController extends Controller
{
    /**
     * Generate a new API token
     */
    public function generate(Request $request): JsonResponse
    {
        // Optional: Allow custom token name
        $tokenName = $request->input('name', 'api-token-' . Str::random(8));
        
        // Get or create a generic API user for token generation
        // This avoids needing actual user accounts
        $apiUser = \App\Models\User::firstOrCreate(
            ['email' => 'api@system.internal'],
            [
                'name' => 'API System',
                'password' => bcrypt(Str::random(32)),
            ]
        );
        
        // Generate token using Sanctum
        $token = $apiUser->createToken($tokenName);
        
        // Return the token
        return response()->json([
            'success' => true,
            'token' => $token->plainTextToken,
            'token_type' => 'Bearer',
            'name' => $tokenName,
            'created_at' => now(),
        ], 201);
    }
}
