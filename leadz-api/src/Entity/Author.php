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
            normalizationContext: ['groups' => ['author:collection']]
        ),
        new Get(
            normalizationContext: ['groups' => ['author:read']]
        ),
        new Post(),
        new Patch(),
        new Delete()
    ]
)]

#[ApiFilter(
    SearchFilter::class,

    properties: ['firstName' => 'ipartial', 'lastName' => 'ipartial']
)]
class Author
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["book:read",'book:collection', 'author:collection', 'author:read'])]
    public ?int $id = null;




    #[ORM\Column(type: "string")]
    #[Assert\NotBlank]
    #[Groups(["book:read",'book:collection', 'author:collection', 'author:read'])]
    public string $firstName;




    #[ORM\Column(type: "string")]
    #[Assert\NotBlank]
    #[Groups(["book:read",'book:collection', 'author:collection', 'author:read'])]
    public  string $lastName;





    #[ORM\Column(type: "text")]
    #[Assert\NotBlank]
    #[Groups(["book:read",'book:collection', 'author:collection', 'author:read'])]
    public string $bibliography;




    /**
     * @var Book[]|ArrayCollection
     */
    #[ORM\OneToMany(targetEntity: Book::class, mappedBy: "author")]
    #[Groups(['author:collection', 'author:read'])]
    public iterable $books;





    // Constructor
    public function __construct()
    {
        $this->books = new ArrayCollection();
    }

    #[Groups(["book:read",'book:collection', 'author:collection', 'author:read'])]
    public function getFullName(): string
    {
        return $this->firstName . ' ' . $this->lastName;
    }
}
