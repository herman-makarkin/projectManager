<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request('sort_field', 'created_at');
        $sortMode = request('sort_mode', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

        $users = $query->orderBy($sortField, $sortMode)->paginate(10)->onEachSide(1);
        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia(("User/Create"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        // $image = $data['image'] ?? null;
        // $data['creator'] = Auth::id();
        // $data['updated_by'] = Auth::id();

        // if ($image) {
        //     $data['image_path'] = $image->store('user/' . Str::random(), 'public');
        // }

        User::create($data);
        return to_route('user.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user;
        // $sortField = request('sort_field', 'created_at');
        // $sortMode = request('sort_mode', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        //$tasks = $user->tasks()->orderBy($sortField, $sortMode)->paginate(10);
        return Inertia('User/Show', [
            'user' => new UserCrudResource($user),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        // $data['email_verified_at'] = time();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        // $image = $data['image'] ?? null;
        // if ($image) {
        //     if ($user->image_path) {
        //         Storage::disk('public')->delete($user->image_path);
        //     }
        //     $data['image_path'] = $image->store('user/' . Str::random(), 'public');
        // }
        $user->update($data);

        return to_route('user.index')->with('success', "User \"$user->name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $userName = $user->name;
        // if ($user->image_path) {
        //     Storage::disk('public')->delete($user->image_path);
        // }
        $user->delete();

        return to_route('user.index')->with('success', "User \"$userName\" deleted successfully");
    }
}
