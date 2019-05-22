import Quill from 'quill'
var Parchment = Quill.import("parchment")
const levels = [1, 2, 3, 4, 5];
const multiplier = 2;

export default class IndentAttributor extends Parchment.Attributor.Style {
	add(node, value) {
		return super.add(node, `${value * multiplier}em`);
	}

	value(node) {
		return parseFloat(super.value(node)) / multiplier || undefined; // Don't return NaN
	}
}

const IndentStyle = new IndentAttributor('indent', 'margin-left', {
	scope: Parchment.Scope.BLOCK,
	whitelist: levels.map(value => `${value * multiplier}em`)
});

Quill.register(IndentStyle);