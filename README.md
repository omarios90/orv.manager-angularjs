# AngularJS Manager<small><small> by Omar Rios</small></small>

## What does this package do?
This package is an AnugularJS Project Manager which creates the modular folder structure and intializes every file with its due dependencies. All have been set up to work with grunt so at the end you will have a "build" folder with all your javascript and css files minified.
This is the the folder structure you can create with this manager:
- **Projects:** They have as many modules as you want. It is also created with a base resource folder which will be common for all the mo
- **Modules:** Every module has it own *resource* folder, the main *app* file and a first *route* called home.
- **Resources:** A resource has directives, services, templates and extra controllers folders.

Also you can create these, but they require that you specify a existing module before:
- **Routes:** Each route adds a folder with a html template, a css style and controller. Also it adds automatically the rout in the main *app*.
- **Templates:** Each template adds a folder with a html template and a css style, ready to use with the name you defined plus the html extension. For instance the template name is "header" so you can use the template by writing "header.html".
- **Directives:** Each directive adds a folder with a html template, a css style and the javascript directive.
- **Controllers:** Each controler adds a single javascript file.
- **Services:** Each service adds a single javascript file.

> **Note:** You don't have to worry adding dependecies everytime you create any of these files. Everything have been set up for you to start writing content and avoid wasting time in adding dependecies.

## How to use it?
- Install this package via node:
`npm install orv.manager-angularjs`
- Install the Cli for this package:
`npm install -g orv.manager-angularjs-cli`
- Write the following json file with name "**orv.json**":
```
{
	"angularjs": {
		"project": "demo",
		"paths": {
			"build": "build",
			"index": "www"
		}
	}
}
```
- Customize the variables inside the *orv.json* file:
  - *project*: name of your project
  - *build*: path where grunt will generate your minified versions of javascript and css
  - *index*: path where will be exported your *index.html* file.
- Run **orv-angularjs-cli** and voilà.

## How do I get my minified files?
After you have created your first module you have to run:
- `npm grunt dev-*your_module_name*`
- `npm grunt dist-*your_module_name*`

> **dev** means *"development version"* which has the multiples files concatenated
> **dist** means *"distribution version"* which has the minified files from the development version. So, it requires that the development version is created first.

## Folder structures and files
### Project
```
/demo *
├── /frontend *
├── /resources *
│   ├── /base *
│   │   ├── /controllers *
│   │   │   ├── _init.js *
│   │   ├── /directives *
│   │   │   ├── _init.js *
│   │   ├── /services *
│   │   │   ├── _init.js *
│   │   ├── /templates *
│   │   │   ├── module1-demo.html *
│   │   ├── styles.css *
```
>**Note**: The template folder must have at least one file.

## Module
```
/demo
├── /frontend
│   ├── /module1 *
│   │   ├── /home * [this is a route]
│   │   │   ├── home.html *
│   │   │   ├── homeCtrl.js *
│   │   │   ├── home.css *
│   │   ├── module1App.js *
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1 *
│   │   ├── /controllers *
│   │   │   ├── _init.js *
│   │   ├── /directives *
│   │   │   ├── _init.js *
│   │   ├── /services *
│   │   │   ├── _init.js *
│   │   ├── /templates *
│   │   │   ├── module1-demo.html *
│   │   ├── styles.css *
```
>**Note**: The template folder must have at least one file.

## Resource
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   ├── /new_resource *
│   │   ├── /controllers *
│   │   │   ├── _init.js *
│   │   ├── /directives *
│   │   │   ├── _init.js *
│   │   ├── /services *
│   │   │   ├── _init.js *
│   │   ├── /templates *
│   │   │   ├── module1-demo.html *
``` 
>**Note**: The template folder must have at least one file.

## Route
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── /route1 *
│   │   │   ├── route1.html *
│   │   │   ├── route1Ctrl.js *
│   │   │   ├── route1.css *
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   ├── ...
``` 
>**Note**: The template folder must have at least one file.

## Templates
For the "module1" module
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   │   ├── /templates
│   │   │   ├── template1 *
│   │   │   │   ├── template1.html *
│   │   │   │   ├── template1.css *
``` 
>**Note**: The template folder must have at least one file.


## Directives
For the "module1" module
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   │   ├── /directives
│   │   │   ├── directive1 *
│   │   │   │   ├── directive1.css *
│   │   │   │   ├── directive1.html *
│   │   │   │   ├── directive1.js *
``` 


## Controllers
For the "module1" module
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   │   ├── /controllers
│   │   │   ├── controller1Ctrl.js *
│   │   │   │── ...
``` 
>**Note**: The template folder must have at least one file.


## Services
```
/demo
├── /frontend
│   ├── /module1
│   │   ├── ...
├── /resources
│   ├── /base
│   │   ├── ...
│   ├── /module1
│   │   ├── ...
│   │   ├── /services
│   │   │   ├── service1.js *
│   │   │   │── ...
``` 
