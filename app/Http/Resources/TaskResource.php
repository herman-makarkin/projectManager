<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'deadline' => (new Carbon($this->deadline))->format('Y-m-d'),
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            'project' => new ProjectResource($this->project),
            'project_id' => $this->project_id,
            'creator' => new UserResource($this->createdBy),
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'assigned_user_id' => $this->assigned_user_id,
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
