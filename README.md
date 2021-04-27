# Description: 
This framework is based on MochaJs and uses selenium-webdriver apis for nodeJs. The preferred language used for writing the test code is Typescript.

# Structure: 
The framework consists of the following structure: 
    
    **Root**
      |

      **PageObjects** - Containing the ppage object model styled files to keep the locators and functions together for specific pages
      |

      **support** - Contains files like hooks.ts and other important code files to keep the framework together.
      |

      **test** - Containing the specification files.
    

# General walkthrough:
1. When the runner is invoked, the mocha support hooks defined in **hooks.ts** invoke and create and store a webdriver session within the test context of mocha.
2. When the test runner reaches the spec file, the webdriver session based on the capabilities passed, is already open and the tests can successfully launch.
3. When a specific page object class is invoked in the test, the driver instance is passed to it and the locators associated with that page get stored in the memory. The locators are decided and stored as per the general strategy in **locator.ts** class. There are some locators which dont pass through the class and are created on the go for simplicity purposes. 
4. After the test finishes, the root hook, AfterEach checks for the tests status and if it has a failed status, it invokes a webdriver call to capture screenshot and write to a new png file. 
5. The screenshot gets saved in the results folder under `results/mochawesome-report/assets`. A HTML format report is also generated for the user to check. It can be found in a file of name type: `results/mochawesome-report/mochawesome*.html` 
6. You can also find the screenshot for the captured failed scenario embedded in the html report.

# Pre-requisites: 
You need a nodejs environment to be able to run these tests.
It can be dowloaded from: [NodeJs](https://nodejs.org/en/download/)

For the purpose of this project, I preferred using yarn as my preferred node package manager.
It can be downloaded using a command like: ```npm install --global yarn```
Alternatively, follow the link for instructions: [YarnPkg](https://classic.yarnpkg.com/en/docs/install#mac-stable)


# Steps to run tests:
1) Install node modules - `yarn install`
2) Run TestS: `yarn run test`


# Important/Useful information: 
1) Results store under `results` folder on the root.
2) Test/Spec folder location: `test` folder on the root.
3) A Test called `should see the request access section on the page` has been made to fail **intentionally** to **demonstrate reporting**.


Additionally: 
The repository also contains the files for:

a) Mindset Exercises

b) Exploratory Testing

c) MindMap screenshots for Exploratory Testing