# std::tuple_element&lt;std::array&gt;

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< std::size_t I, class T, std::size_t N >
struct tuple_element< I, std::array<T, N> >;
```

Fornece acesso indexado em tempo de compilação ao tipo dos elementos do array usando uma interface tipo-tupla.

### Tipos Membro

Tipo Membro | Definição
---|---
type | o tipo dos elementos do array

### Possível implementação
```cpp
    template<std::size_t I, class T>
    struct tuple_element;
    
    template<std::size_t I, class T, std::size_t N>
    struct tuple_element<I, std::array<T,N>>
    {
        using type = T;
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <tuple>
    #include <type_traits>
    
    int main()
    {
        // define o array e obtém o tipo do elemento na posição 0
        std::array<int, 10> data{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        using T = std::tuple_element<0, decltype(data)>::type; // int
        static_assert(std::is_same_v<T, int>);
    
        const auto const_data = data;
        using CT = std::tuple_element<0, decltype(const_data)>::type; // const int
    
        // o resultado de tuple_element depende da qualificação cv do tipo tipo-tupla
        static_assert(!std::is_same_v<T, CT>);
        static_assert(std::is_same_v<CT, const int>);
    }
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de template de classe)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(C++11) | obtém o tipo dos elementos de `pair`
(especialização de template de classe)