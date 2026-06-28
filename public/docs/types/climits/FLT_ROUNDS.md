# FLT_ROUNDS

Definido no header `[<cfloat>](<#/doc/header/cfloat>)`
#define FLT_ROUNDS /* implementation defined */

Especifica a direção de arredondamento atual das operações aritméticas de ponto flutuante.

Valor | Explicação
---|---
`-1` | a direção de arredondamento padrão é desconhecida
`0` | em direção a zero; mesmo significado que [FE_TOWARDZERO](<#/doc/numeric/fenv/FE_round>)
`1` | para o mais próximo; mesmo significado que [FE_TONEAREST](<#/doc/numeric/fenv/FE_round>)
`2` | em direção ao infinito positivo; mesmo significado que [FE_UPWARD](<#/doc/numeric/fenv/FE_round>)
`3` | em direção ao infinito negativo; mesmo significado que [FE_DOWNWARD](<#/doc/numeric/fenv/FE_round>)
outros valores | comportamento definido pela implementação

### Notas

O modo de arredondamento pode ser alterado com [std::fesetround](<#/doc/numeric/fenv/feround>) e **FLT_ROUNDS** reflete essa alteração.

Os valores possíveis de FLT_ROUNDS correspondem aos valores possíveis de [std::float_round_style](<#/doc/types/numeric_limits/float_round_style>), retornados por [std::numeric_limits::round_style](<#/doc/types/numeric_limits/round_style>).

### Veja também

[ float_round_style](<#/doc/types/numeric_limits/float_round_style>) | indica modos de arredondamento de ponto flutuante
(enum)
[ fegetroundfesetround](<#/doc/numeric/fenv/feround>)(desde C++11)(desde C++11) | obtém ou define a direção de arredondamento
(função)
[ FE_DOWNWARDFE_TONEARESTFE_TOWARDZEROFE_UPWARD](<#/doc/numeric/fenv/FE_round>)(desde C++11) | direção de arredondamento de ponto flutuante
(macro constante)
[Documentação C](<#/>) para FLT_ROUNDS