# Description: 
This framework is based on Mocha-JS and uses Selenium-Webdriver apis for NodeJs. The preferred language used for writing the test code is Typescript.

# Structure: 
The framework consists of the following structure: 
    
    **Root**
      |

      **PageObjects** - Containing the page object model styled files to keep the locators and functions together for specific pages
      |

      **support** - Contains files like hooks.ts and other important code files to keep the framework together.
      |

      **test** - Containing the specification files.
    

# General walkthrough:
1. When the runner is invoked, the mocha support hooks defined in **hooks.ts** invoke and create and store a webdriver session within the test context of mocha.
2. When the test runner reaches the spec file, the webdriver session based on the capabilities passed, is already open and the tests can successfully launch.
3. When a specific page object class is invoked in the test, the driver instance is passed to it and the locators associated with that page get stored in the memory. The locators are decided and stored as per the general strategy in **locator.ts** class. There are some locators which dont pass through the class and are created on the go for simplicity purposes. 
4. The code ensures that password cipherText is successfully decrypted at runtime. I would have ideally passed the passwords as part of CLI server envs or as a local variable on the command line. 
In order to achieve encryption of my password, I ran `yarn encrypt` script define in package.json which accepts a command line variable as a string and returns the cipherText. This cipherText is passed ito the `decryptPassword` defined in `Utils.ts` which decrypts the cipherText and returns the value of the password which is then set to the password field on the UI.
5. After the test finishes, the root hook, AfterEach checks for the tests status and if it has a failed status, it invokes a webdriver call to capture screenshot and write to a new png file. 
6. The screenshot gets saved in the results folder under `results/mochawesome-report/assets`. A HTML format report is also generated for the user to check. It can be found in a file of name type: `results/mochawesome-report/mochawesome*.html` 
7. You can also find the screenshot for the captured failed scenario embedded in the html report.

# Pre-requisites: 
You need a nodejs environment to be able to run these tests.
It can be dowloaded from: [NodeJs](https://nodejs.org/en/download/)

For the purpose of this project, I preferred using yarn as my preferred node package manager.
It can be downloaded using a command like: ```npm install --global yarn```
Alternatively, follow the link for instructions: [YarnPkg](https://classic.yarnpkg.com/en/docs/install#mac-stable)


# Steps to run tests:
1) Install node modules - `yarn install`
2) Run Tests: `yarn run test`
3) The tests can also be run under headless mode : `yarn run test:headless`

# Encrypting new password for users if needed: 
1) Setup a new password using the app UI.
2) From the root of this repository, run `arn run encrypt ${word:-<yourpassword>}`
3) This will generate a new cipherText on the console.
4) Copy this text and update `Constants` file and change the value of `passwordCipherText` variable with this new cipherText.

# Making changes to the code: 
1) Ensure to run `yarn clean-build`
2) Ensure to also check the lint with the following commands:
   `yarn lint` - Will show you the errors if any.
   `yarn pretty` - Will fix most errors and warnings for you.
3) Ensure that the project compiles in both lint and typescript compiler sense of things.   


# Important/Useful information: 

1) Results store under `results` folder on the root.

2) Test/Spec folder location: `test` folder on the root.

3) A Test called `should not be able to edit the page if user navigates to the edit page directly` has been made to fail **intentionally** to **demonstrate reporting**.


Additionally: 
The repository also contains the files for:

a) Mindset Exercises - Mindset Exercise.docx

b) Exploratory Testing - Exploratory Test Task.docx


Potentially and issue / also an observation worth asking question for: 

If a user with no permissions to view or edit the page, goes to the edit page link directly, they see the `Editing is restricted for this content` section along with the `Request access` button but I noticed that the page was missing the top navigation section.
This could potentially be an issue for an in-experienced user. This could potentially also be an annoyance for the users in general to go
back to the home page using a direct url for the confluence home.