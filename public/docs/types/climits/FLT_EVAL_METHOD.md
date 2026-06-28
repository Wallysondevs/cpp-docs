# FLT_EVAL_METHOD

Definido no cabeçalho `[<cfloat>](<#/doc/header/cfloat>)`

```c
#define FLT_EVAL_METHOD /* implementation-defined */
```

Especifica a precisão na qual todas as operações aritméticas de ponto flutuante, exceto atribuição e cast, são realizadas.

Valor | Explicação
---|---
valores negativos, exceto -1 | comportamento indefinido pela implementação
-1 | a precisão padrão não é conhecida
​0​ | todas as operações e constantes são avaliadas na faixa e precisão do tipo usado. Além disso, float_t e double_t são equivalentes a float e double, respectivamente
1 | todas as operações e constantes são avaliadas na faixa e precisão de double. Além disso, tanto float_t quanto double_t são equivalentes a double
2 | todas as operações e constantes são avaliadas na faixa e precisão de long double. Além disso, tanto float_t quanto double_t são equivalentes a long double

### Notas

Independentemente do valor de FLT_EVAL_METHOD, qualquer expressão de ponto flutuante pode ser _contraída_, ou seja, calculada como se todos os resultados intermediários tivessem faixa e precisão infinitas (a menos que [` #pragma`](<#/doc/preprocessor/impl>) STDC FP_CONTRACT esteja desativado).

Cast e atribuição removem qualquer faixa e precisão extras: isso modela a ação de armazenar um valor de um registrador FPU de precisão estendida em um local de memória de tamanho padrão.

### Veja também

[Documentação C](<#/>) para FLT_EVAL_METHOD
---