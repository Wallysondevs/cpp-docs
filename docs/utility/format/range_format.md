# std::range_format

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
enum class range_format {
disabled,
map,
set,
sequence,
string,
debug_string
};
```

Especifica como um range deve ser formatado.

### Constantes

Nome | Explicação
---|---
`disabled` | impede que o formatador padrão de range formate o range
`map` | permite formatar o range como uma representação de mapa com colchetes modificados "{", "}" e separador ": " para tipos [_pair-like_](<#/doc/utility/tuple/tuple-like>) subjacentes no seguinte formato:
{ key-1 : value-1, ..., key-n : value-n }
`set` | permite formatar o range como uma representação de conjunto com colchetes modificados "{" e "}" no seguinte formato:
{ key-1, ..., key-n }
`sequence` | permite formatar o range como uma representação de sequência com colchetes padrão "[", "]" e separador ", " no seguinte formato:
[ element-1, ..., element-n ]
`string` | permite formatar o range como string
---|---
`debug_string` | permite formatar o range como string escapada

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(class template)
[ format_kind](<#/doc/utility/format/format_kind>)(C++23) | seleciona um std::range_format adequado para um range
(variable template)