# Calendar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

# Prerequisites
install node from this link (https://nodejs.org/en/download/)
install ng cli from this link (https://cli.angular.io/)

# Getting started

1. Go to project folder and install dependencies:
 ```sh
 npm install
 ```

2. start project, and open `localhost:4200` in your browser:
 ```sh
 ng serve
 ```
# My solution to the problem

1. Go through all the events in the input list and create an array of new objects with few essential properties in it to help further calculations.

2. A container(620px * 720px) is assumed as two dimentional matrix
where 720 is the rows count and column as the number of events in the input array. Initially they will have null values in it.

3. Next for all the events in the input list, i will loop through the matrix and register a particular event in the first available column according to event's start time. 

4. If events collide in time and there is already occupied event in a perticular rows it searches next available column of the same row in the matrix and register it 

5. I make a note of these collision events and group them together in a seperate array. Events which do not collide will not belong to any group, they are plotted separately

6. Next step will be looping through all the grouped collision events till the events height and check in a particular row, what is the maximun number of occupied colums. This gives the count of collision events in that row, and width for those collision events are devided equally and plotted.
For the no collision events whole width is considered.  

 ```



