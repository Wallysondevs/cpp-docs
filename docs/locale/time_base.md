# std::time_base

Definido no header `[<locale>](<#/doc/header/locale>)`

```cpp
class time_base;
```

A classe **std::time_base** fornece as constantes de ordem de data que são herdadas pelos facets [std::time_get](<#/doc/locale/time_get>).

### Tipos de membros

Tipo de membro | Definição
---|---
enum dateorder { no_order, dmy, mdy, ymd, ydm }; | Tipo de enumeração não escopado
Constante de enumeração | Definição
`no_order` | Ordem não especificada
`dmy` | Dia, mês, ano (ordem europeia)
`mdy` | Mês, dia, ano (ordem americana)
`ymd` | Ano, mês, dia (ordem asiática)
`ydm` | Ano, dia, mês

### Veja também

[ do_date_order](<#/doc/locale/time_get/date_order>)[virtual] | obtém a ordem preferencial de dia, mês e ano
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_date](<#/doc/locale/time_get/get_date>)[virtual] | extrai mês, dia e ano de um stream de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)