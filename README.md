## One Hundred Questions
    *This is an active repository*
    *Application has active users*

Hosted on caseyasher.info at [/apps/OneHundredQuestions](http://www.caseyasher.info/apps/OneHundredQuestions/).

This webapp's aim is to provide a place where couples can ponder and answer one hundred of the most common pre-marital counseling questions in a format that is convenient and retains the answers for years to come.

#### Tools Used
Angular 8.3, Spring Boot, Java, Typescript, Javascript, HTML, CSS, MySql

#### Testing
JUnit 5, Postman
(Jasmine and Karma testing soon to be implemented)

#### Planned Updates
* Text input prompts (validation) for a better user-experience.
  - message for incorrect login information
  - message for failed account update
  - message for failed account creation
* Numbered questions
* Visual indication for answered questions without expanding panel
* Characters remaining in text box
* An indication for saved vs non-saved answer
* Filter questions by category (example: hide questions about parenting for couples who have no desire for children)
* Export of data to PDF


#### Changelog
December 8th:  
  - Fixed an issue that prevented expansion of panel for accounts that don't have a partner's username associated
  - user profile update no longer saves empty passwords if the user is not updating their password

December 6th, 2019: Complete overhaul for scalability.
