# std::tuple_element&lt;std::tuple&gt;

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< std::size_t I, class... Types >
struct tuple_element< I, std::tuple<Types...> >;
```

Fornece acesso indexado em tempo de compilação aos tipos dos elementos da tupla.

### Tipos de membros

Tipo | Definição
---|---
type | o tipo do I-ésimo elemento da tupla, onde `I` está em `[`​0​`, `sizeof...(Types)`)`

### Possível implementação
```cpp
    template<std::size_t I, class T>
    struct tuple_element;
    
    #ifndef __cpp_pack_indexing
    // caso recursivo
    template<std::size_t I, class Head, class... Tail>
    struct tuple_element<I, std::tuple<Head, Tail...>>
        : std::tuple_element<I - 1, std::tuple<Tail...>>
    { };
    
    // caso base
    template<class Head, class... Tail>
    struct tuple_element<0, std::tuple<Head, Tail...>>
    {
        using type = Head;
    };
    
    #else
    // Implementação C++26 usando indexação de pack
    template<std::size_t I, class... Ts>
    struct tuple_element<I, std::tuple<Ts...>>
    {
        using type = Ts...[I];
    };
    #endif
```

---

### Exemplo

Execute este código
```cpp
    #include <boost/type_index.hpp>
    #include <cstddef>
    #include <iostream>
    #include <string>
    #include <tuple>
    #include <utility>
    
    template<typename TupleLike, std::size_t I = 0>
    void printTypes()
    {
        if constexpr (I == 0)
            std::cout << boost::typeindex::type_id_with_cvr<TupleLike>() << '\n';
    
        if constexpr (I < std::tuple_size_v<TupleLike>)
        {
            using SelectedType = std::tuple_element_t<I, TupleLike>;
    
            std::cout << "  The type at index " << I << " is: "
                      << boost::typeindex::type_id_with_cvr<SelectedType>() << '\n';
            printTypes<TupleLike, I + 1>();
        }
    }
    
    struct MyStruct {};
    
    using MyTuple = std::tuple<int, long&, const char&, bool&&,
                               std::string, volatile MyStruct>;
    
    using MyPair = std::pair<char, bool&&>;
    
    static_assert(std::is_same_v<std::tuple_element_t<0, MyPair>, char>);
    static_assert(std::is_same_v<std::tuple_element_t<1, MyPair>, bool&&>);
    
    int main()
    {
        printTypes<MyTuple>();
        printTypes<MyPair>();
    }
```

Saída possível:
```
    std::tuple<int, long&, char const&, bool&&, std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, MyStruct volatile>
      The type at index 0 is: int
      The type at index 1 is: long&
      The type at index 2 is: char const&
      The type at index 3 is: bool&&
      The type at index 4 is: std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >
      The type at index 5 is: MyStruct volatile
    std::pair<char, bool&&>
      The type at index 0 is: char
      The type at index 1 is: bool&&
```

### Ver também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos de elemento de um tipo semelhante a tupla
(modelo de classe)