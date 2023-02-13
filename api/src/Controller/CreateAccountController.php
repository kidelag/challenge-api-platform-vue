<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class CreateAccountController extends AbstractController
{
    public function __construct(private RequestStack $requestStack, private EntityManagerInterface $manager, private UserPasswordHasherInterface $passwordHasher)
    {

    }
    public function __invoke()
    {
        $request = $this->requestStack->getCurrentRequest();
        $datas = json_decode($request->getContent());
        $user = new User();
        $user->setMail($datas->mail)
             ->setRoles($datas->role)
             ->setPassword($this->passwordHasher->hashPassword($user, $datas->password));
        return $user;

        /**
         * Patch
         * Droits
         * Token donc VOTER
         * Voter va tester qui a le droit de modifier le mot de passe
         * => ADMIN ou MOI MEME = OK
         * => SINON SI je suis pas connecté, autre URI avec un TOKEN
         */
    }
}
