<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FormerRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FormerRepository::class)]
#[ApiResource]
class Former
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'former', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\Column]
    private ?bool $valid = null;

    #[ORM\Column(length: 255)]
    private ?string $accountOwner = null;

    #[ORM\Column(length: 255)]
    private ?string $accountIban = null;

    #[ORM\Column(length: 255)]
    private ?string $accountBankName = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function isValid(): ?bool
    {
        return $this->valid;
    }

    public function setValid(bool $valid): self
    {
        $this->valid = $valid;

        return $this;
    }

    public function getAccountOwner(): ?string
    {
        return $this->accountOwner;
    }

    public function setAccountOwner(string $accountOwner): self
    {
        $this->accountOwner = $accountOwner;

        return $this;
    }

    public function getAccountIban(): ?string
    {
        return $this->accountIban;
    }

    public function setAccountIban(string $accountIban): self
    {
        $this->accountIban = $accountIban;

        return $this;
    }

    public function getAccountBankName(): ?string
    {
        return $this->accountBankName;
    }

    public function setAccountBankName(string $accountBankName): self
    {
        $this->accountBankName = $accountBankName;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }
}
