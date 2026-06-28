# std::in_place, std::in_place_type, std::in_place_index, std::in_place_t, std::in_place_type_t, std::in_place_index_t

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
struct in_place_t { explicit in_place_t() = default; };
inline constexpr std::in_place_t in_place {};
template< class T >
struct in_place_type_t { explicit in_place_type_t() = default; };
template< class T >
constexpr std::in_place_type_t<T> in_place_type {};
template< std::size_t I >
struct in_place_index_t { explicit in_place_index_t() = default; };
template< std::size_t I >
constexpr std::in_place_index_t<I> in_place_index {};
```

1,3,5) Os tipos/modelos de tipo `std::in_place_t`, `std::in_place_type_t` e `std::in_place_index_t` podem ser usados na lista de parâmetros do construtor para corresponder à tag pretendida.

2,4,6) As instâncias correspondentes `std::in_place`, `std::in_place_type` e `std::in_place_index` de (1,3,5) são tags de desambiguação que podem ser passadas para os construtores para indicar que o objeto contido deve ser construído in-place, e (para as duas últimas) o tipo do objeto a ser construído.

### Biblioteca padrão

Os seguintes tipos da biblioteca padrão usam (1-6) como tags de desambiguação:

[ any](<#/doc/utility/any>)(C++17) | objetos que armazenam instâncias de qualquer tipo [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(classe)
[ expected](<#/doc/utility/expected>)(C++23) | um wrapper que contém um valor esperado ou de erro
(modelo de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(modelo de classe)
[ variant](<#/doc/utility/variant>)(C++17) | uma união discriminada type-safe
(modelo de classe)

### Veja também

[ sorted_uniquesorted_unique_t](<#/doc/container/sorted_unique>)(C++23) | indica que os elementos de um range estão ordenados e são únicos
(tag)
[ sorted_equivalentsorted_equivalent_t](<#/doc/container/sorted_equivalent>)(C++23) | indica que os elementos de um range estão ordenados (unicidade não é exigida)
(tag)