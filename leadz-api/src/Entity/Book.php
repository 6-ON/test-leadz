<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['book:collection']]
        ),
        new Get(
            normalizationContext: ['groups' => ['book:read']]
        ),
        new Post(),
        new Patch(),
        new Delete()
    ],

)]
#[ApiFilter(
    SearchFilter::class,
    properties: ['title' => 'ipartial', 'author.id' => 'exact', 'genre' => 'ipartial']
)]
class Book
{



    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["book:read", 'book:collection'])]
    public ?int $id = null;




    #[ORM\Column(type: "string")]
    #[Assert\NotBlank]
    #[Groups(["book:read", 'book:collection', 'author:read'])]
    public string  $title;




    #[ORM\Column(type: "text")]
    #[Assert\NotBlank]
    #[Groups(["book:read", 'book:collection', 'author:read'])]
    public  string $description;




    #[ORM\Column]
    #[Assert\NotNull]
    #[Groups(["book:read", 'book:collection', 'author:read'])]
    public ?\DateTimeImmutable $publicationDate = null;




    #[ORM\Column(type: "string")]
    #[Assert\NotBlank]
    #[Groups(["book:read", 'book:collection', 'author:read'])]
    public string $genre;



    #[ORM\ManyToOne(targetEntity: Author::class, inversedBy: "books")]
    #[Assert\NotBlank]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["book:read", 'book:collection'])]
    public ?Author $author = null;




    #[ORM\OneToMany(targetEntity: Review::class, mappedBy: "book")]
    #[Groups(["book:read", 'book:collection', 'author:read'])]
    public iterable $reviews;


    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }
}
