<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        //FIXME
        $user = Auth::user();
        $myTasks =
            $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()->where('assigned_user_id', $user->id)->where('status', 'pending')->count();

        $totalActiveTasks = Task::query()->where('status', 'active')->count();
        $myActiveTasks = Task::query()->where('assigned_user_id', $user->id)->where('status', 'active')->count();

        $totalFinishedTasks = Task::query()->where('status', 'finished')->count();
        $myFinishedTasks = Task::query()->where('status', 'finished')->where('assigned_user_id', $user->id)->count();

        $currentTasks = Task::query()->where('assigned_user_id', $user->id)->whereIn('status', ['pending', 'active'])->limit(10)->get();
        $currentTasks = TaskResource::collection($currentTasks);

        //dd($myTasks);
        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalActiveTasks', 'myFinishedTasks', 'myActiveTasks', 'totalFinishedTasks', 'currentTasks'));
    }
}
