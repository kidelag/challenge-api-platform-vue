<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use http\Client\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\HttpException;

#[AsController]
class ValidateAccountController extends AbstractController
{
    public function __construct(private RequestStack $requestStack, private EntityManagerInterface $manager)
    {

    }

    public function __invoke()
    {
        $token = $_GET['token'];
        try {
            if(false === $token) {
                throw new \Exception('Le token est manquant');
            }
            /**
             * @var User $user
             */
            $user = $this->manager->getRepository(User::class)->findOneBy(['token' => $token]);
            if(!$user) {
                throw new \Exception('Le token est invalide');
            }
            if($user->isValid()) {
                throw new \Exception('Votre compte est déjà valide');
            }
            $user->setToken(null);
            $user->setValid(true);
            $this->manager->persist($user);
            $this->manager->flush();
        } catch(\Exception $e) {
            return new JsonResponse($e->getMessage(), '401');
        }
        return new JsonResponse('Votre compte a été validé, vous pouvez maintenant vous connecter', '200');
    }
}
