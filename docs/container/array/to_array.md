# std::to_array

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< class T, std::size_t N >
constexpr std::array<std::remove_cv_t<T>, N> to_array( T (&a)[N] );
template< class T, std::size_t N >
constexpr std::array<std::remove_cv_t<T>, N> to_array( T (&&a)[N] );
```

Cria um [std::array](<#/doc/container/array>) a partir do array embutido unidimensional `a`. Cópia ou movimentação de arrays embutidos multidimensionais não é suportada.

1) Para cada `i` em `0, ..., N - 1`, inicializa por cópia o elemento correspondente do resultado com `a[i]`. Esta sobrecarga é malformada quando [std::is_constructible_v](<#/doc/types/is_constructible>)<T, T&> é falso.

2) Para cada `i` em `0, ..., N - 1`, inicializa por movimentação o elemento correspondente do resultado com `std::move(a[i])`. Esta sobrecarga é malformada quando [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; é falso.

Ambas as sobrecargas são malformadas quando [std::is_array_v](<#/doc/types/is_array>)&lt;T&gt; é verdadeiro.

### Parâmetros

- **a** — o array embutido a ser convertido para [std::array](<#/doc/container/array>)
Requisitos de tipo
-`T` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) para usar a sobrecarga (1).
-`T` deve satisfazer os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) para usar a sobrecarga (2).

### Valor de retorno

1) [std::array](<#/doc/container/array>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;, N>{ a[0], ..., a[N - 1] }

2) [std::array](<#/doc/container/array>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;, N>{ std::move(a[0]), ..., std::move(a[N - 1]) }

### Observações

Existem algumas ocasiões em que a [dedução de argumentos de template de classe](<#/doc/language/ctad>) de [std::array](<#/doc/container/array>) não pode ser usada enquanto `to_array` está disponível:

*   `to_array` pode ser usado quando o tipo do elemento do `std::array` é especificado manualmente e o comprimento é deduzido, o que é preferível quando se deseja uma conversão implícita.
*   `to_array` pode copiar um literal de string, enquanto a dedução de argumentos de template de classe constrói um `std::array` de um único ponteiro para seu primeiro caractere.

```cpp
    std::to_array<long>({3, 4}); // OK: implicit conversion
    // std::array<long>{3, 4};   // error: too few template arguments
    std::to_array("foo");        // creates std::array<char, 4>{'f', 'o', 'o', '\0'}
    std::array{"foo"};           // creates std::array<const char*, 1>{"foo"}
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_to_array`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::to_array`

### Possível implementação

[to_array (1)](<#/doc/container/array/to_array>)
---
```cpp
    namespace detail
    {
        template<class T, std::size_t N, std::size_t... I>
        constexpr std::array<std::remove_cv_t<T>, N>
            to_array_impl(T (&a)[N], std::index_sequence<I...>)
        {
            return {{a[I]...}};
        }
    }
    
    template<class T, std::size_t N>
    constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&a)[N])
    {
        return detail::to_array_impl(a, std::make_index_sequence<N>{});
    }
```

[to_array (2)](<#/doc/container/array/to_array>)
```cpp
    namespace detail
    {
        template<class T, std::size_t N, std::size_t... I>
        constexpr std::array<std::remove_cv_t<T>, N>
            to_array_impl(T (&&a)[N], std::index_sequence<I...>)
        {
            return {{std::move(a[I])...}};
        }
    }
    
    template<class T, std::size_t N>
    constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&&a)[N])
    {
        return detail::to_array_impl(std::move(a), std::make_index_sequence<N>{});
    }
```

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <memory>
    #include <string_view>
    #include <type_traits>
    #include <utility>
    
    // cria um array constexpr de string_view's    
    constexpr auto w1n = std::to_array<std::string_view>({
        "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer"
    });
    static_assert(std::is_same_v<decltype(w1n), const std::array<std::string_view, 6>>);
    static_assert(w1n.size() == 6 and w1n[5] == "Jennifer");
    
    int main()
    {
        // copia um literal de string
        auto a1 = std::to_array("foo");
        static_assert(a1.size() == 4);
    
        // deduz tanto o tipo do elemento quanto o comprimento
        auto a2 = std::to_array({0, 2, 1, 3});
        static_assert(std::is_same_v<decltype(a2), std::array<int, 4>>);
    
        // deduz o comprimento com o tipo do elemento especificado
        // ocorre conversão implícita
        auto a3 = std::to_array<long>({0, 1, 3});
        static_assert(std::is_same_v<decltype(a3), std::array<long, 3>>);
    
        auto a4 = std::to_array<std::pair<int, float>>(
            {{3, 0.0f}, {4, 0.1f}, {4, 0.1e23f}});
        static_assert(a4.size() == 3);
    
        // cria um std::array não copiável
        auto a5 = std::to_array({std::make_unique<int>(3)});
        static_assert(a5.size() == 1);
    
        // erro: cópia de arrays multidimensionais não é suportada
        // char s[2][6] = {"nice", "thing"};
        // auto a6 = std::to_array(s);
    }
```

### Veja também

[ make_array](<#/doc/experimental/make_array>)(library fundamentals TS v2) | cria um objeto [std::array](<#/doc/container/array>) cujo tamanho e, opcionalmente, tipo de elemento são deduzidos dos argumentos
(modelo de função)