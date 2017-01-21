/**
 keyvalue.js v0.1 
 Copyright (c)2017-2018 Rene Koch.
 Licensed under The MIT License.
**/
;(function (root, module) {
	(typeof define === 'function' && define.amd) ? define(['jquery'], module) : module(root.jQuery || root.$);
})(
window,
function ($) {
	var
		log = (window.console && console.info) || $.noop,
		PLLUGINNAME = 'keyvalue',
		DOT = '.',
		DOT_PLLUGINNAME = DOT + PLLUGINNAME,
		FNNAME = '_' + PLLUGINNAME,
		OLDDATA = FNNAME + '_DATA',
		EMPTYKEY = 'data-empty',
		DEFAULTS = {
			wrapClass: PLLUGINNAME + '-wrap',
			lineClass: PLLUGINNAME + '-line',
			keyClass: PLLUGINNAME + '-key',
			valueClass: PLLUGINNAME + '-value',
			deleteClass: PLLUGINNAME + '-delete',
			placeholder: {
				key: 'key',
				value: 'value',
				delete: 'remove'
			}
		};

	$.fn[PLLUGINNAME] = function (options, val, val2) {
		var FN = this.data(FNNAME);

		return FN && FN[0] ? FN[0](options, val) : this.each(function () {
				var
					OPTIONS,
					$input = $(this),
					$wrap,
					VALUES,

					destroy = function () {
						var $old_input = $input;
						$input && $input.show().removeData(FNNAME).off(DOT_PLLUGINNAME);
						$input = $wrap = VALUES = OPTIONS = null;

						return $old_input;
					},

					line = function ($line) {
						return {
							key: $line.find(DOT + OPTIONS.keyClass).val(),
							val: $line.find(DOT + OPTIONS.valueClass).val(),
							old: $line.data(OLDDATA) || {},
							line: $line
						};
					},
					update = function () {
						VALUES = {};
						var last;
						$wrap.children().each(function () {
							last = line($(this));
							if (last.key) VALUES[last.key] = last.val;
						});
						$input.val(JSON.stringify(VALUES));

						if (!last || last.key != '') add('');

						return $input.val(JSON.stringify(VALUES));
					},
					add = function (key, val, doUpdate) {
						$('<div />', {'class': OPTIONS.lineClass})
							.appendTo($wrap)
							.append(
								$('<input />', {type: 'text', 'class': OPTIONS.keyClass}).attr('placeholder', OPTIONS.placeholder.key).val(key),
								$('<input />', {type: 'text', 'class': OPTIONS.valueClass}).attr('placeholder', OPTIONS.placeholder.value).val(val),
								$('<span />', {'class': OPTIONS.deleteClass, 'title': OPTIONS.placeholder.delete}).text('x')
							)
							.attr(EMPTYKEY, key == '' ? 1 : 0);

						if (doUpdate) update();

						return $input;
					},
					focus = function () {
						$wrap.find(DOT + OPTIONS.keyClass).last().focus();
						return $input;
					},
					change = function () {

						var $line = $(this).parent(), data = line($line), changed = 0;

						if (data.key == '') {
							if (data.old.key) changed = $input.trigger('keydelete', data);
							$line.remove();
						}
						else if (data.old.key != '') {
							changed = $input.trigger('keyadd', data);
						}
						else if (data.old.key != data.key || VALUES[data.key] != data.val) {
							changed = $input.trigger('keychange', data);
						}

						$line.data(OLDDATA, $.extend({}, data)).attr(EMPTYKEY, data.key == '' ? 1 : 0);

						update();
						if (changed) $input.trigger('change');

						return $input;
					},
					del = function () {
						return update().trigger('keydelete', data).trigger('change')
					};

				FN = function (options, val, val2) {

					if (options === "option") {
						return val ? OPTIONS[val] : OPTIONS;
					}
					if (options === "values") {
						return VALUES;
					}
					if (options === "add") {
						return add(val, val2);
					}
					if (options === "focus") {
						return focus();
					}
					if (options === "remove") {
						//return add(val, val2);
					}
					if (options === "update") {
						return update();
					}
					if (options === "destroy") {
						return destroy();
					}

					if ($.isPlainObject(options)) {

						//clean up any previous calls to plugin
						$input = destroy();

						//set new options
						OPTIONS = $.extend({}, DEFAULTS, options);
						OPTIONS.placeholder = $.extend({}, DEFAULTS.placeholder, options.placeholder);

						$wrap = $('<div>', {'class': OPTIONS.wrapClass});

						VALUES = options.values;
						if (!VALUES) {
							val = $input ? $input.val() : null;
							try {
								VALUES = JSON.parse(val || null) || {};
							}
							catch (e) {
								log('Invalid value ("' + val + '") defaulting to empty list')
							}

						}

						if (!$.isPlainObject(VALUES)) VALUES = {};

						for (var key in VALUES) add(key, VALUES[key]);

						$input.hide()
						//wrapped in an array to fix a jquery "feature"
							.data(FNNAME, [FN])
							.after($wrap)
							.off(DOT_PLLUGINNAME)
							.on('comosoedit' + DOT_PLLUGINNAME, destroy);

						$wrap
							.on('click', DOT + OPTIONS.deleteClass, del)
							.on('input keyup paste mouseup', focus)
							.on('blur', 'input', change);

						if (OPTIONS.onkeyadd) $input.on('keyadd' + DOT_PLLUGINNAME, OPTIONS.onkeyadd);
						if (OPTIONS.onkeydelete) $input.on('keydelete' + DOT_PLLUGINNAME, OPTIONS.onkeydelete);
						if (OPTIONS.onkeychange) $input.on('keychange' + DOT_PLLUGINNAME, OPTIONS.onkeychange);
					}

					return update();
				};

				return FN(options || {}, val, val2);
			});
	};

	return $;
}

);
