# Monogo Test task

**Goal:**
- Deliver 3 test cases automated using playwright with TypeScript
  - Verify if it is possible to add a product to the cart.
  - Verify if it is possible to remove a product from the cart.
  - Verify if there are any broken links or images on the product page.

---
**Note for reviewer:**
- I know You can set up the env variable inside of playwright.config.ts and you can use the the .ENV file, however is see that option as weird, especialy if there is no option to call them from command line :) 
- I added different raw implementation that honestly can also be used with the .env or any other config file to store the env setting.

- Additionally the test should be able to be run on both envs like the UK and PL one. Thats not really true with the setting it was set up in the email with using the ploom-x-advanced since that is only available in the shop of the UK not in the PL one. 
And since we are grabbing the item by the SKU we wont find it. 
- To fix this i would deffinitly set a Test data per Env if there are different Items per env.

- Some steps are wrapped in unecessary test.step just for fun to make it look better in the UI runner ^^


