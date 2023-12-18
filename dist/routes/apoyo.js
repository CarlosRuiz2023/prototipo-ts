"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apoyos_1 = require("../controllers/apoyos");
const router = (0, express_1.Router)();
router.get("/", apoyos_1.apoyosGet);
router.get("/estatus/", apoyos_1.apoyosEstatusGet);
exports.default = router;
//# sourceMappingURL=apoyo.js.map