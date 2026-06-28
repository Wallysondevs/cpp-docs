# std::is_enum

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_enum;
```

`std::is_enum` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [tipo de enumeração](<#/doc/language/enum>). Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de enumeração. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_enum` ou `std::is_enum_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_enum_v = is_enum<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de enumeração, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { enum E {}; };
    static_assert(std::is_enum_v<A> == false);
    static_assert(std::is_enum_v<A::E> == true);
    
    enum E {};
    static_assert(std::is_enum_v<E> == true);
    
    enum class Ec : int {};
    static_assert(std::is_enum_v<Ec> == true);
    
    static_assert(std::is_enum_v<int> == false);
    
    int main() {}
```

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(template de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(template de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)
[ is_scoped_enum](<#/doc/types/is_scoped_enum>)(C++23) | verifica se um tipo é um tipo de enumeração com escopo
(template de classe)