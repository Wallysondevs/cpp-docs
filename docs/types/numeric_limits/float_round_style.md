# std::float_round_style

Definido no cabeçalho `[<limits>](<#/doc/header/limits>)`

```c
enum float_round_style {
round_indeterminate = -1,
round_toward_zero = 0,
round_to_nearest = 1,
round_toward_infinity = 2,
round_toward_neg_infinity = 3
};
```

As constantes de enumeração do tipo `std::float_round_style` indicam o estilo de arredondamento usado pela aritmética de ponto flutuante sempre que o resultado de uma expressão é armazenado em um objeto de um tipo de ponto flutuante. Os valores são:

### Constantes de enumeração

Nome | Definição
---|---
**std::round_indeterminate** | O estilo de arredondamento não pode ser determinado
**std::round_toward_zero** | Arredondamento em direção a zero
**std::round_to_nearest** | Arredondamento em direção ao valor representável mais próximo
**std::round_toward_infinity** | Arredondamento em direção ao infinito positivo
**std::round_toward_neg_infinity** | Arredondamento em direção ao infinito negativo

### Veja também

[ round_style](<#/doc/types/numeric_limits/round_style>)[static] | identifica o estilo de arredondamento usado pelo tipo
(constante membro estática pública)
[ FE_DOWNWARDFE_TONEARESTFE_TOWARDZEROFE_UPWARD](<#/doc/numeric/fenv/FE_round>)(C++11) | direção de arredondamento de ponto flutuante
(constante de macro)