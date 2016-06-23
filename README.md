# Alexa

This repository provides instructions and sample code to help you create
an Alexa skill.

I've used information from a several sources, including the Amazon developer doc,
a [one hour tutorial](https://developer.amazon.com/public/community/post/TxDJWS16KUPVKO/New-Alexa-Skills-Kit-Template-Build-a-Trivia-Skill-in-under-an-Hour)
by Kevin Utter, and some collaboration with my buddies Dan, Don and Sean.
Thanks, guys!

My intent is to fill in some gaps, provide answers to some puzzles that
we ran into, and provide an easy to use template for projects.

## What you will need

1. A free Amazon Web Services (AWS) account
1. A free account on the Amazon developer portal

The Alexa Skills Kit provides a simulator to help testing your code.
This allows you to type what you would say, instead of talking to an
actual Echo device. You will need an Amazon Echo to actually speak to.
But this allows anyone to experiment with Alexa support, even if they
don't own or have access to an Echo.

## Create an AWS Account

An AWS account is free, but you will need a valid credit card to setup
an account.
1. Go to aws.amazon.com and choose Create a Free AWS Account.
2. Follow the instructions. Don't worry about the IAM role,
we'll do that later.
2. You'll need to enter your credit card info, even though this is a
free tier.
2. Follow the confirmation process to activate your account.
1. Sign into the Console
2. It may take awhile for your new account to become active.
2. You will receive an email when your account is activated

## Create a free Amazon Develop Portal account

1. Go to developer.amazon.com and then select Alexa
1. Select Create Free Account (in the upper right)
2. Follow the instructions to create your account

## Starting with a Simple Skill

Amazon has named code that extends Alexa a "Skill", as opposed to an "app"
or a "program". For this example, we're going to create a simple skill,
keeping it about as simple as possible.
Once you know how to get something simple working, I think that you will
find it easy to extend to handle more complex interactions.

## Wake Word

In order to interact with Echo, the user must first wake it up.
This is done by speaking the word "Alexa" (or Echo or Amazon if the default is changed). 
Once awoken, Alexa then listens for an invocation name to select the skill to invoke.

## Invocation Name

So the first thing that a skill needs is an invocation name.
It is the thing that causes Alexa to launch your Skill.
The Amazon Doc [Choosing the Invocation Name for an Alexa
Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill)
provides a lot of information about choosing a good invocation name,
but basically it needs to be several syllables long, and best if not
similar to words that Alexa already recognizes as a command.
So the phrase "hello world" is pretty good, since it is fairly unique and
3 syllables. But using the word "weather" would not be good because
Alexa already responds to that word.

## Creating a simple Hello World Alexa Skill

So now that your accounts are setup, and you've decided what invocation
name to use, we're ready to go ahead an create a new Alexa Skill. 
You'll need to do 2 things:

1. Create a web service that will process the voice input
  * We'll create an AWS lambda function to do this.
  * Don't worry, this will be mostly cut-and-paste, and you can edit it to your liking later.
2. Use the Alexa Skill Kit portal to configure our Alexa skill
  * List the sentences that Alexa will recognize
  
## Create an AWS Lambda Function

This is probably the most difficult part of this process.
I've tried to simplify it as much as possible.
I recommend that you keep it simple until everything is working,
and only then go back and make any desired modifications.

The first step will be to upload the javascript files included in
this package to your AWS account. I recommend that you upload the
files as-is and get everything working before making changes.

### Editing the Javascript Files

The javascript files are located in the HelloWorld/source folder of the repository.
1. The AlexaSkill.js file is boiler plate code, and does not
   need to be edited at all.
2. index.js is code that you can edit to create your skill.
3. Now save your changes, and zip both files up in a single archive file.
  You'll need the archive file in the next section.

### Configure the Lambda Function

1. Sign into your AWS account console
2. Select ***US East (N. Virginia)*** region (upper right)
3. Select ***lambda*** in compute services.
4. Select the ***Skip*** button in the bottom right to skip
selecting a blueprint.
This should take you to the "Configure Function" screen.
5. Enter a ***Name*** and ***Description*** of your choosing.
6. Set Runtime to ***node.js***
7. Set Code entry type to ***Upload a .ZIP file***
8. Click the ***Upload*** button, and select the archive file
   containing the javascript files you edited in the previous
   section.
9. Select ***Next***
10. Select ***Create Function***
    Now that you've created the function, this page will appear
    different when you come back later. You can upload new code,
    but a Save button will appear in the top left instead of the
    Create Function button in the bottom right.
11. Select the ***Configuration*** tab
  * Leave handler as ***"index.handler"***
  * Set role to ***lambda_basic_execution***
  * Enter a description as you wish
12. You will be prompted for an IAM role if not previously done
  * Leave the Advanced settings as default, and select ***Next***
  * Select ***Create your Function***
13. Select the ***Event sources*** tab
  * Select ***Add event source***
  * Select type ***Alexa Skill Kit***
14. Copy the ARN information displayed in the upper right.
It should look something like
"arn:aws:lambda:us-east-1:123456789012:function:GeeWhizGame"
Copy everything after the leading "ARN -".
We'll paste that into the Alexa portal in the upcoming steps.
I recommend that you leave this page open so you can copy
the ARN later when it is needed.

**Congratulations!** You've completed the part that I found most difficult.
Hopefully it was easier for you.

## Setup Skill in the Develop Portal

Now you will tell Alexa about the sentences you want it to
recognize, and provide the link to the lambda function just created.

1. Sign into the
[Alexa Skills Kit Portal](https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit)
by selecting ***SIGN IN*** in the upper right.
2. Select the ***APPS & SERVICES*** tab
3. Select ***Alexa*** in the horizontal menu near the top.
4. Select the ***Alexa Skills Kit*** Get Started button.
You may want to bookmark this page.
5. Select ***Add a New Skill***
6. Provide a name of your choosing (eg. "HelloWorld")
7. Provide the invocation words (eg. "hello world")
8. Provide a version number of your choosing (eg. "1.0")
9. Set the Endpoint to ***Lambda ARN (Amazon Resource Name)***
10. Copy into the Endpoint field the ARN that you previously copied.
You can go back to the AWS console and copy it again if needed,
or if you copied the wrong text.
11. Click ***Next***
    You may receive an error here if the lambda function event source
    wasn't set to Alexa Skills Kit. Go back to AWS and do so, then try
    Next again.

### Interaction Model
The above steps should result in display of the Interaction Model page.
This is where we will define the things that we can say to Alexa.

1. Copy and paste the contents of the IntentSchema.json file from the
   speechAssets folder into the Intent Schema section.
2. Ignore the slot section for this skill.
3. Copy and paste the contents of the SampleUtterances.txt file from
   the speechAssets folder into the Sample Utterances section.
4. Select ***Next***

And this will bring you to the test page. You're ready to test your new skill.

**Testing Your Skill**

There are several ways to test the new skill.

* Enter text into the **Enter Utterance** field on the Alexa test page.
* If you have an Echo, and it is associated with your account, you can test
right away by speaking "Alexa, tell <invocation words> hello"

## Debugging

There are a couple tools available for debugging:

* Alexa Skills Kit Test Page***
You can use the Alexa Skills Kit test page to Enter Utterances, and view the
JSON that is sent to and received from the Lambda function.

* AWS CloudWatch
From the AWS Lambda Functions page for your Lambda function, select the
Monitoring tab, then click ***View logs in CloudWatch***.
This will display the console output from the Lambda Function.
Be observant of the timestamps of the logs.
You will probably need to refresh each time you rerun the test.
Note that sometimes logs are grouped together, so instead of generating
a new timestamped log, the entries are put into the bottom of the previous log.

### References

* [One Hour Tutorial](https://developer.amazon.com/public/community/post/TxDJWS16KUPVKO/New-Alexa-Skills-Kit-Template-Build-a-Trivia-Skill-in-under-an-Hour)
* [Particle_Alexa package on GitHub](https://github.com/krvarma/Particle_Alexa)
* [Amazon AWS](https://aws.amazon.com)
* [Alexa Skills Kit Portal](https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit)
* [Choosing the Invocation Name for an Alexa
Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill)
