# std::tuple_element&lt;std::pair&gt;

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< std::size_t I, class T1, class T2 >
struct tuple_element<I, std::pair<T1, T2>>;
```

As especializações parciais de `std::tuple_element` para `pair`s fornecem acesso em tempo de compilação aos tipos dos elementos do `pair`, usando sintaxe similar a de `tuple`. O programa é malformado se `I >= 2`.

### Tipos membro

Tipo membro | Definição
---|---
`type` | `T1` se `I == 0`
`T2` se `I == 1`

### Possível implementação
```cpp
    template<std::size_t I, typename T>
    struct tuple_element;
    
    template<std::size_t I, typename T1, typename T2>
    struct tuple_element<I, std::pair<T1, T2>>
    {
        static_assert(I < 2, "std::pair has only 2 elements!");
    };
    
    template<typename T1, typename T2>
    struct tuple_element<0, std::pair<T1, T2>>
    {
        using type = T1;
    };
    
    template<typename T1, typename T2>
    struct tuple_element<1, std::pair<T1, T2>>
    {
        using type = T2;
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <tuple>
    
    namespace detail
    {
        template<std::size_t>
        struct index_tag { constexpr explicit index_tag() = default; };
    
        template<class T, class U>
        constexpr T get_val_dispatch(std::pair<T, U> const& pair, index_tag<0>)
        {
            return pair.first;
        }
    
        template<class T, class U>
        constexpr U get_val_dispatch(std::pair<T, U> const& pair, index_tag<1>)
        {
            return pair.second;
        }
    } // namespace detail
    
    template<std::size_t N, class T, class U>
    auto constexpr get_val(std::pair<T, U> const& pair)
        -> typename std::tuple_element<N, std::pair<T, U>>::type
    {
        return detail::get_val_dispatch(pair, detail::index_tag<N>{});
    }
    
    int main()
    {
        auto var = std::make_pair(1, std::string{"one"});
    
        std::cout << get_val<0>(var) << " = " << get_val<1>(var);
    }
```

Saída:
```
    1 = one
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2974](<https://cplusplus.github.io/LWG/issue2974>) | C++11 | índice fora dos limites referia-se ao template primário indefinido | tornou-se malformado (erro grave)

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tuple do inicializador
---|---
[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de template de classe)
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(C++11) | obtém o tipo dos elementos de `array`
(especialização de template de classe)
[ std::tuple_element<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_element>)(C++20) | obtém o tipo do iterator ou do sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de template de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(C++11) | obtém o tamanho de um `pair`
(especialização de template de classe)