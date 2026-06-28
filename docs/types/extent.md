Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, unsigned N = 0 >
struct extent;
```

Se `T` é um tipo array, fornece a constante membro `value` igual ao número de elementos ao longo da `N`-ésima dimensão do array, se `N` estiver em `[`​0​`, `[std::rank](<#/doc/types/rank>)&lt;T&gt;::value`)`. Para qualquer outro tipo, ou se `T` é um array de limite desconhecido ao longo de sua primeira dimensão e `N` é ​0​, `value` é ​0​.

Se o programa adicionar especializações para `std::extent` ou `std::extent_v`(desde C++17), o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class T, unsigned N = 0 >
constexpr std::size_t extent_v = extent<T, N>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | o número de elementos ao longo da `N`-ésima dimensão de `T`
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna o valor
(função membro pública)
operator()(C++14) | retorna o valor
(função membro pública)

### Tipos membro

Type | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Possível implementação
```cpp
    template<class T, unsigned N = 0>
    struct extent : std::integral_constant<std::size_t, 0> {};
    
    template<class T>
    struct extent<T[], 0> : std::integral_constant<std::size_t, 0> {};
    
    template<class T, unsigned N>
    struct extent<T[], N> : std::extent<T, N - 1> {};
    
    template<class T, std::size_t I>
    struct extent<T[I], 0> : std::integral_constant<std::size_t, I> {};
    
    template<class T, std::size_t I, unsigned N>
    struct extent<T[I], N> : std::extent<T, N - 1> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(
        std::extent_v<int[3]> == 3 && // a dimensão padrão é 0
        std::extent_v<int[3], 0> == 3 && // o mesmo que acima
        std::extent_v<int[3][4], 0> == 3 &&
        std::extent_v<int[3][4], 1> == 4 &&
        std::extent_v<int[3][4], 2> == 0 &&
        std::extent_v<int[]> == 0
    );
    
    int main()
    {
        const auto ext = std::extent<int['*']>{};
        static_assert(ext == 42); // com conversão implícita para std::size_t
    
        const int ints[]{1, 2, 3, 4};
        static_assert(std::extent_v<decltype(ints)> == 4); // tamanho do array
    
        [[maybe_unused]] int ary[][3] = {{1, 2, 3}};
    
        // ary[0] é do tipo referência para 'int[3]', então, a extensão
        // não pode ser calculada corretamente e retorna 0
        static_assert(std::is_same_v<decltype(ary[0]), int(&)[3]>);
        static_assert(std::extent_v<decltype(ary[0])> == 0);
    
        // remover a referência fornece o valor de extensão correto 3
        static_assert(std::extent_v<std::remove_cvref_t<decltype(ary[0])>> == 3);
    }
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(template de classe)
[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo array
(template de classe)
[ remove_extent](<#/doc/types/remove_extent>)(C++11) | remove uma extensão do tipo array fornecido
(template de classe)
[ remove_all_extents](<#/doc/types/remove_all_extents>)(C++11) | remove todas as extensões do tipo array fornecido
(template de classe)
[ extents](<#/doc/container/mdspan/extents>)(C++23) | um descritor de um espaço de índice multidimensional de alguma rank
(template de classe)