<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'description' => ['nullable', 'string'],
            'deadline' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['pending', 'active', 'finished'])],
        ];
    }
}
