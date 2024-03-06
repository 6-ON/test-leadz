<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Book;
use App\Factory\AuthorFactory;
use App\Factory\BookFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class BooksTest extends ApiTestCase
{
    use ResetDatabase, Factories;

    public function testGetAllBooks(): void
    {
        AuthorFactory::createMany(10);
        BookFactory::createMany(100);
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/api/books');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/api/contexts/Book',
            '@id' => '/api/books',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
            'hydra:view' => [
                '@id' => '/api/books?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/api/books?page=1',
                'hydra:last' => '/api/books?page=4',
                'hydra:next' => '/api/books?page=2',
            ],
        ]);

        // Because test fixtures are automatically loaded between each test, you can assert on them
        $this->assertCount(30, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(Book::class);
    }
    public function testGetOneBook(): void
    {
        $author = AuthorFactory::createOne();
        $book = BookFactory::createOne();
        $response = static::createClient()->request('GET', '/api/books/' . $book->id);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => '/api/books/' . $book->id,
            '@type' => 'Book',
            'title' => $book->title,
            'author' => [
                '@id' => '/api/authors/' . $author->id,
                '@type' => 'Author',
                'id' => $author->id,
                'firstName' => $author->firstName,
                'lastName' => $author->lastName,
                'bibliography' => $author->bibliography,
                'fullName' => $author->getFullName(),

            ],
            'description' => $book->description,
            'genre' => $book->genre,
            'publicationDate' => $book->publicationDate->format('Y-m-d\TH:i:sP'),
            'reviews' => [],
        ]);
        $this->assertMatchesResourceItemJsonSchema(Book::class);
    }

    public function testCreateBook(): void
    {
        $author = AuthorFactory::createOne();
        $response = static::createClient()->request('POST', '/api/books', [
            'json' => [
                'title' => 'The new book',
                'author' => '/api/authors/' . $author->id,
                'description' => 'The new book description',
                'genre' => 'Science fiction',
                'publicationDate' => '2021-01-01T00:00:00+00:00',
            ],
            'headers' => [
                'Content-Type' => 'application/ld+json',
            ],
        ]);
        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            '@context' => '/api/contexts/Book',
            '@type' => 'Book',
            'description' => 'The new book description',
            'genre' => 'Science fiction',
            'title' => 'The new book',
            'author' => '/api/authors/' . $author->id,
            'publicationDate' => '2021-01-01T00:00:00+00:00',
            'reviews' => [],
        ]);
    }

    public function testUpdateBook(): void
    {
        $book = BookFactory::createOne();
        $response = static::createClient()->request('PATCH', '/api/books/' . $book->id, [
            'json' => [
                'title' => 'The updated book',
            ],
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => '/api/books/' . $book->id,
            '@type' => 'Book',
            'title' => 'The updated book',
        ]);
    }
    public function testDeleteBook(): void
    {
        $book = BookFactory::createOne();
        $bookId = $book->id;
        $response = static::createClient()->request('DELETE', '/api/books/' . $book->id);
        $this->assertResponseStatusCodeSame(204);
        $response = static::createClient()->request('GET', '/api/books/' . $bookId);
        $this->assertResponseStatusCodeSame(404);
    }
}
