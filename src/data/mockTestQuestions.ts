export const mockTestQuestions = {
  1: { // HTML
    id: 1,
    subject: "HTML",
    title: "HTML Fundamentals Test",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which HTML element is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<header>"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "Which attribute is used to specify the URL of a page that the link goes to?",
        options: ["src", "href", "link", "url"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the correct HTML for making a checkbox?",
        options: ["<input type='check'>", "<input type='checkbox'>", "<checkbox>", "<check>"],
        correctAnswer: 1
      },
      {
        id: 6,
        question: "Which HTML element defines navigation links?",
        options: ["<navigation>", "<navigate>", "<nav>", "<navlink>"],
        correctAnswer: 2
      },
      {
        id: 7,
        question: "What is the correct HTML for creating a hyperlink?",
        options: ["<a url='http://www.example.com'>Example</a>", "<a href='http://www.example.com'>Example</a>", "<a>http://www.example.com</a>", "<a name='http://www.example.com'>Example</a>"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "Which HTML element is used to specify a footer for a document or section?",
        options: ["<bottom>", "<section>", "<footer>", "<foot>"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "What is the correct HTML for inserting an image?",
        options: ["<img href='image.gif' alt='MyImage'>", "<img src='image.gif' alt='MyImage'>", "<image src='image.gif' alt='MyImage'>", "<img alt='MyImage'>image.gif</img>"],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: ["title", "src", "alt", "longdesc"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "What is the correct HTML for making a text area?",
        options: ["<input type='textbox'>", "<input type='textarea'>", "<textarea>", "<textinput type='textarea'>"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "Which HTML element defines important text?",
        options: ["<important>", "<b>", "<strong>", "<i>"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "What is the correct HTML for inserting a background image?",
        options: ["<background img='background.gif'>", "<body bg='background.gif'>", "<body style='background-image:url(background.gif)'>", "<img background='background.gif'>"],
        correctAnswer: 2
      },
      {
        id: 14,
        question: "Which HTML element is used to display a scalar measurement within a range?",
        options: ["<measure>", "<gauge>", "<meter>", "<range>"],
        correctAnswer: 2
      },
      {
        id: 15,
        question: "What is the correct HTML for making a drop-down list?",
        options: ["<input type='dropdown'>", "<select>", "<input type='list'>", "<list>"],
        correctAnswer: 1
      },
      {
        id: 16,
        question: "Which DOCTYPE is correct for HTML5?",
        options: ["<!DOCTYPE html>", "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 5.0//EN' 'html5.dtd'>", "<!DOCTYPE HTML5>", "<!DOCTYPE html5>"],
        correctAnswer: 0
      },
      {
        id: 17,
        question: "Which HTML element specifies the main content of a document?",
        options: ["<content>", "<main>", "<section>", "<article>"],
        correctAnswer: 1
      },
      {
        id: 18,
        question: "What is the correct HTML for making text bold?",
        options: ["<bold>", "<b>", "<strong>", "Both <b> and <strong>"],
        correctAnswer: 3
      },
      {
        id: 19,
        question: "Which HTML element is used to group related options in a select list?",
        options: ["<group>", "<optgroup>", "<option-group>", "<select-group>"],
        correctAnswer: 1
      },
      {
        id: 20,
        question: "What is the correct HTML for adding a background color?",
        options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "<body bgcolor='yellow'>"],
        correctAnswer: 1
      }
    ]
  },
  2: { // CSS
    id: 2,
    subject: "CSS",
    title: "CSS Styling & Layout",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: ["In the <body> section", "At the end of the document", "In the <head> section", "At the top of the document"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "How do you insert a comment in a CSS file?",
        options: ["// this is a comment", "<!-- this is a comment -->", "/* this is a comment */", "' this is a comment"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "How do you make each word in a text start with a capital letter?",
        options: ["text-transform:capitalize", "text-style:capitalize", "transform:capitalize", "text-decoration:capitalize"],
        correctAnswer: 0
      },
      {
        id: 7,
        question: "Which property is used to change the font of an element?",
        options: ["font-weight", "font-style", "font-family", "font"],
        correctAnswer: 2
      },
      {
        id: 8,
        question: "How do you make a list that lists its items with squares?",
        options: ["list-style-type: square", "list-type: square", "list: square", "list-style: square"],
        correctAnswer: 0
      },
      {
        id: 9,
        question: "How do you select an element with id 'demo'?",
        options: [".demo", "*demo", "#demo", "demo"],
        correctAnswer: 2
      },
      {
        id: 10,
        question: "How do you select elements with class name 'test'?",
        options: [".test", "#test", "*test", "test"],
        correctAnswer: 0
      },
      {
        id: 11,
        question: "Which property is used to change the text color of an element?",
        options: ["fgcolor", "text-color", "color", "font-color"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "Which CSS property controls the text size?",
        options: ["text-style", "font-size", "text-size", "font-style"],
        correctAnswer: 1
      },
      {
        id: 13,
        question: "What is the correct CSS syntax for making all the <p> elements bold?",
        options: ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style='font-size:bold;'>", "p {font-size:bold;}"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "How do you display hyperlinks without an underline?",
        options: ["a {text-decoration:no-underline;}", "a {underline:none;}", "a {decoration:no-underline;}", "a {text-decoration:none;}"],
        correctAnswer: 3
      },
      {
        id: 15,
        question: "Which property is used to set the spacing between lines of text?",
        options: ["line-height", "text-spacing", "line-spacing", "text-height"],
        correctAnswer: 0
      },
      {
        id: 16,
        question: "How do you make the text bold?",
        options: ["font:b;", "font-weight:bold;", "style:bold;", "text:bold;"],
        correctAnswer: 1
      },
      {
        id: 17,
        question: "Which property is used to align text?",
        options: ["text-align", "text", "alignment", "align"],
        correctAnswer: 0
      },
      {
        id: 18,
        question: "How do you add a shadow to elements?",
        options: ["box-shadow", "shadow", "element-shadow", "box-outline"],
        correctAnswer: 0
      },
      {
        id: 19,
        question: "Which CSS property is used to create space around an element's content?",
        options: ["spacing", "padding", "margin", "border"],
        correctAnswer: 1
      },
      {
        id: 20,
        question: "What is the default value of the position property?",
        options: ["absolute", "fixed", "relative", "static"],
        correctAnswer: 3
      }
    ]
  },
  3: { // JavaScript
    id: 3,
    subject: "JavaScript",
    title: "JavaScript Programming",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
        options: ["document.getElement('p').innerHTML = 'Hello World!'", "document.getElementById('demo').innerHTML = 'Hello World!'", "#demo.innerHTML = 'Hello World!'", "document.getElementByName('p').innerHTML = 'Hello World!'"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Where is the correct place to insert a JavaScript?",
        options: ["The <head> section", "The <body> section", "Both the <head> section and the <body> section are correct", "The <footer> section"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "The external JavaScript file must contain the <script> tag.",
        options: ["True", "False", "Only in HTML5", "Depends on the browser"],
        correctAnswer: 1
      },
      {
        id: 6,
        question: "How do you write 'Hello World' in an alert box?",
        options: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correctAnswer: 2
      },
      {
        id: 7,
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function = myFunction()", "function:myFunction()", "create myFunction()"],
        correctAnswer: 0
      },
      {
        id: 8,
        question: "How do you call a function named 'myFunction'?",
        options: ["call function myFunction()", "call myFunction()", "myFunction()", "Call.myFunction()"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "How to write an IF statement in JavaScript?",
        options: ["if i == 5 then", "if i = 5 then", "if (i == 5)", "if i = 5"],
        correctAnswer: 2
      },
      {
        id: 10,
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        options: ["if (i <> 5)", "if i =! 5 then", "if (i != 5)", "if i not = 5"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "How does a WHILE loop start?",
        options: ["while i = 1 to 10", "while (i <= 10; i++)", "while (i <= 10)", "while i <= 10"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "How does a FOR loop start?",
        options: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
        correctAnswer: 1
      },
      {
        id: 13,
        question: "How can you add a comment in a JavaScript?",
        options: ["'This is a comment", "//This is a comment", "<!--This is a comment-->", "/* This is a comment */"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correctAnswer: 2
      },
      {
        id: 15,
        question: "How do you round the number 7.25, to the nearest integer?",
        options: ["rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)"],
        correctAnswer: 1
      },
      {
        id: 16,
        question: "How do you find the number with the highest value of x and y?",
        options: ["Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "highest(x, y)"],
        correctAnswer: 0
      },
      {
        id: 17,
        question: "What is the correct JavaScript syntax for opening a new window called 'w2'?",
        options: ["w2 = window.new('http://www.w3schools.com');", "w2 = window.open('http://www.w3schools.com');", "w2 = window.popup('http://www.w3schools.com');", "w2 = new window('http://www.w3schools.com');"],
        correctAnswer: 1
      },
      {
        id: 18,
        question: "JavaScript is the same as Java.",
        options: ["True", "False", "Sometimes", "Only in syntax"],
        correctAnswer: 1
      },
      {
        id: 19,
        question: "How can you detect the client's browser name?",
        options: ["navigator.appName", "browser.name", "client.navName", "window.browser"],
        correctAnswer: 0
      },
      {
        id: 20,
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        correctAnswer: 1
      }
    ]
  },
  4: { // C Programming
    id: 4,
    subject: "C Programming",
    title: "C Language Basics",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "Who is the founder of C language?",
        options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which of the following is the correct syntax of including a user defined header file in C?",
        options: ["#include <userdefined.h>", "#include 'userdefined.h'", "#include \"userdefined.h\"", "All of the above"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Which of the following is true for variable names in C?",
        options: ["They can contain alphabets, digits, and underscores", "They can start with a digit", "They can contain spaces", "Variable names cannot start with an underscore"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Which is valid C expression?",
        options: ["int my_num = 100,000;", "int my_num = 100000;", "int my num = 1000;", "int $my_num = 10000;"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the size of int in C?",
        options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the system/compiler"],
        correctAnswer: 3
      },
      {
        id: 6,
        question: "Which of the following is not a valid C variable name?",
        options: ["int number;", "float rate;", "int variable_count;", "int $main;"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "All keywords in C are in ____________",
        options: ["LowerCase letters", "UpperCase letters", "CamelCase letters", "None of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 8,
        question: "Variable name resolution (number of significant characters for the uniqueness of variable) depends on ___________",
        options: ["Compiler and linker implementations", "Assemblers and loaders implementations", "C language", "None of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 9,
        question: "Which of the following cannot be a variable name in C?",
        options: ["volatile", "true", "friend", "export"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "What is short int in C programming?",
        options: ["The basic data type of C", "Qualifier", "Short is the qualifier and int is the basic data type", "All of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "Which of the following declaration is not supported by C language?",
        options: ["String str;", "char *str;", "float str = 3e2;", "Both String str; and float str = 3e2;"],
        correctAnswer: 0
      },
      {
        id: 12,
        question: "Which keyword is used to prevent any changes in the variable within a C program?",
        options: ["immutable", "mutable", "const", "volatile"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "What is the result of logical or relational expression in C?",
        options: ["True or False", "0 or 1", "0 if expression is false and any positive number if expression is true", "None of the mentioned"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "The format identifier '%i' is also used for _____ data type",
        options: ["char", "int", "float", "double"],
        correctAnswer: 1
      },
      {
        id: 15,
        question: "What does the following statement or declaration signify? int (*fp)(int (*)(int), int)",
        options: ["fp is a pointer to function", "fp is a function pointer", "fp is a pointer to a function which accepts one integer and a pointer to a function which accepts integer and returns integer", "None of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 16,
        question: "Which of the following correctly shows the hierarchy of arithmetic operations in C?",
        options: ["**, *, /, +, -", "**, *, /, +, -", "**, +, -, *, /", "/ and *, + and - have same priority"],
        correctAnswer: 3
      },
      {
        id: 17,
        question: "Which of the following is the correct usage of conditional operators used in C?",
        options: ["a>b ? c=30 : c=40;", "a>b ? c=30;", "max = a>b ? a>c?a:c : b>c?b:c", "return (a>b)?(a:b)"],
        correctAnswer: 2
      },
      {
        id: 18,
        question: "The keyword used to transfer control from a function back to the calling function is",
        options: ["switch", "goto", "go back", "return"],
        correctAnswer: 3
      },
      {
        id: 19,
        question: "What is #include <stdio.h>?",
        options: ["Preprocessor directive", "Inclusion directive", "File inclusion directive", "All of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 20,
        question: "C programs are converted into machine language with the help of",
        options: ["An Editor", "A compiler", "An operating system", "None of the mentioned"],
        correctAnswer: 1
      }
    ]
  },
  5: { // Java
    id: 5,
    subject: "Java",
    title: "Java Object-Oriented Programming",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "Who invented Java Programming?",
        options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which statement is true about Java?",
        options: ["Java is a sequence-dependent programming language", "Java is a code dependent programming language", "Java is a platform-dependent programming language", "Java is a platform-independent programming language"],
        correctAnswer: 3
      },
      {
        id: 3,
        question: "Which component is used to compile, debug and execute the java programs?",
        options: ["JRE", "JIT", "JDK", "JVM"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "Which one of the following is not a Java feature?",
        options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which of these cannot be used for a variable name in Java?",
        options: ["identifier & keyword", "identifier", "keyword", "none of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "What is the extension of java code files?",
        options: [".js", ".txt", ".class", ".java"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "Which environment variable is used to set the java path?",
        options: ["MAVEN_Path", "JavaPATH", "JAVA", "JAVA_HOME"],
        correctAnswer: 3
      },
      {
        id: 8,
        question: "Which of the following is not an OOPS concept in Java?",
        options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "What is not the use of \"this\" keyword in Java?",
        options: ["Referring to the instance variable when a local variable has the same name", "Passing itself to the method of the same class", "Passing itself to another method", "Calling another constructor in constructor chaining"],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "Which of the following is a type of polymorphism in Java Programming?",
        options: ["Multiple polymorphism", "Compile time polymorphism", "Multilevel polymorphism", "Execution time polymorphism"],
        correctAnswer: 1
      },
      {
        id: 11,
        question: "What is Inheritance in Java?",
        options: ["Inheritance is a mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods", "Inheritance is a mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods.", "Inheritance is a mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods..", "All of the above"],
        correctAnswer: 0
      },
      {
        id: 12,
        question: "Which class is available to all the class automatically?",
        options: ["Swing class", "Applet class", "Object class", "ActionEvent class"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "Which package contains the Random class?",
        options: ["java.util package", "java.lang package", "java.awt package", "java.io package"],
        correctAnswer: 0
      },
      {
        id: 14,
        question: "An interface with no fields or methods is known as?",
        options: ["Runnable Interface", "Abstract Interface", "Marker Interface", "CharSequence Interface"],
        correctAnswer: 2
      },
      {
        id: 15,
        question: "In which memory a String is stored, when we create a string using new operator?",
        options: ["Stack", "String memory", "Random storage space", "Heap memory"],
        correctAnswer: 3
      },
      {
        id: 16,
        question: "Which of the following is a marker interface?",
        options: ["Runnable interface", "Remote interface", "Readable interface", "Result interface"],
        correctAnswer: 1
      },
      {
        id: 17,
        question: "Which keyword is used for accessing the features of a package?",
        options: ["import", "package", "extends", "export"],
        correctAnswer: 0
      },
      {
        id: 18,
        question: "In java, jar stands for?",
        options: ["Java Archive Runner", "Java Archive", "Java Application Resource", "Java Application Runner"],
        correctAnswer: 1
      },
      {
        id: 19,
        question: "Which of the following is a mutable class in java?",
        options: ["java.lang.StringBuilder", "java.lang.Short", "java.lang.Byte", "java.lang.String"],
        correctAnswer: 0
      },
      {
        id: 20,
        question: "Which of the following option leads to the portability and security of Java?",
        options: ["Bytecode is executed by JVM", "The applet makes the Java code secure and portable", "Use of exception handling", "Dynamic binding between objects"],
        correctAnswer: 0
      }
    ]
  },
  6: { // Python
    id: 6,
    subject: "Python",
    title: "Python Programming Essentials",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "Who developed Python Programming Language?",
        options: ["Wick van Rossum", "Rasmus Lerdorf", "Guido van Rossum", "Niene Stom"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Which type of Programming does Python support?",
        options: ["object-oriented programming", "structured programming", "functional programming", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 3,
        question: "Is Python case sensitive when dealing with identifiers?",
        options: ["no", "yes", "machine dependent", "none of the mentioned"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the maximum possible length of an identifier in Python?",
        options: ["31 characters", "63 characters", "79 characters", "none of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "Which of the following is used to define a block of code in Python language?",
        options: ["Indentation", "Key", "Brackets", "All of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 6,
        question: "Which keyword is used for function in Python language?",
        options: ["Function", "def", "Fun", "Define"],
        correctAnswer: 1
      },
      {
        id: 7,
        question: "Which of the following character is used to give single-line comments in Python?",
        options: ["//", "#", "!", "/*"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "What does pip stand for python?",
        options: ["Pip Installs Python", "Pip Installs Packages", "Preferred Installer Program", "All of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "Which of the following is the correct extension of the Python file?",
        options: [".python", ".pl", ".py", ".p"],
        correctAnswer: 2
      },
      {
        id: 10,
        question: "Which of the following is used to define a block of code in Python language?",
        options: ["Indentation", "Key", "Brackets", "All of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 11,
        question: "Is Python code compiled or interpreted?",
        options: ["Python code is both compiled and interpreted", "Python code is neither compiled nor interpreted", "Python code is only compiled", "Python code is only interpreted"],
        correctAnswer: 0
      },
      {
        id: 12,
        question: "All keywords in Python are in _________",
        options: ["Capitalized", "lower case", "UPPER CASE", "None of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 13,
        question: "What will be the value of the following Python expression? 4 + 3 % 5",
        options: ["4", "7", "2", "0"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "Which of the following functions can help us to find the version of python that we are currently working on?",
        options: ["sys.version(1)", "sys.version(0)", "sys.version()", "sys.version"],
        correctAnswer: 3
      },
      {
        id: 15,
        question: "Python supports the creation of anonymous functions at runtime, using a construct called __________",
        options: ["pi", "anonymous", "lambda", "none of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 16,
        question: "What is the order of precedence in python?",
        options: ["Exponential, Parentheses, Multiplication, Division, Addition, Subtraction", "Parentheses, Exponential, Multiplication, Division, Addition, Subtraction", "Parentheses, Exponential, Division, Multiplication, Addition, Subtraction", "Parentheses, Exponential, Division, Multiplication, Subtraction, Addition"],
        correctAnswer: 1
      },
      {
        id: 17,
        question: "What does \\n represent in Python?",
        options: ["New line", "Null", "No line", "Next"],
        correctAnswer: 0
      },
      {
        id: 18,
        question: "Which of the following functions is a built-in function in python?",
        options: ["factorial()", "print()", "seed()", "sqrt()"],
        correctAnswer: 1
      },
      {
        id: 19,
        question: "Which of the following is the truncation division operator in Python?",
        options: ["|", "//", "/", "%"],
        correctAnswer: 1
      },
      {
        id: 20,
        question: "Which of the following is not a core data type in Python programming?",
        options: ["Tuples", "Lists", "Class", "Dictionary"],
        correctAnswer: 2
      }
    ]
  },
  7: { // Operating Systems
    id: 7,
    subject: "Operating Systems",
    title: "OS Concepts & Processes",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What is an operating system?",
        options: ["collection of programs that manages hardware resources", "system service provider to the application programs", "interface between the hardware and application programs", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "To access the services of operating system, the interface is provided by the ___________",
        options: ["System calls", "API", "Library", "Assembly instructions"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which one of the following is not true?",
        options: ["kernel is the program that constitutes the central core of the operating system", "kernel is the first part of operating system to load into memory during booting", "kernel is made of various modules which can not be loaded in running operating system", "kernel remains in the memory during the entire computer session"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "Which one of the following error will be handle by the operating system?",
        options: ["power failure", "lack of paper in printer", "connection failure in the network", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "The main function of the command interpreter is",
        options: ["to provide the interface between the API and application program", "to handle the files in operating system", "to get and execute the next user-specified command", "none of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "By operating system, the resource management can be done via __________",
        options: ["time division", "space division", "time and space division", "none of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 7,
        question: "If a process fails, most operating system write the error information to a ______",
        options: ["log file", "another running process", "new file", "none of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 8,
        question: "Which one of the following is not a real time operating system?",
        options: ["RTLinux", "Palm OS", "QNX", "VxWorks"],
        correctAnswer: 1
      },
      {
        id: 9,
        question: "The systems which allows only one process execution at a time, are called __________",
        options: ["uniprogramming systems", "uniprocessing systems", "unitasking systems", "none of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "In operating system, each process has its own __________",
        options: ["address space and global variables", "open files", "pending alarms, signals and signal handlers", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 11,
        question: "In Unix, Which system call creates the new process?",
        options: ["fork", "create", "new", "none of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 12,
        question: "A process can be terminated due to __________",
        options: ["normal exit", "fatal error", "killed by another process", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        id: 13,
        question: "What is the ready state of a process?",
        options: ["when process is scheduled to run after some execution", "when process is unable to run until some task has been completed", "when process is using the CPU", "none of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 14,
        question: "What is the blocked state of a process?",
        options: ["when process is scheduled to run after some execution", "when process is unable to run until some task has been completed", "when process is using the CPU", "none of the mentioned"],
        correctAnswer: 1
      },
      {
        id: 15,
        question: "What is the running state of a process?",
        options: ["when process is scheduled to run after some execution", "when process is unable to run until some task has been completed", "when process is using the CPU", "none of the mentioned"],
        correctAnswer: 2
      },
      {
        id: 16,
        question: "The degree of multiprogramming is ____________",
        options: ["the number of processes executed per unit time", "the number of processes in the ready queue", "the number of processes in the I/O queue", "the number of processes in memory"],
        correctAnswer: 3
      },
      {
        id: 17,
        question: "Which of the following do not belong to queues for processes?",
        options: ["Job queue", "PCB queue", "Device queue", "Ready queue"],
        correctAnswer: 1
      },
      {
        id: 18,
        question: "When the process issues an I/O request __________",
        options: ["It is placed in an I/O queue", "It is placed in a waiting queue", "It is placed in the ready queue", "It is placed in the Job queue"],
        correctAnswer: 0
      },
      {
        id: 19,
        question: "What is a long-term scheduler?",
        options: ["It selects which process has to be brought into the ready queue", "It selects which process has to be executed next and allocates CPU", "It selects which process to remove from memory by swapping", "None of the mentioned"],
        correctAnswer: 0
      },
      {
        id: 20,
        question: "What is a medium-term scheduler?",
        options: ["It selects which process has to be brought into the ready queue", "It selects which process has to be executed next and allocates CPU", "It selects which process to remove from memory by swapping", "None of the mentioned"],
        correctAnswer: 2
      }
    ]
  },
  8: { // DBMS
    id: 8,
    subject: "DBMS",
    title: "Database Management Systems",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What is a database?",
        options: ["Collection of data", "Collection of interrelated data", "Collection of interrelated data with some common properties", "Collection of interrelated data with some common properties and stored in NVRAM"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is DBMS?",
        options: ["DBMS is a collection of queries", "DBMS is a high-level language", "DBMS is a programming language", "DBMS is a software system"],
        correctAnswer: 3
      },
      {
        id: 3,
        question: "The hierarchical model is also called",
        options: ["Tree structure", "Plex Structure", "Normalize Structure", "Table Structure"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "What is a primary key?",
        options: ["Primary key is an index", "Primary key is a constraint", "Primary key is a field", "Primary key is a super key that does not contain a smaller super key"],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "The Database schema is written in",
        options: ["HLL(High Level Language)", "DML(Data Manipulation Language)", "DDL(Data Definition Language)", "DCL(Data Control Language)"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "ODBC stands for",
        options: ["Object Database Connectivity", "Oral Database Connectivity", "Oracle Database Connectivity", "Open Database Connectivity"],
        correctAnswer: 3
      },
      {
        id: 7,
        question: "Architecture of the database can be viewed as",
        options: ["two levels", "four levels", "three levels", "one level"],
        correctAnswer: 2
      },
      {
        id: 8,
        question: "In the relational models, cardinality is termed as:",
        options: ["Number of tuples.", "Number of attributes.", "Number of tables.", "Number of constraints."],
        correctAnswer: 0
      },
      {
        id: 9,
        question: "Relational calculus is a",
        options: ["Procedural language", "Non-Procedural language", "Data definition language", "High level language"],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "The view of total database content is",
        options: ["Conceptual view.", "Internal view.", "External view.", "Physical View."],
        correctAnswer: 0
      },
      {
        id: 11,
        question: "Precedence graphs help to find a",
        options: ["Serializable schedule.", "Recoverable schedule.", "Deadlock free schedule.", "Cascadeless schedule."],
        correctAnswer: 0
      },
      {
        id: 12,
        question: "Which one is true statement:",
        options: ["With SQL, you can insert new records in a database", "With SQL, you can modify records in a database", "With SQL, you can delete records from a database", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 13,
        question: "Which of the following is not a characteristic of a relational database model?",
        options: ["Table", "Tree like structure", "Complex logical relationship", "Records"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "The database schema is written in",
        options: ["DML", "DDL", "SDL", "VDL"],
        correctAnswer: 1
      },
      {
        id: 15,
        question: "In the index allocation scheme of blocks to a file, the maximum possible size of the file depends on",
        options: ["the size of the disk", "the number of blocks used for the index", "the size of a disk block", "both (b) and (c)"],
        correctAnswer: 3
      },
      {
        id: 16,
        question: "The conceptual model is",
        options: ["dependent on hardware", "dependent on software", "dependent on both hardware and software", "independent of both hardware and software"],
        correctAnswer: 3
      },
      {
        id: 17,
        question: "What is a foreign key?",
        options: ["A foreign key is a field that points to the primary key of another table", "A foreign key is a field that uniquely identifies each record in a table", "A foreign key is a field that contains only unique values", "A foreign key is a field that cannot contain null values"],
        correctAnswer: 0
      },
      {
        id: 18,
        question: "Which normal form is considered adequate for normal relational database design?",
        options: ["2NF", "5NF", "4NF", "3NF"],
        correctAnswer: 3
      },
      {
        id: 19,
        question: "A logical schema",
        options: ["is the entire database", "is a standard way of organizing information into accessible parts", "describes how data is actually stored on disk", "both (a) and (b)"],
        correctAnswer: 3
      },
      {
        id: 20,
        question: "What is normalization?",
        options: ["A process to validate the data in the database", "A process to backup the database", "A process to organize data in database efficiently", "A process to recover a corrupted database"],
        correctAnswer: 2
      }
    ]
  }
};