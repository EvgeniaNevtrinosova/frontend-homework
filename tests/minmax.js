'use strict';

QUnit.module('Тестируем функцию minmax', function () {
	QUnit.test('minmax работает правильно на строках без чисел', function (assert) {
		assert.deepEqual(minmax(''), [undefined, undefined], 'Особый случай, когда в строке нет чисел');
		assert.deepEqual(minmax('мама мыла раму'), [undefined, undefined]);
	});

	QUnit.test('minmax правильно парсит отдельные числа', function (assert) {
		assert.deepEqual(minmax('0'), [0, 0]);
		assert.deepEqual(minmax('1'), [1, 1]);
		assert.deepEqual(minmax('Infinity'), [Infinity, Infinity]);
		assert.deepEqual(minmax('-Infinity'), [-Infinity, -Infinity]);
		assert.deepEqual(minmax('42'), [42, 42]);
		assert.deepEqual(minmax('.0'), [.0, .0]);
		assert.deepEqual(minmax('1.1'), [1.1, 1.1]);
		assert.deepEqual(minmax('.01'), [.01, .01]);
		assert.deepEqual(minmax('1.01'), [1.01, 1.01]);
		assert.deepEqual(minmax('1e5'), [1e5, 1e5]);
		assert.deepEqual(minmax('-1e-5'), [-1e-5, -1e-5]);
		assert.deepEqual(minmax('-.1e-5'), [-.1e-5, -.1e-5]);
	});

	QUnit.test('minmax правильно парсит несколько чисел', function (assert) {
		assert.deepEqual(minmax('0 0 0 0'), [0, 0]);
		assert.deepEqual(minmax('1 1 1 1'), [1, 1]);
		assert.deepEqual(minmax('1 2 3 4'), [1, 4]);
		assert.deepEqual(minmax('-Infinity -1 0 1 Infinity'), [-Infinity, Infinity]);
		assert.deepEqual(minmax('-.01 0 .01'), [-.01, .01]);
	});

	QUnit.test('minmax игнорирует обычный текст', function (assert) {
		assert.deepEqual(minmax('1, -5.8 или 10, хотя 34 + -5.3 и 73'), [-5.8, 73]);
	});

    QUnit.test('minmax правильно обрабатывает числа внутри слова', function (assert) {
        assert.deepEqual(minmax('gh1hgjghj23ghjh444hjhb0j'), [0, 444]);
        assert.deepEqual(minmax('a-123.5fds35e-6vd'), [-123.5, 35e-6]);
        assert.deepEqual(minmax('a527e5d'), [527e5, 527e5]);
        assert.deepEqual(minmax('Infinity33'), [33, Infinity]);
    });

    QUnit.test('minmax различает E в любом регистре', function (assert) {
        assert.deepEqual(minmax('uvd1e10 k2E20c'), [1e10, 2e20]);
    });

    QUnit.test('minmax корректно обрабатывает некорректные данные', function (assert) {
        assert.deepEqual(minmax(null), [undefined, undefined]);
        assert.deepEqual(minmax(NaN), [undefined, undefined]);
        assert.deepEqual(minmax(undefined), [undefined, undefined]);
        assert.deepEqual(minmax([1, 2, 3]), [undefined, undefined]);
    });


});

