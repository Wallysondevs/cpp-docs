# std::money_base

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class money_base;
```

A classe **std::money_base** fornece constantes que são herdadas e usadas pelas facets [std::moneypunct](<#/doc/locale/moneypunct>), [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>).

### Tipos Membro

Tipo | Definição
---|---
enum part { none, space, symbol, sign, value }; | tipo de enumeração não escopado
struct pattern { char field[4]; }; | o tipo de formato monetário
Constante de enumeração | Definição
`none` | espaço em branco é permitido, mas não obrigatório, exceto na última posição, onde espaço em branco não é permitido
`space` | um ou mais caracteres de espaço em branco são obrigatórios
`symbol` | a sequência de caracteres retornada por moneypunct::curr_symbol é obrigatória
`sign` | o primeiro dos caracteres retornados por moneypunct::positive_sign ou moneypunct::negative_sign é obrigatório
`value` | o valor monetário numérico absoluto é obrigatório

### Notas

O formato monetário é um array de quatro chars conversíveis para `std::money_base::part`. Nessa sequência, cada um de symbol, sign e value aparece exatamente uma vez, e ou space ou none aparece na posição restante. O valor none, se presente, não é o primeiro; o valor space, se presente, não é nem o primeiro nem o último.

O formato padrão, retornado pelas especializações padrão de [std::moneypunct](<#/doc/locale/moneypunct>) é {symbol, sign, none, value}.

### Veja também

[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)
[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres
(modelo de classe)