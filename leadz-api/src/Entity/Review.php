<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["book:read"])]
    public $id;

    #[ORM\Column(type: "string")]
    #[Assert\NotBlank]
    #[Groups(["book:read"])]
    public $fullName;

    #[ORM\Column(type: "string")]
    #[Assert\Email]
    #[Groups(["book:read"])]
    public $email;

    #[ORM\Column(type: "text")]
    #[Assert\NotBlank]
    #[Groups(["book:read"])]
    public $comment;

    #[ORM\Column]
    #[ApiProperty(writable: false)]
    #[Groups(["book:read"])]
    public ?\DateTimeImmutable $creationDate = null;

    #[ORM\ManyToOne(targetEntity: Book::class, inversedBy: "reviews")]
    #[JoinColumn(nullable: false)]
    public ?Book $book = null;

    #[ORM\PrePersist]
    public function prePersist()
    {
        $this->creationDate = new \DateTimeImmutable();
    }
}
