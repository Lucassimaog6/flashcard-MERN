module.exports = {
	extends: [
		'plugin:@typescript-eslint/eslint-recommended', // Usa as regras recomendadas do @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Usa eslint-config-prettier para desabilitar regras ESLint de @typescript-eslint/eslint-plugin que entraria em conflito com Prettier
		'plugin:prettier/recommended', // Ativa o eslint-plugin-prettier e exibe erros Prettier como erros ESLint. Certifique-se de que esta seja sempre a última configuração no array
	],
};
