/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__student__ = __webpack_require__(1);

var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.createStudent = function (student) {
        var students = __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    };
    Main.prototype.studentRowGenerator = function (student) {
        var tmp = "<tr class=\"studentRow\" id=\"" + student.id + "\">\n                <td>" + student.id + "</td>\n                <td>" + student.name + "</td>\n                <td>" + student.score + "</td>\n            </tr>";
        console.log(tmp);
        return tmp;
    };
    Main.prototype.studentTableGenerator = function (students) {
        var _this = this;
        var rows = "";
        if (students && students.length > 0) {
            students.forEach(function (student) {
                rows += _this.studentRowGenerator(student);
            });
        }
        else {
            rows = 'No Student Found. Please Add Some Students';
        }
        console.log(rows);
        return rows;
    };
    Main.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    Main.prototype.populateData = function (element, students) {
        students = students || __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents();
        element.innerHTML = this.studentTableGenerator(students);
    };
    return Main;
}());

window.onload = function () {
    var mainContent = document.querySelector("#mainContent");
    var studentRows = mainContent.querySelector(".studentRows");
    var students = __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents();
    var mainObj = new Main();
    mainObj.populateData(studentRows);
    var addStudent = mainContent.querySelector("#addStudent");
    addStudent.addEventListener('click', function () {
        mainContent.querySelector('#name').value = "";
        mainContent.querySelector('#score').value = null;
        mainContent.querySelector("#studentTable").className = "row hide";
        mainContent.querySelector("#formContent").className = "row show";
    });
    var formSubmitId = mainContent.querySelector("#formSubmit");
    formSubmitId.addEventListener('click', function () {
        var name = mainContent.querySelector('#name').value;
        var score = +mainContent.querySelector('#score').value;
        mainObj.createStudent(new __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */]({ id: mainObj.guid(), name: name, score: score }));
        mainObj.populateData(studentRows);
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });
    var sortStudent = mainContent.querySelector("#sortStudent");
    sortStudent.addEventListener('click', function () {
        mainObj.populateData(studentRows, __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].sortStudents(__WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents()));
    });
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Student; });
var Student = /** @class */ (function () {
    function Student(data) {
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
    }
    Student.prototype.getStudent = function (id) {
        var students = Student.getStudents();
        return students.filter(function (student) {
            return id === student.id;
        })[0];
    };
    Student.sortStudents = function (students) {
        students.sort(function (a, b) {
            if (a.score > b.score)
                return 1;
            else if (a.score < b.score)
                return -1;
            else
                return 0;
        });
        return students;
    };
    Student.getStudents = function () {
        var students = [];
        if (JSON.parse(localStorage.getItem('students'))) {
            console.log('true');
            var stnds = JSON.parse(localStorage.getItem('students'));
            for (var _i = 0, stnds_1 = stnds; _i < stnds_1.length; _i++) {
                var stdn = stnds_1[_i];
                students.push(new Student({ id: stdn.id, name: stdn.name, score: stdn.score }));
            }
        }
        else {
            console.log('false');
            localStorage.setItem('students', null);
        }
        return students;
    };
    return Student;
}());



/***/ })
/******/ ]);