<?php
namespace TYPO3\CMS\Extbase\Tests\Unit\Error;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

/**
 * Test case
 */
class ErrorTest extends UnitTestCase
{
    /**
     * @test
     */
    public function theConstructorSetsTheErrorMessageCorrectly()
    {
        $errorMessage = 'The message';
        $error = new \TYPO3\CMS\Extbase\Error\Error($errorMessage, 0);
        $this->assertEquals($errorMessage, $error->getMessage());
    }

    /**
     * @test
     */
    public function theConstructorSetsTheErrorCodeCorrectly()
    {
        $errorCode = 123456789;
        $error = new \TYPO3\CMS\Extbase\Error\Error('', $errorCode);
        $this->assertEquals($errorCode, $error->getCode());
    }
}
