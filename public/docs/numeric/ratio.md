# Aritmética racional em tempo de compilação (desde C++11)

O template de classe `std::ratio` e os templates associados fornecem suporte para aritmética racional em tempo de compilação. Cada instanciação deste template representa exatamente qualquer número racional finito.

### Frações em tempo de compilação

Definido no header `[<ratio>](<#/doc/header/ratio>)`
---
[ ratio](<#/doc/numeric/ratio/ratio>)(C++11) | representa uma fração racional exata
(template de classe)

Os seguintes typedefs de conveniência que correspondem às razões SI são fornecidos pela standard library:

Definido no header `[<ratio>](<#/doc/header/ratio>)`
---
Tipo | Definição
---|---
`quecto` (desde C++26) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000000000>` `(10-30)[1](<#/doc/numeric/ratio>)`
`ronto` (desde C++26) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000000>` `(10-27)[1](<#/doc/numeric/ratio>)`
`yocto` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000>` `(10-24)[1](<#/doc/numeric/ratio>)`
`zepto` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000>` `(10-21)[1](<#/doc/numeric/ratio>)`
`atto` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000>` `(10-18)`
`femto` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000>` `(10-15)`
`pico` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000>` `(10-12)`
`nano` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000>` `(10-9)`
`micro` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000>` `(10-6)`
`milli` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000>` `(10-3)`
`centi` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 100>` `(10-2)`
`deci` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1, 10>` `(10-1)`
`deca` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<10, 1>` `(101)`
`hecto` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<100, 1>` `(102)`
`kilo` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000, 1>` `(103)`
`mega` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000, 1>` `(106)`
`giga` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000, 1>` `(109)`
`tera` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000, 1>` `(1012)`
`peta` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000, 1>` `(1015)`
`exa` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000, 1>` `(1018)`
`zetta` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000, 1>` `(1021)[2](<#/doc/numeric/ratio>)`
`yotta` (desde C++11) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000, 1>` `(1024)[2](<#/doc/numeric/ratio>)`
`ronna` (desde C++26) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000000, 1>` `(1027)[2](<#/doc/numeric/ratio>)`
`quetta` (desde C++26) | `[std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000000000, 1>` `(1030)[2](<#/doc/numeric/ratio>)`

1. ↑ [1.0](<#/doc/numeric/ratio>) [1.1](<#/doc/numeric/ratio>) [1.2](<#/doc/numeric/ratio>) [1.3](<#/doc/numeric/ratio>) Estes typedefs são declarados apenas se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador.
2. ↑ [2.0](<#/doc/numeric/ratio>) [2.1](<#/doc/numeric/ratio>) [2.2](<#/doc/numeric/ratio>) [2.3](<#/doc/numeric/ratio>) Estes typedefs são declarados apenas se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador.

### Aritmética racional em tempo de compilação

Vários alias templates, que realizam operações aritméticas em objetos `ratio` em tempo de compilação, são fornecidos.

Definido no header `[<ratio>](<#/doc/header/ratio>)`
---
[ ratio_add](<#/doc/numeric/ratio/ratio_add>)(C++11) | adiciona dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_subtract](<#/doc/numeric/ratio/ratio_subtract>)(C++11) | subtrai dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_multiply](<#/doc/numeric/ratio/ratio_multiply>)(C++11) | multiplica dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_divide](<#/doc/numeric/ratio/ratio_divide>)(C++11) | divide dois objetos `ratio` em tempo de compilação
(alias template)

### Comparação racional em tempo de compilação

Vários templates de classe, que realizam operações de comparação em objetos `ratio` em tempo de compilação, são fornecidos.

Definido no header `[<ratio>](<#/doc/header/ratio>)`
---
[ ratio_equal](<#/doc/numeric/ratio/ratio_equal>)(C++11) | compara dois objetos `ratio` por igualdade em tempo de compilação
(template de classe)
[ ratio_not_equal](<#/doc/numeric/ratio/ratio_not_equal>)(C++11) | compara dois objetos `ratio` por desigualdade em tempo de compilação
(template de classe)
[ ratio_less](<#/doc/numeric/ratio/ratio_less>)(C++11) | compara dois objetos `ratio` por _menor que_ em tempo de compilação
(template de classe)
[ ratio_less_equal](<#/doc/numeric/ratio/ratio_less_equal>)(C++11) | compara dois objetos `ratio` por _menor ou igual a_ em tempo de compilação
(template de classe)
[ ratio_greater](<#/doc/numeric/ratio/ratio_greater>)(C++11) | compara dois objetos `ratio` por _maior que_ em tempo de compilação
(template de classe)
[ ratio_greater_equal](<#/doc/numeric/ratio/ratio_greater_equal>)(C++11) | compara dois objetos `ratio` por _maior ou igual a_ em tempo de compilação
(template de classe)