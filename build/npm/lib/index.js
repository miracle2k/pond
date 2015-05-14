"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var moment = require("moment");
var _ = require("underscore");

var util = require("./util");
var TimeRange = require("./range");

var units = {
    s: { label: "seconds", length: 1 },
    m: { label: "minutes", length: 60 },
    h: { label: "hours", length: 60 * 60 },
    d: { label: "days", length: 60 * 60 * 24 }
};

/**
 * An index that represents as a string a range of time.
 *
 * The actual derived timerange can be found using asRange(). This will return
 * a TimeRange instance.
 *
 * The original string representation can be found with toString().
 */

var Index = (function () {
    function Index(s) {
        _classCallCheck(this, Index);

        this._s = s;
        this._r = this._rangeFromIndexString(s);
    }

    _createClass(Index, {
        _rangeFromIndexString: {
            value: function _rangeFromIndexString(s) {
                var parts = s.split("-");
                var size = parts[0];

                //Position should be an int
                var pos = parseInt(parts[1], 10);

                //size should be two parts, a number and a letter
                var re = /([0-9]+)([smhd])/;

                var sizeParts = re.exec(size);
                if (sizeParts && sizeParts.length >= 3) {
                    var num = parseInt(sizeParts[1]);
                    var unit = sizeParts[2];
                    var length = num * units[unit].length * 1000;
                }

                var beginTime = moment.utc(pos * length);
                var endTime = moment.utc((pos + 1) * length);

                return new TimeRange(beginTime, endTime);
            }
        },
        toJSON: {
            value: function toJSON() {
                return this._s;
            }
        },
        toString: {
            value: function toString() {
                return this._s;
            }
        },
        asString: {
            value: function asString() {
                return this.toString(); //alias
            }
        },
        asTimerange: {
            value: function asTimerange() {
                return this._r;
            }
        }
    });

    return Index;
})();

module.exports = Index;