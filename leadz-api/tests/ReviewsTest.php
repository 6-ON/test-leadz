<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Factory\BookFactory;
use App\Factory\ReviewFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

use function Zenstruck\Foundry\faker;

class ReviewsTest extends ApiTestCase
{
    use ResetDatabase, Factories;

    public function testGetOneReview(): void
    {
        $review = ReviewFactory::createOne();
        $response = static::createClient()->request('GET', '/api/reviews/' . $review->id);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => '/api/reviews/' . $review->id,
            '@type' => 'Review',
            'comment' => $review->comment,
            'email' => $review->email,
            'fullName' => $review->fullName,
        ]);
    }
    public function testCreateReview(): void
    {
        $book = BookFactory::createOne();
        $response = static::createClient()->request('POST', '/api/reviews', [
            'json' => [
                'book' => '/api/books/' . $book->id,
                'comment' => 'This is a great book!',
                'email' => faker()->email(),
                'fullName' => faker()->name(),
            ],
            'headers' => [
                'Content-Type' => 'application/ld+json',
            ],
        ]);
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@context' => '/api/contexts/Review',
            '@type' => 'Review',
            'comment' => 'This is a great book!',
        ]);
    }
}
