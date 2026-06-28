# std::uses_allocator_construction_args

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
`T` não é uma especialização de std::pair
template< class T, class Alloc, class... Args >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
Args&&... args ) noexcept;
`T` é uma especialização de std::pair
template< class T, class Alloc, class Tuple1, class Tuple2 >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
std::piecewise_construct_t, Tuple1&& x, Tuple2&& y ) noexcept;
template< class T, class Alloc >
constexpr auto uses_allocator_construction_args( const Alloc& alloc ) noexcept;
template< class T, class Alloc, class U, class V >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
U&& u, V&& v ) noexcept;
template< class T, class Alloc, class U, class V >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
std::pair<U, V>& pr ) noexcept;
template< class T, class Alloc, class U, class V >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
const std::pair<U, V>& pr ) noexcept;
template< class T, class Alloc, class U, class V >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
std::pair<U, V>&& pr ) noexcept;
template< class T, class Alloc, class U, class V >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
const std::pair<U, V>&& pr ) noexcept;
template< class T, class Alloc, class NonPair >
constexpr auto uses_allocator_construction_args( const Alloc& alloc,
NonPair&& non_pair ) noexcept;
```

Prepara a lista de argumentos necessária para criar um objeto do tipo `T` por meio de [construção uses-allocator](<#/doc/memory/uses_allocator>).

1) Esta sobrecarga participa da resolução de sobrecarga somente se `T` não for uma especialização de [std::pair](<#/doc/utility/pair>). Retorna [std::tuple](<#/doc/utility/tuple>) determinado da seguinte forma:

  * Se [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<T, Alloc> for `false` e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for `true`, retorna [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).
  * Caso contrário, se [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<T, Alloc> for `true` e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), const Alloc&, Args...> for `true`, retorna
[std::tuple](<#/doc/utility/tuple>)<[std::allocator_arg_t](<#/doc/memory/allocator_arg_t>), const Alloc&, Args&&...>([std::allocator_arg](<#/doc/memory/allocator_arg_t>), alloc,
[std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).
  * Caso contrário, se [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<T, Alloc> for `true` e [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args..., const Alloc&> for `true`, retorna [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., alloc).
  * Caso contrário, o programa é malformado.

2) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>). Para `T` que é [std::pair](<#/doc/utility/pair>)<T1, T2>, equivalente a
```cpp
    return std::make_tuple(std::piecewise_construct,
        std::apply(&alloc
            {
                return std::uses_allocator_construction_args<T1>(alloc,
                           std::forward<decltype(args1)>(args1)...);
            }, std::forward<Tuple1>(x)
        ),
        std::apply(&alloc
            {
                return std::uses_allocator_construction_args<T2>(alloc,
                           std::forward<decltype(args2)>(args2)...);
            }, std::forward<Tuple2>(y)
        )
    );
```

3) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>). Equivalente a
```cpp
    return std::uses_allocator_construction_args<T>(alloc,
        std::piecewise_construct, std::tuple<>{}, std::tuple<>{}
    );
```

4) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>). Equivalente a
```cpp
    return std::uses_allocator_construction_args<T>(alloc,
        std::piecewise_construct,
        std::forward_as_tuple(std::forward<U>(u)),
        std::forward_as_tuple(std::forward<V>(v))
    );
```

5,6) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>). Equivalente a
```cpp
    return std::uses_allocator_construction_args<T>(alloc,
        std::piecewise_construct,
        std::forward_as_tuple(pr.first),
        std::forward_as_tuple(pr.second)
    );
```

7,8) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>). Equivalente a
```cpp
    return std::uses_allocator_construction_args<T>(alloc,
        std::piecewise_construct,
        std::forward_as_tuple(std::get<0>(std::move(pr))),
        std::forward_as_tuple(std::get<1>(std::move(pr)))
    );
```

9) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for uma especialização de [std::pair](<#/doc/utility/pair>), e dado o template de função apenas para exposição
```cpp
    template<class A, class B>
    void /*deduce-as-pair*/(const std::pair<A, B>&);
```

, /*deduce-as-pair*/(non_pair) é malformado quando considerado como um operando não avaliado.
Seja a classe apenas para exposição `_pair-constructor_` definida como
```cpp
    class /*pair-constructor*/
    {
        const Alloc& alloc_; // apenas para exposição
        NonPair&     u_;     // apenas para exposição
    
        constexpr reconstruct(const std::remove_cv<T>& p) const // apenas para exposição
        {
            return std::make_obj_using_allocator<std::remove_cv<T>>(alloc_, p);
        }
    
        constexpr reconstruct(std::remove_cv<T>&& p) const // apenas para exposição
        {
            return std::make_obj_using_allocator<std::remove_cv<T>>(alloc_, std::move(p));
        }
    
    public:
        constexpr operator std::remove_cv<T>() const
        {
            return reconstruct(std::forward<NonPair>(u_));
        }
    };
```

Esta sobrecarga é equivalente a `return [std::make_tuple](<#/doc/utility/tuple/make_tuple>)(pair_construction);`, onde `pair_construction` é um valor do tipo `_pair-constructor_` cujos membros `_alloc__` e `_u__` são `alloc` e `non_pair` respectivamente.

### Parâmetros

- **alloc** — o alocador a ser usado
- **args** — os argumentos a serem passados para o construtor de `T`
- **x** — tupla de argumentos a serem passados para os construtores do membro de dados `first` de `T`
- **y** — tupla de argumentos a serem passados para os construtores do membro de dados `second` de `T`
- **u** — argumento único a ser passado para o construtor do membro de dados `first` de `T`
- **v** — argumento único a ser passado para o construtor do membro de dados `second` de `T`
- **pr** — um par cujo membro de dados `first` será passado para o construtor do membro de dados `first` de `T` e cujo membro de dados `second` será passado para o construtor do membro de dados `second` de `T`
- **non_pair** — argumento único a ser convertido para um [std::pair](<#/doc/utility/pair>) para construção posterior

### Valor de retorno

[std::tuple](<#/doc/utility/tuple>) de argumentos adequados para passar ao construtor de `T`.

### Notas

As sobrecargas (2-9) fornecem propagação de alocador para [std::pair](<#/doc/utility/pair>), que não suporta convenções de chamada com alocador inicial nem com alocador final (ao contrário, por exemplo, de [std::tuple](<#/doc/utility/tuple>), que usa a convenção de alocador inicial).

Quando usada na construção uses-allocator, a função de conversão de `_pair-constructor_` converte o argumento fornecido para [std::pair](<#/doc/utility/pair>) primeiro, e então constrói o resultado a partir desse [std::pair](<#/doc/utility/pair>) por meio de construção uses-allocator.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3525](<https://cplusplus.github.io/LWG/issue3525>) | C++20 | nenhuma sobrecarga podia lidar com tipos não-`pair` conversíveis para `pair` | sobrecarga de reconstrução adicionada

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(template de classe)
[ make_obj_using_allocator](<#/doc/memory/make_obj_using_allocator>)(C++20) | cria um objeto do tipo dado por meio de construção uses-allocator
(template de função)
[ uninitialized_construct_using_allocator](<#/doc/memory/uninitialized_construct_using_allocator>)(C++20) | cria um objeto do tipo dado em um local de memória especificado por meio de construção uses-allocator
(template de função)