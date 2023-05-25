import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }];

// Registering Syncfusion license key
registerLicense(
  'Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfR19iSH1Rf0VjX35bdA==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jTHxSd0ZhUH9edndQQg==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtRd0RgW3ZecHJRTmQ=;MjEzNTM2MkAzMjMxMmUzMjJlMzNKa3l1NmdDNCswRWx1NmhxVDRmY3BCNitsOFFyeUsyelJnblZZRFpKUW93PQ==;MjEzNTM2M0AzMjMxMmUzMjJlMzNKVGFwOHFNRzg5RjJ4MlVqS2xhdW9qLzZ2M0JjcnFPUFkzV0FITkxKQzY0PQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdERiWn1XcHRSRWNY;MjEzNTM2NUAzMjMxMmUzMjJlMzNlNHI0aWZBTk9lbTlBQjB2OEQyQ05YU2dJK1RUYmJMY0t6d1RmcklGSlNZPQ==;MjEzNTM2NkAzMjMxMmUzMjJlMzNMOElRMzhBaldZZFM4Ynord3diMnQyNERmK04rYndwcGRTSzMxZ3RsWlZ3PQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXtRd0RgW3ZecHxVRWQ=;MjEzNTM2OEAzMjMxMmUzMjJlMzNCR05qYmNzMkE3bGdmVG82VzhXMHJmS3JIVy9NRmRiN1AzcEN2S1liMDJjPQ==;MjEzNTM2OUAzMjMxMmUzMjJlMzNRMUZpdysvVmgzTVJLVHlkMlZ3blB4dlFUNzNmRzBoRjNwa0lBbEE2dkZNPQ==;MjEzNTM3MEAzMjMxMmUzMjJlMzNlNHI0aWZBTk9lbTlBQjB2OEQyQ05YU2dJK1RUYmJMY0t6d1RmcklGSlNZPQ=='
);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
