# Cabeçalho da biblioteca padrão &lt;utility&gt;

Este cabeçalho faz parte da biblioteca de [utilidades gerais](<#/doc/utility>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(desde C++20) | Suporte para o [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(desde C++11) | Modelo de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Namespaces

`[rel_ops](<#/doc/utility/rel_ops/operator_cmp>)` | Fornece operadores de comparação automáticos
Definido no namespace `std::rel_ops`

```cpp
 operator!=operator>operator<=operator>=(obsoleto desde C++20)
(modelo de função)
```

### Funções

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ exchange](<#/doc/utility/exchange>)(desde C++14) | substitui o argumento por um novo valor e retorna seu valor anterior
(modelo de função)
[ forward](<#/doc/utility/forward>)(desde C++11) | encaminha um argumento de função e usa o argumento de modelo de tipo para preservar sua categoria de valor
(modelo de função)
[ forward_like](<#/doc/utility/forward_like>)(desde C++23) | encaminha um argumento de função como se o convertesse para a categoria de valor e constness da expressão do argumento de modelo de tipo especificado
(modelo de função)
[ move](<#/doc/utility/move>)(desde C++11) | converte o argumento para um xvalue
(modelo de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(desde C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceção
(modelo de função)
[ as_const](<#/doc/utility/as_const>)(desde C++17) | obtém uma referência a const para seu argumento
(modelo de função)
[ declval](<#/doc/utility/declval>)(desde C++11) | obtém uma referência a um objeto do argumento de modelo de tipo para uso em um contexto não avaliado
(modelo de função)
[ to_underlying](<#/doc/utility/to_underlying>)(desde C++23) | converte uma enumeração para seu tipo subjacente
(modelo de função)
[ cmp_equalcmp_not_equalcmp_lesscmp_greatercmp_less_equalcmp_greater_equal](<#/doc/utility/intcmp>)(desde C++20) | compara dois valores inteiros, garantindo que números negativos com sinal sejam menores que números sem sinal
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(desde C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)
[ unreachable](<#/doc/utility/unreachable>)(desde C++23) | marca um ponto de execução inalcançável
(função)
[ make_pair](<#/doc/utility/pair/make_pair>) | cria um objeto `pair` de um tipo, determinado pelos tipos dos argumentos
(modelo de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/pair/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(desde C++20) | compara lexicograficamente os valores no `pair`
(modelo de função)
[ std::swap(std::pair)](<#/doc/utility/pair/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(desde C++11) | acessa um elemento de um `pair`
(modelo de função)

### Classes

[ pair](<#/doc/utility/pair>) | implementa uma tupla binária, ou seja, um par de valores
(modelo de classe)
[ tuple_size](<#/doc/utility/tuple_size>)(desde C++11) | obtém o número de elementos de um tipo similar a tupla
(modelo de classe)
[ tuple_element](<#/doc/utility/tuple_element>)(desde C++11) | obtém os tipos dos elementos de um tipo similar a tupla
(modelo de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(desde C++11) | obtém o tamanho de um `pair`
(especialização de modelo de classe)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(desde C++11) | obtém o tipo dos elementos de um `pair`
(especialização de modelo de classe)
[ integer_sequence](<#/doc/utility/integer_sequence>)(desde C++14) | implementa uma sequência de inteiros em tempo de compilação
(modelo de classe)

##### Declarações antecipadas

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```cpp
 tuple(desde C++11)
(modelo de classe)
Definido no cabeçalho `<variant>`
 monostate(desde C++17)
(classe)
```

### Constantes

[ ignore](<#/doc/utility/tuple/ignore>)(desde C++11) | placeholder para pular um elemento ao desempacotar uma `tuple` usando [`tie`](<#/doc/utility/tuple/tie>)
(constante)

### Tags

[ piecewise_constructpiecewise_construct_t](<#/doc/utility/piecewise_construct_t>)(desde C++11) | tag de construção piecewise
(tag)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(desde C++17) | tag de construção in-place
(tag)
[ nontype  nontype_t](<#/doc/utility/nontype>)(desde C++26) | tag de construção de valor
(tag)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // swap
      template<class T>
        constexpr void swap(T& a, T& b) noexcept(/* see description */);
      template<class T, size_t N>
        constexpr void swap(T (&a)[N], T (&b)[N]) noexcept(is_nothrow_swappable_v<T>);
    
      // exchange
      template<class T, class U = T>
        constexpr T exchange(T& obj, U&& new_val);
    
      // forward/move
      template<class T>
        constexpr T&& forward(remove_reference_t<T>& t) noexcept;
      template<class T>
        constexpr T&& forward(remove_reference_t<T>&& t) noexcept;
      template<class T, class U>
        constexpr /* see description */ forward_like(U&& x) noexcept;
      template<class T>
        constexpr remove_reference_t<T>&& move(T&&) noexcept;
      template<class T>
        constexpr conditional_t<
            !is_nothrow_move_constructible_v<T> && is_copy_constructible_v<T>, const T&, T&&>
          move_if_noexcept(T& x) noexcept;
    
      // as_const
      template<class T>
        constexpr add_const_t<T>& as_const(T& t) noexcept;
      template<class T>
        void as_const(const T&&) = delete;
    
      // declval
      template<class T>
        add_rvalue_reference_t<T> declval() noexcept;   // as unevaluated operand
    
      // integer comparison functions
      template<class T, class U>
        constexpr bool cmp_equal(T t, U u) noexcept;
      template<class T, class U>
        constexpr bool cmp_not_equal(T t, U u) noexcept;
    
      template<class T, class U>
        constexpr bool cmp_less(T t, U u) noexcept;
      template<class T, class U>
        constexpr bool cmp_greater(T t, U u) noexcept;
      template<class T, class U>
        constexpr bool cmp_less_equal(T t, U u) noexcept;
      template<class T, class U>
        constexpr bool cmp_greater_equal(T t, U u) noexcept;
    
      template<class R, class T>
        constexpr bool in_range(T t) noexcept;
    
      // to_underlying
      template<class T>
        constexpr underlying_type_t<T> to_underlying(T value) noexcept;
    
      // unreachable
      [[noreturn]] void unreachable();
    
      // compile-time integer sequences
      template<class T, T...>
        struct integer_sequence;
      template<size_t... I>
        using index_sequence = integer_sequence<size_t, I...>;
    
      template<class T, T N>
        using make_integer_sequence = integer_sequence<T, /* see description */>;
      template<size_t N>
        using make_index_sequence = make_integer_sequence<size_t, N>;
    
      template<class... T>
        using index_sequence_for = make_index_sequence<sizeof...(T)>;
    
      // class template pair
      template<class T1, class T2>
        struct pair;
    
      // pair specialized algorithms
      template<class T1, class T2>
        constexpr bool operator==(const pair<T1, T2>&, const pair<T1, T2>&);
      template<class T1, class T2>
        constexpr common_comparison_category_t</*synth-three-way-result*/<T1>,
                                               /*synth-three-way-result*/<T2>>
          operator<=>(const pair<T1, T2>&, const pair<T1, T2>&);
    
      template<class T1, class T2>
        constexpr void swap(pair<T1, T2>& x, pair<T1, T2>& y) noexcept(noexcept(x.swap(y)));
    
      template<class T1, class T2>
        constexpr /* see description */ make_pair(T1&&, T2&&);
    
      // tuple-like access to pair
      template<class T> struct tuple_size;
      template<size_t I, class T> struct tuple_element;
    
      template<class T1, class T2> struct tuple_size<pair<T1, T2>>;
      template<size_t I, class T1, class T2> struct tuple_element<I, pair<T1, T2>>;
    
      template<size_t I, class T1, class T2>
        constexpr tuple_element_t<I, pair<T1, T2>>& get(pair<T1, T2>&) noexcept;
      template<size_t I, class T1, class T2>
        constexpr tuple_element_t<I, pair<T1, T2>>&& get(pair<T1, T2>&&) noexcept;
      template<size_t I, class T1, class T2>
        constexpr const tuple_element_t<I, pair<T1, T2>>& get(const pair<T1, T2>&) noexcept;
      template<size_t I, class T1, class T2>
        constexpr const tuple_element_t<I, pair<T1, T2>>&& get(const pair<T1, T2>&&) noexcept;
      template<class T1, class T2>
        constexpr T1& get(pair<T1, T2>& p) noexcept;
      template<class T1, class T2>
        constexpr const T1& get(const pair<T1, T2>& p) noexcept;
      template<class T1, class T2>
        constexpr T1&& get(pair<T1, T2>&& p) noexcept;
      template<class T1, class T2>
        constexpr const T1&& get(const pair<T1, T2>&& p) noexcept;
      template<class T2, class T1>
        constexpr T2& get(pair<T1, T2>& p) noexcept;
      template<class T2, class T1>
        constexpr const T2& get(const pair<T1, T2>& p) noexcept;
      template<class T2, class T1>
        constexpr T2&& get(pair<T1, T2>&& p) noexcept;
      template<class T2, class T1>
        constexpr const T2&& get(const pair<T1, T2>&& p) noexcept;
    
      // pair piecewise construction
      struct piecewise_construct_t {
        explicit piecewise_construct_t() = default;
      };
      inline constexpr piecewise_construct_t piecewise_construct{};
      template<class... Types> class tuple;         // defined in <tuple>
    
      // in-place construction
      struct in_place_t {
        explicit in_place_t() = default;
      };
      inline constexpr in_place_t in_place{};
    
      template<class T>
        struct in_place_type_t {
          explicit in_place_type_t() = default;
        };
      template<class T> inline constexpr in_place_type_t<T> in_place_type{};
    
      template<size_t I>
        struct in_place_index_t {
          explicit in_place_index_t() = default;
        };
      template<size_t I> inline constexpr in_place_index_t<I> in_place_index{};
    
      // nontype argument tag
      template<auto V>
        struct nontype_t {
          explicit nontype_t() = default;
        };
      template<auto V> inline constexpr nontype_t<V> nontype{};
    }
    
    // obsoleto
    namespace std::rel_ops {
      template<class T> bool operator!=(const T&, const T&);
      template<class T> bool operator> (const T&, const T&);
      template<class T> bool operator<=(const T&, const T&);
      template<class T> bool operator>=(const T&, const T&);
    }
```

#### Modelo de classe [std::integer_sequence](<#/doc/utility/integer_sequence>)
```cpp
    namespace std {
      template<class T, T... I> struct integer_sequence {
        using value_type = T;
        static constexpr size_t size() noexcept { return sizeof...(I); }
      };
    }
```

#### Modelo de classe [std::pair](<#/doc/utility/pair>)
```cpp
    namespace std {
      template<class T1, class T2>
      struct pair {
        using first_type  = T1;
        using second_type = T2;
    
        T1 first;
        T2 second;
    
        pair(const pair&) = default;
        pair(pair&&) = default;
        constexpr explicit(/* see description */) pair();
        constexpr explicit(/* see description */) pair(const T1& x, const T2& y);
        template<class U1 = T1, class U2 = T2>
          constexpr explicit(/* see description */) pair(U1&& x, U2&& y);
        template<class U1, class U2>
          constexpr explicit(/* see description */) pair(const pair<U1, U2>& p);
        template<class U1, class U2>
          constexpr explicit(/* see description */) pair(pair<U1, U2>&& p);
        template<class... Args1, class... Args2>
          constexpr pair(piecewise_construct_t,
                         tuple<Args1...> first_args, tuple<Args2...> second_args);
    
        constexpr pair& operator=(const pair& p);
        template<class U1, class U2>
          constexpr pair& operator=(const pair<U1, U2>& p);
        constexpr pair& operator=(pair&& p) noexcept(/* see description */);
        template<class U1, class U2>
          constexpr pair& operator=(pair<U1, U2>&& p);
    
        constexpr void swap(pair& p) noexcept(/* see description */);
      };
    
      template<class T1, class T2>
        pair(T1, T2) -> pair<T1, T2>;
    }
```

### Ver também

[ &lt;tuple&gt;](<#/doc/header/tuple>)(desde C++11) | Modelo de classe [std::tuple](<#/doc/utility/tuple>)