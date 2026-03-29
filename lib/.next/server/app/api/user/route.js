/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/route.tsx":
/*!********************************!*\
  !*** ./app/api/user/route.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _config_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config/db */ \"(rsc)/./config/db.tsx\");\n/* harmony import */ var drizzle_orm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! drizzle-orm */ \"(rsc)/./node_modules/drizzle-orm/sql/expressions/conditions.js\");\n/* harmony import */ var _config_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config/schema */ \"(rsc)/./config/schema.tsx\");\n/* harmony import */ var _clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clerk/nextjs/server */ \"(rsc)/./node_modules/@clerk/nextjs/dist/esm/app-router/server/currentUser.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n // ✅ Connect to DB\n // ✅ Comparison helper\n\n\n\nasync function POST(req) {\n    const user = await (0,_clerk_nextjs_server__WEBPACK_IMPORTED_MODULE_3__.currentUser)();\n    if (!user) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        const users = await _config_db__WEBPACK_IMPORTED_MODULE_0__.db.select().from(_config_schema__WEBPACK_IMPORTED_MODULE_1__.usersTable).where((0,drizzle_orm__WEBPACK_IMPORTED_MODULE_4__.eq)(_config_schema__WEBPACK_IMPORTED_MODULE_1__.usersTable.email, user?.primaryEmailAddress?.emailAddress || \"\"));\n        if (users.length === 0) {\n            const result = await _config_db__WEBPACK_IMPORTED_MODULE_0__.db.insert(_config_schema__WEBPACK_IMPORTED_MODULE_1__.usersTable).values({\n                name: user.fullName || \"\",\n                email: user.primaryEmailAddress?.emailAddress || \"\",\n                credits: 10\n            }).returning();\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(result[0]);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(users[0]);\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: e\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFpQyxDQUFDLGtCQUFrQjtBQUNuQixDQUFDLHNCQUFzQjtBQUNYO0FBQ007QUFDSztBQUVqRCxlQUFlSyxLQUFLQyxHQUFnQjtJQUN6QyxNQUFNQyxPQUFPLE1BQU1KLGlFQUFXQTtJQUU5QixJQUFJLENBQUNJLE1BQU07UUFDVCxPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtJQUVBLElBQUk7UUFDRixNQUFNQyxRQUFRLE1BQU1YLDBDQUFFQSxDQUFDWSxNQUFNLEdBQUdDLElBQUksQ0FBQ1gsc0RBQVVBLEVBQzVDWSxLQUFLLENBQUNiLCtDQUFFQSxDQUFDQyxzREFBVUEsQ0FBQ2EsS0FBSyxFQUFFUixNQUFNUyxxQkFBcUJDLGdCQUFnQjtRQUV6RSxJQUFJTixNQUFNTyxNQUFNLEtBQUssR0FBRztZQUN0QixNQUFNQyxTQUFTLE1BQU1uQiwwQ0FBRUEsQ0FBQ29CLE1BQU0sQ0FBQ2xCLHNEQUFVQSxFQUFFbUIsTUFBTSxDQUFDO2dCQUNoREMsTUFBTWYsS0FBS2dCLFFBQVEsSUFBSTtnQkFDdkJSLE9BQU9SLEtBQUtTLG1CQUFtQixFQUFFQyxnQkFBZ0I7Z0JBQ2pETyxTQUFTO1lBQ1gsR0FBR0MsU0FBUztZQUVaLE9BQU9yQixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDVyxNQUFNLENBQUMsRUFBRTtRQUNwQztRQUVBLE9BQU9mLHFEQUFZQSxDQUFDSSxJQUFJLENBQUNHLEtBQUssQ0FBQyxFQUFFO0lBQ25DLEVBQUUsT0FBT2UsR0FBRztRQUNWLE9BQU90QixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVDLE9BQU9pQjtRQUFFO0lBQ3RDO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcamFndXdcXE9uZURyaXZlXFxEb2N1bWVudHNcXE5leHRqcyBSZWFjdFxcYWktbWVkaWNhbC12b2ljZS1hZ2VudFxcYXBwXFxhcGlcXHVzZXJcXHJvdXRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCJAL2NvbmZpZy9kYlwiOyAvLyDinIUgQ29ubmVjdCB0byBEQlxyXG5pbXBvcnQgeyBlcSB9IGZyb20gXCJkcml6emxlLW9ybVwiOyAvLyDinIUgQ29tcGFyaXNvbiBoZWxwZXJcclxuaW1wb3J0IHsgdXNlcnNUYWJsZSB9IGZyb20gXCJAL2NvbmZpZy9zY2hlbWFcIjtcclxuaW1wb3J0IHsgY3VycmVudFVzZXIgfSBmcm9tIFwiQGNsZXJrL25leHRqcy9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBjdXJyZW50VXNlcigpO1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBkYi5zZWxlY3QoKS5mcm9tKHVzZXJzVGFibGUpXHJcbiAgICAgIC53aGVyZShlcSh1c2Vyc1RhYmxlLmVtYWlsLCB1c2VyPy5wcmltYXJ5RW1haWxBZGRyZXNzPy5lbWFpbEFkZHJlc3MgfHwgXCJcIikpO1xyXG5cclxuICAgIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIuaW5zZXJ0KHVzZXJzVGFibGUpLnZhbHVlcyh7XHJcbiAgICAgICAgbmFtZTogdXNlci5mdWxsTmFtZSB8fCBcIlwiLFxyXG4gICAgICAgIGVtYWlsOiB1c2VyLnByaW1hcnlFbWFpbEFkZHJlc3M/LmVtYWlsQWRkcmVzcyB8fCBcIlwiLFxyXG4gICAgICAgIGNyZWRpdHM6IDEwLFxyXG4gICAgICB9KS5yZXR1cm5pbmcoKTtcclxuXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHRbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1c2Vyc1swXSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGUgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJkYiIsImVxIiwidXNlcnNUYWJsZSIsImN1cnJlbnRVc2VyIiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcSIsInVzZXIiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ1c2VycyIsInNlbGVjdCIsImZyb20iLCJ3aGVyZSIsImVtYWlsIiwicHJpbWFyeUVtYWlsQWRkcmVzcyIsImVtYWlsQWRkcmVzcyIsImxlbmd0aCIsInJlc3VsdCIsImluc2VydCIsInZhbHVlcyIsIm5hbWUiLCJmdWxsTmFtZSIsImNyZWRpdHMiLCJyZXR1cm5pbmciLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.tsx\n");

/***/ }),

/***/ "(rsc)/./config/db.tsx":
/*!***********************!*\
  !*** ./config/db.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/@neondatabase/serverless/index.mjs\");\n/* harmony import */ var drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/neon-http */ \"(rsc)/./node_modules/drizzle-orm/neon-http/driver.js\");\n\n\nconst sql = (0,_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.neon)(process.env.DATABASE_URL);\nconst db = (0,drizzle_orm_neon_http__WEBPACK_IMPORTED_MODULE_1__.drizzle)({\n    client: sql\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWcvZGIudHN4IiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnRDtBQUNBO0FBRWhELE1BQU1FLE1BQU1GLDhEQUFJQSxDQUFDRyxRQUFRQyxHQUFHLENBQUNDLFlBQVk7QUFDbEMsTUFBTUMsS0FBS0wsOERBQU9BLENBQUM7SUFBRU0sUUFBUUw7QUFBSSxHQUFHIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGphZ3V3XFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxOZXh0anMgUmVhY3RcXGFpLW1lZGljYWwtdm9pY2UtYWdlbnRcXGNvbmZpZ1xcZGIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5lb24gfSBmcm9tICdAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3MnO1xyXG5pbXBvcnQgeyBkcml6emxlIH0gZnJvbSAnZHJpenpsZS1vcm0vbmVvbi1odHRwJztcclxuXHJcbmNvbnN0IHNxbCA9IG5lb24ocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMISk7XHJcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUoeyBjbGllbnQ6IHNxbCB9KTtcclxuIl0sIm5hbWVzIjpbIm5lb24iLCJkcml6emxlIiwic3FsIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsImRiIiwiY2xpZW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./config/db.tsx\n");

/***/ }),

/***/ "(rsc)/./config/schema.tsx":
/*!***************************!*\
  !*** ./config/schema.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   usersTable: () => (/* binding */ usersTable)\n/* harmony export */ });\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/table.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/integer.js\");\n/* harmony import */ var drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! drizzle-orm/pg-core */ \"(rsc)/./node_modules/drizzle-orm/pg-core/columns/varchar.js\");\n\nconst usersTable = (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_0__.pgTable)(\"users\", {\n    id: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)().primaryKey().generatedAlwaysAsIdentity(),\n    name: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull(),\n    email: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_2__.varchar)({\n        length: 255\n    }).notNull().unique(),\n    credits: (0,drizzle_orm_pg_core__WEBPACK_IMPORTED_MODULE_1__.integer)()\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9jb25maWcvc2NoZW1hLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWlFO0FBRTFELE1BQU1HLGFBQWFGLDREQUFPQSxDQUFDLFNBQVM7SUFDekNHLElBQUlKLDREQUFPQSxHQUFHSyxVQUFVLEdBQUdDLHlCQUF5QjtJQUNwREMsTUFBTUwsNERBQU9BLENBQUM7UUFBRU0sUUFBUTtJQUFJLEdBQUdDLE9BQU87SUFDdENDLE9BQU9SLDREQUFPQSxDQUFDO1FBQUVNLFFBQVE7SUFBSSxHQUFHQyxPQUFPLEdBQUdFLE1BQU07SUFDaERDLFNBQVNaLDREQUFPQTtBQUNsQixHQUFHIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGphZ3V3XFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxOZXh0anMgUmVhY3RcXGFpLW1lZGljYWwtdm9pY2UtYWdlbnRcXGNvbmZpZ1xcc2NoZW1hLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbnRlZ2VyLCBwZ1RhYmxlLCB2YXJjaGFyLCB9IGZyb20gXCJkcml6emxlLW9ybS9wZy1jb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlcnNUYWJsZSA9IHBnVGFibGUoXCJ1c2Vyc1wiLCB7XHJcbiAgaWQ6IGludGVnZXIoKS5wcmltYXJ5S2V5KCkuZ2VuZXJhdGVkQWx3YXlzQXNJZGVudGl0eSgpLFxyXG4gIG5hbWU6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCksXHJcbiAgZW1haWw6IHZhcmNoYXIoeyBsZW5ndGg6IDI1NSB9KS5ub3ROdWxsKCkudW5pcXVlKCksXHJcbiAgY3JlZGl0czogaW50ZWdlcigpXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiaW50ZWdlciIsInBnVGFibGUiLCJ2YXJjaGFyIiwidXNlcnNUYWJsZSIsImlkIiwicHJpbWFyeUtleSIsImdlbmVyYXRlZEFsd2F5c0FzSWRlbnRpdHkiLCJuYW1lIiwibGVuZ3RoIiwibm90TnVsbCIsImVtYWlsIiwidW5pcXVlIiwiY3JlZGl0cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./config/schema.tsx\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_jaguw_OneDrive_Documents_Nextjs_React_ai_medical_voice_agent_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.tsx */ \"(rsc)/./app/api/user/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\jaguw\\\\OneDrive\\\\Documents\\\\Nextjs React\\\\ai-medical-voice-agent\\\\app\\\\api\\\\user\\\\route.tsx\",\n    nextConfigOutput,\n    userland: C_Users_jaguw_OneDrive_Documents_Nextjs_React_ai_medical_voice_agent_app_api_user_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzeCZhcHBEaXI9QyUzQSU1Q1VzZXJzJTVDamFndXclNUNPbmVEcml2ZSU1Q0RvY3VtZW50cyU1Q05leHRqcyUyMFJlYWN0JTVDYWktbWVkaWNhbC12b2ljZS1hZ2VudCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDamFndXclNUNPbmVEcml2ZSU1Q0RvY3VtZW50cyU1Q05leHRqcyUyMFJlYWN0JTVDYWktbWVkaWNhbC12b2ljZS1hZ2VudCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0Q7QUFDbkk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGphZ3V3XFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxOZXh0anMgUmVhY3RcXFxcYWktbWVkaWNhbC12b2ljZS1hZ2VudFxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHN4XCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91c2VyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXNlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGphZ3V3XFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxOZXh0anMgUmVhY3RcXFxcYWktbWVkaWNhbC12b2ljZS1hZ2VudFxcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHN4XCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@clerk","vendor-chunks/next","vendor-chunks/tslib","vendor-chunks/cookie","vendor-chunks/map-obj","vendor-chunks/no-case","vendor-chunks/lower-case","vendor-chunks/snakecase-keys","vendor-chunks/snake-case","vendor-chunks/dot-case","vendor-chunks/drizzle-orm","vendor-chunks/@neondatabase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.tsx&appDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cjaguw%5COneDrive%5CDocuments%5CNextjs%20React%5Cai-medical-voice-agent&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();