webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/* exports provided: default */
/* exports used: default */
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi__ = __webpack_require__(/*! pixi */ 1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pixi__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2__ = __webpack_require__(/*! p2 */ 3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_p2__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser__ = __webpack_require__(/*! phaser */ 2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stages__ = __webpack_require__(/*! ./stages */ 7);\n\n\n\n\n\nconst game = new __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.Game(1280, 960, __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.AUTO, document.getElementById(\"game\"));\ngame.state.add(\"Level\", __WEBPACK_IMPORTED_MODULE_3__stages__[\"a\" /* Level */]);\ngame.state.start(\"Level\");\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (game);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9nYW1lLmpzPzliNWYiXSwibmFtZXMiOlsiZ2FtZSIsIlBoYXNlciIsIkdhbWUiLCJBVVRPIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0YXRlIiwiYWRkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxPQUFPLElBQUksOENBQUFDLENBQU9DLElBQVgsQ0FDVCxJQURTLEVBRVQsR0FGUyxFQUdULDhDQUFBRCxDQUFPRSxJQUhFLEVBSVRDLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FKUyxDQUFiO0FBTUFMLEtBQUtNLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLE9BQWYsRUFBd0Isc0RBQXhCO0FBQ0FQLEtBQUtNLEtBQUwsQ0FBV0UsS0FBWCxDQUFpQixPQUFqQjs7QUFFQSx5REFBZVIsSUFBZiIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicGl4aVwiO1xuaW1wb3J0IFwicDJcIjtcbmltcG9ydCBQaGFzZXIgZnJvbSBcInBoYXNlclwiO1xuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tIFwiLi9zdGFnZXNcIjtcblxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShcbiAgICAxMjgwLFxuICAgIDk2MCxcbiAgICBQaGFzZXIuQVVUTyxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVcIilcbik7XG5nYW1lLnN0YXRlLmFkZChcIkxldmVsXCIsIExldmVsKTtcbmdhbWUuc3RhdGUuc3RhcnQoXCJMZXZlbFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2dhbWUuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(/*! ./game */ 4);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOltdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 6 */
/* exports provided: Level */
/* exports used: Level */
/*!**********************************!*\
  !*** ./js/stages/Level.stage.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(/*! ../game */ 4);\n\n\nlet map,\n    bg,\n    walls,\n    player,\n    cursors,\n    jumpTimer = 0;\n\nconst Level = {\n\n  preload: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.image('tileset', 'maps/tilea2.png');\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.spritesheet('hero', 'sprites/char.gif');\n  },\n\n  create: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.startSystem(Phaser.Physics.ARCADE);\n    map = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].add.tilemap('level1');\n    map.addTilesetImage('tilea2', 'tileset');\n    bg = map.createLayer('bg');\n    walls = map.createLayer('walls');\n    map.setCollision([49, 63, 109], true, walls);\n    // walls.debug = true;\n    bg.resizeWorld();\n\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.arcade.gravity.y = 500;\n\n    player = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].add.sprite(32, 32, 'hero');\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.enable(player, Phaser.Physics.ARCADE);\n\n    player.body.collideWorldBounds = true;\n    player.body.bounce.y = 0.25;\n    player.scale.setTo(0.4, 0.4);\n\n    cursors = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].input.keyboard.createCursorKeys();\n  },\n\n  update: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.arcade.collide(player, walls);\n    player.body.velocity.x = 0;\n\n    if (cursors.left.isDown) {\n      player.body.velocity.x = -150;\n    } else if (cursors.right.isDown) {\n      player.body.velocity.x = 150;\n    }\n\n    if (cursors.up.isDown && player.body.onFloor() && __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].time.now > jumpTimer) {\n      player.body.velocity.y = -410;\n      jumpTimer = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].time.now + 750;\n    }\n  },\n\n  render: function () {\n    // game.debug.text(game.time.physicsElapsed, 32, 32);\n    // game.debug.body(player);\n    // game.debug.bodyInfo(player, 16, 24);\n  }\n};\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Level;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zdGFnZXMvTGV2ZWwuc3RhZ2UuanM/MDQ5YyJdLCJuYW1lcyI6WyJtYXAiLCJiZyIsIndhbGxzIiwicGxheWVyIiwiY3Vyc29ycyIsImp1bXBUaW1lciIsIkxldmVsIiwicHJlbG9hZCIsImdhbWUiLCJsb2FkIiwidGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiaW1hZ2UiLCJzcHJpdGVzaGVldCIsImNyZWF0ZSIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhZGQiLCJhZGRUaWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllciIsInNldENvbGxpc2lvbiIsInJlc2l6ZVdvcmxkIiwiYXJjYWRlIiwiZ3Jhdml0eSIsInkiLCJzcHJpdGUiLCJlbmFibGUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiYm91bmNlIiwic2NhbGUiLCJzZXRUbyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwidXBkYXRlIiwiY29sbGlkZSIsInZlbG9jaXR5IiwieCIsImxlZnQiLCJpc0Rvd24iLCJyaWdodCIsInVwIiwib25GbG9vciIsInRpbWUiLCJub3ciLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQSxJQUFJQSxHQUFKO0FBQUEsSUFDSUMsRUFESjtBQUFBLElBRUlDLEtBRko7QUFBQSxJQUdJQyxNQUhKO0FBQUEsSUFJSUMsT0FKSjtBQUFBLElBS0lDLFlBQVksQ0FMaEI7O0FBT08sTUFBTUMsUUFBUTs7QUFFakJDLFdBQVMsWUFBWTtBQUNuQkMsSUFBQSxzREFBQUEsQ0FBS0MsSUFBTCxDQUFVQyxPQUFWLENBQWtCLFFBQWxCLEVBQTRCLGtCQUE1QixFQUFnRCxJQUFoRCxFQUFzREMsT0FBT0MsT0FBUCxDQUFlQyxVQUFyRTtBQUNBTCxJQUFBLHNEQUFBQSxDQUFLQyxJQUFMLENBQVVLLEtBQVYsQ0FBZ0IsU0FBaEIsRUFBMkIsaUJBQTNCO0FBQ0FOLElBQUEsc0RBQUFBLENBQUtDLElBQUwsQ0FBVU0sV0FBVixDQUFzQixNQUF0QixFQUE4QixrQkFBOUI7QUFDRCxHQU5nQjs7QUFRakJDLFVBQVEsWUFBWTtBQUNsQlIsSUFBQSxzREFBQUEsQ0FBS1MsT0FBTCxDQUFhQyxXQUFiLENBQXlCUCxPQUFPUSxPQUFQLENBQWVDLE1BQXhDO0FBQ0FwQixVQUFNLHNEQUFBUSxDQUFLYSxHQUFMLENBQVNYLE9BQVQsQ0FBaUIsUUFBakIsQ0FBTjtBQUNBVixRQUFJc0IsZUFBSixDQUFvQixRQUFwQixFQUE4QixTQUE5QjtBQUNBckIsU0FBS0QsSUFBSXVCLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBTDtBQUNBckIsWUFBUUYsSUFBSXVCLFdBQUosQ0FBZ0IsT0FBaEIsQ0FBUjtBQUNBdkIsUUFBSXdCLFlBQUosQ0FBaUIsQ0FBRSxFQUFGLEVBQU0sRUFBTixFQUFVLEdBQVYsQ0FBakIsRUFBa0MsSUFBbEMsRUFBd0N0QixLQUF4QztBQUNBO0FBQ0FELE9BQUd3QixXQUFIOztBQUVBakIsSUFBQSxzREFBQUEsQ0FBS1MsT0FBTCxDQUFhUyxNQUFiLENBQW9CQyxPQUFwQixDQUE0QkMsQ0FBNUIsR0FBZ0MsR0FBaEM7O0FBRUF6QixhQUFTLHNEQUFBSyxDQUFLYSxHQUFMLENBQVNRLE1BQVQsQ0FBZ0IsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsTUFBeEIsQ0FBVDtBQUNBckIsSUFBQSxzREFBQUEsQ0FBS1MsT0FBTCxDQUFhYSxNQUFiLENBQW9CM0IsTUFBcEIsRUFBNEJRLE9BQU9RLE9BQVAsQ0FBZUMsTUFBM0M7O0FBRUFqQixXQUFPNEIsSUFBUCxDQUFZQyxrQkFBWixHQUFpQyxJQUFqQztBQUNBN0IsV0FBTzRCLElBQVAsQ0FBWUUsTUFBWixDQUFtQkwsQ0FBbkIsR0FBdUIsSUFBdkI7QUFDQXpCLFdBQU8rQixLQUFQLENBQWFDLEtBQWIsQ0FBbUIsR0FBbkIsRUFBd0IsR0FBeEI7O0FBRUEvQixjQUFVLHNEQUFBSSxDQUFLNEIsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxnQkFBcEIsRUFBVjtBQUNELEdBNUJnQjs7QUE4QmpCQyxVQUFRLFlBQVk7QUFDbEIvQixJQUFBLHNEQUFBQSxDQUFLUyxPQUFMLENBQWFTLE1BQWIsQ0FBb0JjLE9BQXBCLENBQTRCckMsTUFBNUIsRUFBb0NELEtBQXBDO0FBQ0FDLFdBQU80QixJQUFQLENBQVlVLFFBQVosQ0FBcUJDLENBQXJCLEdBQXlCLENBQXpCOztBQUVBLFFBQUl0QyxRQUFRdUMsSUFBUixDQUFhQyxNQUFqQixFQUF5QjtBQUN2QnpDLGFBQU80QixJQUFQLENBQVlVLFFBQVosQ0FBcUJDLENBQXJCLEdBQXlCLENBQUMsR0FBMUI7QUFDRCxLQUZELE1BRU8sSUFBSXRDLFFBQVF5QyxLQUFSLENBQWNELE1BQWxCLEVBQTBCO0FBQy9CekMsYUFBTzRCLElBQVAsQ0FBWVUsUUFBWixDQUFxQkMsQ0FBckIsR0FBeUIsR0FBekI7QUFDRDs7QUFFRCxRQUFJdEMsUUFBUTBDLEVBQVIsQ0FBV0YsTUFBWCxJQUFxQnpDLE9BQU80QixJQUFQLENBQVlnQixPQUFaLEVBQXJCLElBQThDLHNEQUFBdkMsQ0FBS3dDLElBQUwsQ0FBVUMsR0FBVixHQUFnQjVDLFNBQWxFLEVBQTZFO0FBQzNFRixhQUFPNEIsSUFBUCxDQUFZVSxRQUFaLENBQXFCYixDQUFyQixHQUF5QixDQUFDLEdBQTFCO0FBQ0F2QixrQkFBWSxzREFBQUcsQ0FBS3dDLElBQUwsQ0FBVUMsR0FBVixHQUFnQixHQUE1QjtBQUNEO0FBQ0YsR0E1Q2dCOztBQThDakJDLFVBQVEsWUFBWTtBQUNoQjtBQUNBO0FBQ0E7QUFDSDtBQWxEZ0IsQ0FBZCxDIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZSBmcm9tIFwiLi4vZ2FtZVwiO1xuXG5sZXQgbWFwLFxuICAgIGJnLFxuICAgIHdhbGxzLFxuICAgIHBsYXllcixcbiAgICBjdXJzb3JzLFxuICAgIGp1bXBUaW1lciA9IDA7XG5cbmV4cG9ydCBjb25zdCBMZXZlbCA9IHtcblxuICAgIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGdhbWUubG9hZC50aWxlbWFwKCdsZXZlbDEnLCAnbWFwcy9sZXZlbDEuanNvbicsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0aWxlc2V0JywgJ21hcHMvdGlsZWEyLnBuZycpO1xuICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KCdoZXJvJywgJ3Nwcml0ZXMvY2hhci5naWYnKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICAgIG1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoJ2xldmVsMScpO1xuICAgICAgbWFwLmFkZFRpbGVzZXRJbWFnZSgndGlsZWEyJywgJ3RpbGVzZXQnKTtcbiAgICAgIGJnID0gbWFwLmNyZWF0ZUxheWVyKCdiZycpO1xuICAgICAgd2FsbHMgPSBtYXAuY3JlYXRlTGF5ZXIoJ3dhbGxzJyk7XG4gICAgICBtYXAuc2V0Q29sbGlzaW9uKFsgNDksIDYzLCAxMDkgXSwgdHJ1ZSwgd2FsbHMpO1xuICAgICAgLy8gd2FsbHMuZGVidWcgPSB0cnVlO1xuICAgICAgYmcucmVzaXplV29ybGQoKTtcblxuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5ncmF2aXR5LnkgPSA1MDA7XG5cbiAgICAgIHBsYXllciA9IGdhbWUuYWRkLnNwcml0ZSgzMiwgMzIsICdoZXJvJyk7XG4gICAgICBnYW1lLnBoeXNpY3MuZW5hYmxlKHBsYXllciwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgICAgcGxheWVyLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICAgIHBsYXllci5ib2R5LmJvdW5jZS55ID0gMC4yNTtcbiAgICAgIHBsYXllci5zY2FsZS5zZXRUbygwLjQsIDAuNCk7XG5cbiAgICAgIGN1cnNvcnMgPSBnYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUocGxheWVyLCB3YWxscyk7XG4gICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcblxuICAgICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24pIHtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XG4gICAgICB9IGVsc2UgaWYgKGN1cnNvcnMucmlnaHQuaXNEb3duKSB7XG4gICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJzb3JzLnVwLmlzRG93biAmJiBwbGF5ZXIuYm9keS5vbkZsb29yKCkgJiYgZ2FtZS50aW1lLm5vdyA+IGp1bXBUaW1lcikge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gLTQxMDtcbiAgICAgICAganVtcFRpbWVyID0gZ2FtZS50aW1lLm5vdyArIDc1MDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGdhbWUuZGVidWcudGV4dChnYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQsIDMyLCAzMik7XG4gICAgICAgIC8vIGdhbWUuZGVidWcuYm9keShwbGF5ZXIpO1xuICAgICAgICAvLyBnYW1lLmRlYnVnLmJvZHlJbmZvKHBsYXllciwgMTYsIDI0KTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvc3RhZ2VzL0xldmVsLnN0YWdlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 7 */
/* exports provided: Level */
/* exports used: Level */
/*!****************************!*\
  !*** ./js/stages/index.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Level_stage__ = __webpack_require__(/*! ./Level.stage */ 6);\n/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__Level_stage__[\"a\"]; });\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zdGFnZXMvaW5kZXguanM/NjUxNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBIiwiZmlsZSI6IjcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xldmVsfSBmcm9tICcuL0xldmVsLnN0YWdlJztcblxuZXhwb3J0IHtMZXZlbH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3N0YWdlcy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** multi ./js/index.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ierhyna/Workspace/arcade/js/index.js */5);


/***/ })
],[12]);