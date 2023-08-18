"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pluraliser_1 = __importDefault(require("../utils/pluraliser"));
var config = {
    query: {
        pluraliser: pluraliser_1.default,
    },
    page: {
        ignore: ["RedirectorPage", "ErrorPage", "VirtualPage"]
    },
    baseURL: "",
    baseDir: "",
    client: function () {
        return {
            endpoint: "",
            options: {
                headers: {},
            },
        };
    }
};
exports.default = config;
//# sourceMappingURL=defaultConfig.js.map