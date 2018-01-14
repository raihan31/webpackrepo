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
    Main.prototype.studentRowGenerator = function (student) {
        var tmp = "<tr class=\"studentRow\">\n                <td>" + student.name + "</td>\n                <td>" + student.score + "</td>\n                <td>\n                    <button class=\"btn btn-danger deleteClass\" data-id=\"" + student.id + "\" id=\"student-" + student.id + "\">Delete</button>\n                </td>\n            </tr>";
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
        var _this = this;
        students = students || __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents();
        element.innerHTML = this.studentTableGenerator(students);
        if (students && students.length > 0) {
            students.forEach(function (student) {
                _this.generateEventListener(element, student);
            });
        }
    };
    Main.prototype.generateEventListener = function (mainContent, student) {
        var selectorId = "#student-" + student.id;
        var element = mainContent.querySelector(selectorId);
        element.addEventListener('click', function (ev) {
            var dataId = this.getAttribute("data-id");
            var studentRows = document.querySelector(".studentRows");
            var success = __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].deleteStudent(dataId.toString());
            if (success) {
                var indexClass = new Main();
                indexClass.populateData(studentRows);
            }
            else {
                alert("Couldn't be deleted");
            }
        }, false);
    };
    return Main;
}());

window.onload = function () {
    var mainContent = document.querySelector("#mainContent");
    var studentRows = mainContent.querySelector(".studentRows");
    var students = __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents();
    var mainObj = new Main();
    var flag = false;
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
        var student = new __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */]({ id: mainObj.guid(), name: name, score: score });
        __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].createStudent(student);
        mainObj.populateData(studentRows);
        mainObj.generateEventListener(mainContent, student);
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });
    var formCancel = mainContent.querySelector("#formCancel");
    formCancel.addEventListener('click', function () {
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });
    var sortStudent = mainContent.querySelector("#sortStudent");
    sortStudent.addEventListener('click', function () {
        flag = !flag;
        mainObj.populateData(studentRows, __WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].sortStudents(__WEBPACK_IMPORTED_MODULE_0__student__["a" /* Student */].getStudents(), flag));
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
    Student.createStudent = function (student) {
        var students = Student.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    };
    Student.sortStudents = function (students, flag) {
        students.sort(function (a, b) {
            if (a.score > b.score)
                return flag ? 1 : -1;
            else if (a.score < b.score)
                return flag ? -1 : 1;
            else
                return 0;
        });
        return students;
    };
    Student.getStudents = function () {
        var students = [];
        if (JSON.parse(localStorage.getItem('students'))) {
            var stnds = JSON.parse(localStorage.getItem('students'));
            for (var _i = 0, stnds_1 = stnds; _i < stnds_1.length; _i++) {
                var stdn = stnds_1[_i];
                students.push(new Student({ id: stdn.id, name: stdn.name, score: stdn.score }));
            }
        }
        else {
            localStorage.setItem('students', null);
        }
        return students;
    };
    Student.deleteStudent = function (id) {
        var students = Student.getStudents();
        var tempStdn = [];
        var flag = false;
        students.forEach(function (student) {
            if (id !== student.id) {
                tempStdn.push(student);
            }
            else {
                flag = true;
            }
        });
        localStorage.setItem('students', JSON.stringify(tempStdn));
        return flag;
    };
    return Student;
}());



/***/ })
/******/ ]);