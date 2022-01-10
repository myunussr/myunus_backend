<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

    public function index()
    {
        $articles = Article::with('user')->get();

        return response()->json([
            "success" => true,
            "message" => "List Articles",
            "data" => $articles,
        ]);
    }


    public function store(ArticleRequest  $request)
    {
        $data = $request->all();

        $data['slug'] = Str::slug($request->title);
        $data['user_id'] = Auth::user()->id;
        $article = Article::create($data);

        return response()->json([
            "success" => true,
            "message" => "Article created successfully.",
            "data" => $article
        ]);
    }


    public function show($id)
    {
        return response()->json([
            "success" => true,
            "message" => "Article retrieved successfully.",
            "data" => Article::findOrFail($id)
        ]);
    }

    public function update(ArticleRequest $request, Article $article)
    {
        $data = $request->all();

        $article = Article::findOrFail($article->id);
        $data['slug'] = Str::slug($request->title);
        $article->update($data);

        return response()->json([
            "success" => true,
            "message" => "Article updated successfully.",
            "data" => $article
        ]);
    }


    public function destroy(Article $article)
    {
        $article = Article::findOrFail($article->id);
        $article->delete();

        return response()->json([
            "success" => true,
            "message" => "Article deleted successfully.",
            "data" => $article
        ]);
    }
}
