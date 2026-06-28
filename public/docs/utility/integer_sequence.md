# std::integer_sequence

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T, T... Ints >
class integer_sequence;
```

O template de classe `std::integer_sequence` representa uma sequência de inteiros em tempo de compilação. Quando usado como um argumento para um [template de função](<#/doc/language/function_template>), o [parameter pack](<#/doc/language/parameter_pack>) `Ints` pode ser deduzido e usado em expansão de pack.

### Parâmetros do template

- **T** — um tipo inteiro para usar para os elementos da sequência
- **...Ints** — um parameter pack não-tipo representando a sequência

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | `T`

### Funções membro

** size**[static] | retorna o número de elementos em `Ints`
(função membro estática pública)

## std::integer_sequence::size

static constexpr [std::size_t](<#/doc/types/size_t>) size() noexcept;

Retorna o número de elementos em `Ints`. Equivalente a sizeof...(Ints).

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos em `Ints`.

### Templates auxiliares

Um template de alias auxiliar `std::index_sequence` é definido para o caso comum onde `T` é [std::size_t](<#/doc/types/size_t>):

template< [std::size_t](<#/doc/types/size_t>)... Ints >
using index_sequence = std::integer_sequence<[std::size_t](<#/doc/types/size_t>), Ints...>;

Templates de alias auxiliares `std::make_integer_sequence` e `std::make_index_sequence` são definidos para simplificar a criação de tipos `std::integer_sequence` e `std::index_sequence`, respectivamente, com 0, 1, 2, ..., N - 1 como `Ints`:

template< class T, T N >
using make_integer_sequence = std::integer_sequence<T, /* a sequence 0, 1, 2, ..., N-1 */>;
template< [std::size_t](<#/doc/types/size_t>) N >
using make_index_sequence = std::make_integer_sequence<[std::size_t](<#/doc/types/size_t>), N>;

O programa é malformado se `N` for negativo. Se `N` for zero, o tipo indicado é `integer_sequence<T>`.

Um template de alias auxiliar `std::index_sequence_for` é definido para converter qualquer parameter pack de tipo em uma sequência de índices do mesmo comprimento:

template< class... T >
using index_sequence_for = std::make_index_sequence<sizeof...(T)>;

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_integer_sequence`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Sequências de inteiros em tempo de compilação

### Exemplo

Veja também [std::apply](<#/doc/utility/apply>) possível implementação para outro exemplo.

Execute este código
```cpp
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <tuple>
    #include <utility>
    
    namespace details {
    template <typename Array, std::size_t... I>
    constexpr auto array_to_tuple_impl(const Array& a, std::index_sequence<I...>)
    {
        return std::make_tuple(a[I]...);
    }
    
    template <class Ch, class Tr, class Tuple, std::size_t... Is>
    void print_tuple_impl(std::basic_ostream<Ch, Tr>& os,
                          const Tuple& t,
                          std::index_sequence<Is...>)
    {
        ((os << (Is ? ", " : "") << std::get<Is>(t)), ...);
    }
    }
    
    template <typename T, T... ints>
    void print_sequence(int id, std::integer_sequence<T, ints...> int_seq)
    {
        std::cout << id << ") The sequence of size " << int_seq.size() << ": ";
        ((std::cout << ints << ' '), ...);
        std::cout << '\n';
    }
    
    template <typename T, std::size_t N, typename Indx = std::make_index_sequence<N>>
    constexpr auto array_to_tuple(const std::array<T, N>& a)
    {
        return details::array_to_tuple_impl(a, Indx{});
    }
    
    template <class Ch, class Tr, class... Args>
    auto& operator<<(std::basic_ostream<Ch, Tr>& os, const std::tuple<Args...>& t)
    {
        os << '(';
        details::print_tuple_impl(os, t, std::index_sequence_for<Args...>{});
        return os << ')';
    }
    
    int main()
    {
        print_sequence(1, std::integer_sequence<unsigned, 9, 2, 5, 1, 9, 1, 6>{});
        print_sequence(2, std::make_integer_sequence<int, 12>{});
        print_sequence(3, std::make_index_sequence<10>{});
        print_sequence(4, std::index_sequence_for<std::ios, float, signed>{});
    
        constexpr std::array<int, 4> array{1, 2, 3, 4};
    
        auto tuple1 = array_to_tuple(array);
        static_assert(std::is_same_v<decltype(tuple1),
                                     std::tuple<int, int, int, int>>, "");
        std::cout << "5) tuple1: " << tuple1 << '\n';
    
        constexpr auto tuple2 = array_to_tuple<int, 4,
            std::integer_sequence<std::size_t, 1, 0, 3, 2>>(array);
        std::cout << "6) tuple2: " << tuple2 << '\n';
    }
```

Saída:
```
    1) The sequence of size 7: 9 2 5 1 9 1 6 
    2) The sequence of size 12: 0 1 2 3 4 5 6 7 8 9 10 11 
    3) The sequence of size 10: 0 1 2 3 4 5 6 7 8 9 
    4) The sequence of size 3: 0 1 2 
    5) tuple1: (1, 2, 3, 4)
    6) tuple2: (2, 1, 4, 3)
```

### Veja também

[ to_array](<#/doc/container/array/to_array>)(C++20) | cria um objeto `std::array` a partir de um array embutido
(template de função)
[ integral_constantbool_constant](<#/doc/types/integral_constant>)(C++11)(C++17) | constante em tempo de compilação de tipo especificado com valor especificado
(template de classe)