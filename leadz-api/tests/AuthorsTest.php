<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Factory\AuthorFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

use function Zenstruck\Foundry\faker;

class AuthorsTest extends ApiTestCase
{
    use ResetDatabase, Factories;

    public function testGetAllAuthors(): void
    {
        AuthorFactory::createMany(100);
        $response = static::createClient()->request('GET', '/api/authors');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/Author',
            '@id' => '/api/authors',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 100,
        ]);
    }
    public function testGetOneAuthor(): void
    {
        $author = AuthorFactory::createOne();
        $response = static::createClient()->request('GET', '/api/authors/' . $author->id);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => '/api/authors/' . $author->id,
            '@type' => 'Author',
            'firstName' => $author->firstName,
            'lastName' => $author->lastName,
        ]);
    }
    public function testCreateAuthor(): void
    {
        $response = static::createClient()->request('POST', '/api/authors', [
            'json' => [
                'firstName' => 'John',
                'lastName' => 'Doe',
                'bibliography' => faker()->realText(),
            ],
            'headers' => [
                'Content-Type' => 'application/ld+json',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@context' => '/api/contexts/Author',
            '@type' => 'Author',
            'firstName' => 'John',
            'lastName' => 'Doe',
        ]);
    }
    public function testUpdateAuthor(): void
    {
        $author = AuthorFactory::createOne();
        $response = static::createClient()->request('PATCH', '/api/authors/' . $author->id, [
            'json' => [
                'firstName' => 'Cristpher',
            ],
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => '/api/authors/' . $author->id,
            '@type' => 'Author',
            'firstName' => 'Cristpher',
        ]);
    }
    public function testDeleteAuthor(): void
    {
        $author = AuthorFactory::createOne();
        $authorId = $author->id;
        $response = static::createClient()->request('DELETE', '/api/authors/' . $author->id);
        $this->assertResponseStatusCodeSame(204);
        $response = static::createClient()->request('GET', '/api/authors/' . $authorId);
        $this->assertResponseStatusCodeSame(404);
    }
}
