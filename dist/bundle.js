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
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(/*! ../game */ 4);\n\n\nlet map,\n    bg,\n    walls,\n    player,\n    cursors,\n    jumpTimer = 0;\n\nconst Level = {\n\n  preload: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.image('tileset', 'maps/tilea2.png');\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].load.spritesheet('hero', 'sprites/char.gif');\n  },\n\n  create: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.startSystem(Phaser.Physics.ARCADE);\n    map = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].add.tilemap('level1');\n    map.addTilesetImage('tilea2', 'tileset');\n    bg = map.createLayer('bg');\n    walls = map.createLayer('walls');\n    map.setCollision([49, 63, 109], true, walls);\n    // walls.debug = true;\n    bg.resizeWorld();\n\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.arcade.gravity.y = 500;\n\n    player = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].add.sprite(32, 32, 'hero');\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.enable(player, Phaser.Physics.ARCADE);\n\n    player.body.collideWorldBounds = true;\n    player.body.bounce.y = 0.25;\n    player.scale.setTo(0.4, 0.4);\n\n    cursors = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].input.keyboard.createCursorKeys();\n  },\n\n  update: function () {\n    __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].physics.arcade.collide(player, walls);\n    player.body.velocity.x = 0;\n\n    if (cursors.left.isDown) {\n      player.body.velocity.x = -150;\n    } else if (cursors.right.isDown) {\n      player.body.velocity.x = 150;\n      console.log(__WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].time.now);\n    }\n\n    if (cursors.up.isDown && player.body.onFloor() && __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].time.now > jumpTimer) {\n      player.body.velocity.y = -410;\n      jumpTimer = __WEBPACK_IMPORTED_MODULE_0__game__[\"a\" /* default */].time.now + 750;\n    }\n  },\n\n  render: function () {\n    // game.debug.text(game.time.physicsElapsed, 32, 32);\n    // game.debug.body(player);\n    // game.debug.bodyInfo(player, 16, 24);\n  }\n};\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Level;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zdGFnZXMvTGV2ZWwuc3RhZ2UuanM/MDQ5YyJdLCJuYW1lcyI6WyJtYXAiLCJiZyIsIndhbGxzIiwicGxheWVyIiwiY3Vyc29ycyIsImp1bXBUaW1lciIsIkxldmVsIiwicHJlbG9hZCIsImdhbWUiLCJsb2FkIiwidGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiaW1hZ2UiLCJzcHJpdGVzaGVldCIsImNyZWF0ZSIsInBoeXNpY3MiLCJzdGFydFN5c3RlbSIsIlBoeXNpY3MiLCJBUkNBREUiLCJhZGQiLCJhZGRUaWxlc2V0SW1hZ2UiLCJjcmVhdGVMYXllciIsInNldENvbGxpc2lvbiIsInJlc2l6ZVdvcmxkIiwiYXJjYWRlIiwiZ3Jhdml0eSIsInkiLCJzcHJpdGUiLCJlbmFibGUiLCJib2R5IiwiY29sbGlkZVdvcmxkQm91bmRzIiwiYm91bmNlIiwic2NhbGUiLCJzZXRUbyIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwidXBkYXRlIiwiY29sbGlkZSIsInZlbG9jaXR5IiwieCIsImxlZnQiLCJpc0Rvd24iLCJyaWdodCIsImNvbnNvbGUiLCJsb2ciLCJ0aW1lIiwibm93IiwidXAiLCJvbkZsb29yIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUEsSUFBSUEsR0FBSjtBQUFBLElBQ0lDLEVBREo7QUFBQSxJQUVJQyxLQUZKO0FBQUEsSUFHSUMsTUFISjtBQUFBLElBSUlDLE9BSko7QUFBQSxJQUtJQyxZQUFZLENBTGhCOztBQU9PLE1BQU1DLFFBQVE7O0FBRWpCQyxXQUFTLFlBQVk7QUFDbkJDLElBQUEsc0RBQUFBLENBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQixRQUFsQixFQUE0QixrQkFBNUIsRUFBZ0QsSUFBaEQsRUFBc0RDLE9BQU9DLE9BQVAsQ0FBZUMsVUFBckU7QUFDQUwsSUFBQSxzREFBQUEsQ0FBS0MsSUFBTCxDQUFVSyxLQUFWLENBQWdCLFNBQWhCLEVBQTJCLGlCQUEzQjtBQUNBTixJQUFBLHNEQUFBQSxDQUFLQyxJQUFMLENBQVVNLFdBQVYsQ0FBc0IsTUFBdEIsRUFBOEIsa0JBQTlCO0FBQ0QsR0FOZ0I7O0FBUWpCQyxVQUFRLFlBQVk7QUFDbEJSLElBQUEsc0RBQUFBLENBQUtTLE9BQUwsQ0FBYUMsV0FBYixDQUF5QlAsT0FBT1EsT0FBUCxDQUFlQyxNQUF4QztBQUNBcEIsVUFBTSxzREFBQVEsQ0FBS2EsR0FBTCxDQUFTWCxPQUFULENBQWlCLFFBQWpCLENBQU47QUFDQVYsUUFBSXNCLGVBQUosQ0FBb0IsUUFBcEIsRUFBOEIsU0FBOUI7QUFDQXJCLFNBQUtELElBQUl1QixXQUFKLENBQWdCLElBQWhCLENBQUw7QUFDQXJCLFlBQVFGLElBQUl1QixXQUFKLENBQWdCLE9BQWhCLENBQVI7QUFDQXZCLFFBQUl3QixZQUFKLENBQWlCLENBQUUsRUFBRixFQUFNLEVBQU4sRUFBVSxHQUFWLENBQWpCLEVBQWtDLElBQWxDLEVBQXdDdEIsS0FBeEM7QUFDQTtBQUNBRCxPQUFHd0IsV0FBSDs7QUFFQWpCLElBQUEsc0RBQUFBLENBQUtTLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkMsT0FBcEIsQ0FBNEJDLENBQTVCLEdBQWdDLEdBQWhDOztBQUVBekIsYUFBUyxzREFBQUssQ0FBS2EsR0FBTCxDQUFTUSxNQUFULENBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLE1BQXhCLENBQVQ7QUFDQXJCLElBQUEsc0RBQUFBLENBQUtTLE9BQUwsQ0FBYWEsTUFBYixDQUFvQjNCLE1BQXBCLEVBQTRCUSxPQUFPUSxPQUFQLENBQWVDLE1BQTNDOztBQUVBakIsV0FBTzRCLElBQVAsQ0FBWUMsa0JBQVosR0FBaUMsSUFBakM7QUFDQTdCLFdBQU80QixJQUFQLENBQVlFLE1BQVosQ0FBbUJMLENBQW5CLEdBQXVCLElBQXZCO0FBQ0F6QixXQUFPK0IsS0FBUCxDQUFhQyxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLEdBQXhCOztBQUVBL0IsY0FBVSxzREFBQUksQ0FBSzRCLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsZ0JBQXBCLEVBQVY7QUFDRCxHQTVCZ0I7O0FBOEJqQkMsVUFBUSxZQUFZO0FBQ2xCL0IsSUFBQSxzREFBQUEsQ0FBS1MsT0FBTCxDQUFhUyxNQUFiLENBQW9CYyxPQUFwQixDQUE0QnJDLE1BQTVCLEVBQW9DRCxLQUFwQztBQUNBQyxXQUFPNEIsSUFBUCxDQUFZVSxRQUFaLENBQXFCQyxDQUFyQixHQUF5QixDQUF6Qjs7QUFFQSxRQUFJdEMsUUFBUXVDLElBQVIsQ0FBYUMsTUFBakIsRUFBeUI7QUFDdkJ6QyxhQUFPNEIsSUFBUCxDQUFZVSxRQUFaLENBQXFCQyxDQUFyQixHQUF5QixDQUFDLEdBQTFCO0FBQ0QsS0FGRCxNQUVPLElBQUl0QyxRQUFReUMsS0FBUixDQUFjRCxNQUFsQixFQUEwQjtBQUMvQnpDLGFBQU80QixJQUFQLENBQVlVLFFBQVosQ0FBcUJDLENBQXJCLEdBQXlCLEdBQXpCO0FBQ0FJLGNBQVFDLEdBQVIsQ0FBWSxzREFBQXZDLENBQUt3QyxJQUFMLENBQVVDLEdBQXRCO0FBQ0Q7O0FBRUQsUUFBSTdDLFFBQVE4QyxFQUFSLENBQVdOLE1BQVgsSUFBcUJ6QyxPQUFPNEIsSUFBUCxDQUFZb0IsT0FBWixFQUFyQixJQUE4QyxzREFBQTNDLENBQUt3QyxJQUFMLENBQVVDLEdBQVYsR0FBZ0I1QyxTQUFsRSxFQUE2RTtBQUMzRUYsYUFBTzRCLElBQVAsQ0FBWVUsUUFBWixDQUFxQmIsQ0FBckIsR0FBeUIsQ0FBQyxHQUExQjtBQUNBdkIsa0JBQVksc0RBQUFHLENBQUt3QyxJQUFMLENBQVVDLEdBQVYsR0FBZ0IsR0FBNUI7QUFDRDtBQUNGLEdBN0NnQjs7QUErQ2pCRyxVQUFRLFlBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0g7QUFuRGdCLENBQWQsQyIsImZpbGUiOiI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWUgZnJvbSBcIi4uL2dhbWVcIjtcblxubGV0IG1hcCxcbiAgICBiZyxcbiAgICB3YWxscyxcbiAgICBwbGF5ZXIsXG4gICAgY3Vyc29ycyxcbiAgICBqdW1wVGltZXIgPSAwO1xuXG5leHBvcnQgY29uc3QgTGV2ZWwgPSB7XG5cbiAgICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBnYW1lLmxvYWQudGlsZW1hcCgnbGV2ZWwxJywgJ21hcHMvbGV2ZWwxLmpzb24nLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICAgIGdhbWUubG9hZC5pbWFnZSgndGlsZXNldCcsICdtYXBzL3RpbGVhMi5wbmcnKTtcbiAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldCgnaGVybycsICdzcHJpdGVzL2NoYXIuZ2lmJyk7XG4gICAgfSxcblxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgICBtYXAgPSBnYW1lLmFkZC50aWxlbWFwKCdsZXZlbDEnKTtcbiAgICAgIG1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3RpbGVhMicsICd0aWxlc2V0Jyk7XG4gICAgICBiZyA9IG1hcC5jcmVhdGVMYXllcignYmcnKTtcbiAgICAgIHdhbGxzID0gbWFwLmNyZWF0ZUxheWVyKCd3YWxscycpO1xuICAgICAgbWFwLnNldENvbGxpc2lvbihbIDQ5LCA2MywgMTA5IF0sIHRydWUsIHdhbGxzKTtcbiAgICAgIC8vIHdhbGxzLmRlYnVnID0gdHJ1ZTtcbiAgICAgIGJnLnJlc2l6ZVdvcmxkKCk7XG5cbiAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuZ3Jhdml0eS55ID0gNTAwO1xuXG4gICAgICBwbGF5ZXIgPSBnYW1lLmFkZC5zcHJpdGUoMzIsIDMyLCAnaGVybycpO1xuICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShwbGF5ZXIsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICAgIHBsYXllci5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgICBwbGF5ZXIuYm9keS5ib3VuY2UueSA9IDAuMjU7XG4gICAgICBwbGF5ZXIuc2NhbGUuc2V0VG8oMC40LCAwLjQpO1xuXG4gICAgICBjdXJzb3JzID0gZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHBsYXllciwgd2FsbHMpO1xuICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XG5cbiAgICAgIGlmIChjdXJzb3JzLmxlZnQuaXNEb3duKSB7XG4gICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtMTUwO1xuICAgICAgfSBlbHNlIGlmIChjdXJzb3JzLnJpZ2h0LmlzRG93bikge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMTUwO1xuICAgICAgICBjb25zb2xlLmxvZyhnYW1lLnRpbWUubm93KVxuICAgICAgfVxuXG4gICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24gJiYgcGxheWVyLmJvZHkub25GbG9vcigpICYmIGdhbWUudGltZS5ub3cgPiBqdW1wVGltZXIpIHtcbiAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC00MTA7XG4gICAgICAgIGp1bXBUaW1lciA9IGdhbWUudGltZS5ub3cgKyA3NTA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBnYW1lLmRlYnVnLnRleHQoZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkLCAzMiwgMzIpO1xuICAgICAgICAvLyBnYW1lLmRlYnVnLmJvZHkocGxheWVyKTtcbiAgICAgICAgLy8gZ2FtZS5kZWJ1Zy5ib2R5SW5mbyhwbGF5ZXIsIDE2LCAyNCk7XG4gICAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3N0YWdlcy9MZXZlbC5zdGFnZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

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