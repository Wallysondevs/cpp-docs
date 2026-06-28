# std::is_error_condition_enum&lt;std::errc&gt;

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template<>
struct is_error_condition_enum<std::errc> : std::true_type;
```

Especifica que [std::errc](<#/doc/error/errc>) é um enum de condição de erro. Isso permite a conversão implícita para [std::error_condition](<#/doc/error/error_condition>).

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Ver também

[ is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)(C++11) | identifica uma enumeração como um(a) [std::error_condition](<#/doc/error/error_condition>)
(modelo de classe)