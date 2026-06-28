# std::is_error_code_enum

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
template< class T >
struct is_error_code_enum;
```

Se `T` é uma enumeração de código de erro (como [std::io_errc](<#/doc/io/io_errc>) e [std::future_errc](<#/doc/thread/future_errc>)), este template fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Este template pode ser especializado para um [tipo definido pelo programa](<#/doc/language/type-id>) para indicar que o tipo é elegível para conversão implícita de [std::error_code](<#/doc/error/error_code>).

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_error_code_enum_v = is_error_code_enum<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é uma enumeração de código de erro, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

Execute este código
```cpp
    #include <ios>
    #include <system_error>
    
    static_assert(std::is_error_code_enum_v<decltype(std::io_errc::stream)>);
    static_assert(!std::is_error_code_enum_v<std::error_category>);
    
    int main() {}
```

### Veja também

[ is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)(C++11) | identifica uma enumeração como uma [std::error_condition](<#/doc/error/error_condition>)
(template de classe)