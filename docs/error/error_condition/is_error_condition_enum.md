# std::is_error_condition_enum

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template< class T >
struct is_error_condition_enum;
```

Se `T` é um enum de condição de erro (como [std::errc](<#/doc/error/errc>)), este template fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Este template pode ser especializado para um [tipo definido pelo programa](<#/doc/language/type-id>) para indicar que o tipo é elegível para conversões implícitas de [std::error_condition](<#/doc/error/error_condition>).

### Template de variável auxiliar

```cpp
template< class T >
inline constexpr bool is_error_condition_enum_v =
is_error_condition_enum<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um enum de condição de erro, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Veja também

[ is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)(C++11) | identifica uma classe como uma enumeração `error_code`
(template de classe)