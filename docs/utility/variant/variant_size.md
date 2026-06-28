# std::variant_size, std::variant_size_v

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class T >
struct variant_size; /* undefined */
template< class... Types >
struct variant_size<std::variant<Types...>>
: std::integral_constant<std::size_t, sizeof...(Types)> {};
template< class T >
class variant_size<const T>;
template< class T >
class variant_size<volatile T>;
(obsoleto desde C++20)
template< class T >
class variant_size<const volatile T>;
(obsoleto desde C++20)
```

Fornece acesso ao número de alternativas em um variant possivelmente cv-qualificado como uma expressão constante em tempo de compilação.

Formalmente,

2) atende aos requisitos de [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com uma característica base de [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), sizeof...(Types)>

3-5) atende aos requisitos de [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com uma característica base de [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), std::variant_size&lt;T&gt;::value>

### Template de variável auxiliar

```cpp
template< class T >
constexpr std::size_t variant_size_v = std::variant_size<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `sizeof...(Types)`
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Notas

Todas as especializações de `std::variant_size` satisfazem [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com _característica base_ [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), N> para algum `N`.

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <variant>
    
    static_assert(std::variant_size_v<std::variant<>> == 0);
    static_assert(std::variant_size_v<std::variant<int>> == 1);
    static_assert(std::variant_size_v<std::variant<int, int>> == 2);
    static_assert(std::variant_size_v<std::variant<int, int, int>> == 3);
    static_assert(std::variant_size_v<std::variant<int, float, double>> == 3);
    static_assert(std::variant_size_v<std::variant<std::monostate, void>> == 2);
    static_assert(std::variant_size_v<std::variant<const int, const float>> == 2);
    static_assert(std::variant_size_v<std::variant<std::variant<std::any>>> == 1);
    
    int main() {}
```

### Veja também

[ variant_alternativevariant_alternative_t](<#/doc/utility/variant/variant_alternative>)(C++17) | obtém o tipo da alternativa especificada por seu índice, em tempo de compilação
(template de classe) (template de alias)
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) | obtém o tamanho de uma `tuple`
(especialização de template de classe)