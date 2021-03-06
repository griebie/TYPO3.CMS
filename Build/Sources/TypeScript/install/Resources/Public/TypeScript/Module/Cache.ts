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

import {InlineModuleInterface} from './InlineModuleInterface';
import * as $ from 'jquery';
import Router = require('../Router');
import Notification = require('TYPO3/CMS/Backend/Notification');

/**
 * Module: TYPO3/CMS/Install/Module/Cache
 */
class Cache implements InlineModuleInterface {
  public initialize($trigger: JQuery): void {
    $.ajax({
      url: Router.getUrl('cacheClearAll', 'maintenance'),
      cache: false,
      beforeSend: (): void => {
        $trigger.addClass('disabled');
      },
      success: (data: any): void => {
        if (data.success === true && Array.isArray(data.status)) {
          if (data.status.length > 0) {
            data.status.forEach(((element: any): void => {
              Notification.success(element.title, element.message);
            }));
          }
        } else {
          Notification.error('Something went wrong clearing caches');
        }
      },
      error: (): void => {
        // In case the clear cache action fails (typically 500 from server), do not kill the entire
        // install tool, instead show a notification that something went wrong.
        Notification.error(
          'Clearing caches went wrong on the server side. Check the system for broken extensions or missing database tables and try again',
        );
      },
      complete: (): void => {
        $trigger.removeClass('disabled');
      },
    });
  }
}

export = new Cache();
