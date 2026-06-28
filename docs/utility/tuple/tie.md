# std::tie

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... Types >
std::tuple<Types&...> tie( Types&... args ) noexcept;
(constexpr desde C++14)
```

Cria uma tupla de referências lvalue para seus argumentos ou instâncias de [std::ignore](<#/doc/utility/tuple/ignore>).

### Parâmetros

- **args** — zero ou mais argumentos lvalue para construir a tupla.

### Valor de retorno

Um objeto `[std::tuple](<#/doc/utility/tuple>)` contendo referências lvalue.

### Possível implementação
```cpp
    template <typename... Args>
    constexpr // since C++14
    std::tuple<Args&...> tie(Args&... args) noexcept
    {
        return {args...};
    }
```

---

### Notas

`std::tie` pode ser usado para desempacotar um `[std::pair](<#/doc/utility/pair>)` porque `[std::tuple](<#/doc/utility/tuple>)` possui uma atribuição de conversão a partir de pares:
```cpp
    bool result;
    std::tie(std::ignore, result) = set.insert(value);
```

### Exemplo

1) `std::tie` pode ser usado para introduzir comparação lexicográfica a uma struct ou para desempacotar uma tupla;
2) `std::tie` pode funcionar com [structured bindings](<#/doc/language/structured_binding>):

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <set>
    #include <string>
    #include <tuple>
     
    struct S
    {
        int n;
        std::string s;
        float d;
     
        friend bool operator<(const S& lhs, const S& rhs) noexcept
        {
            // compares lhs.n to rhs.n,
            // then lhs.s to rhs.s,
            // then lhs.d to rhs.d
            // in that order, first non-equal result is returned
            // or false if all elements are equal
            return std::tie(lhs.n, lhs.s, lhs.d) < std::tie(rhs.n, rhs.s, rhs.d);
        }
    };
     
    int main()
    {
        // Lexicographical comparison demo:
        std::set<S> set_of_s;
     
        S value{42, "Test", 3.14};
        std::set<S>::iterator iter;
        bool is_inserted;
     
        // Unpack a pair:
        std::tie(iter, is_inserted) = set_of_s.insert(value);
        assert(is_inserted);
     
     
        // std::tie and structured bindings:
        auto position =  { return std::tuple(1 * w, 2 * w); };
     
        auto [x, y] = position(1);
        assert(x == 1 && y == 2);
        std::tie(x, y) = position(2); // reuse x, y with tie
        assert(x == 2 && y == 4);
     
     
        // Implicit conversions are permitted:
        std::tuple<char, short> coordinates(6, 9);
        std::tie(x, y) = coordinates;
        assert(x == 6 && y == 9);
     
        // Skip an element:
        std::string z;
        std::tie(x, std::ignore, z) = std::tuple(1, 2.0, "Test");
        assert(x == 1 && z == "Test");
    }
```

### Ver também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(function template)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de forwarding references
(function template)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuplas
(function template)
[ ignore](<#/doc/utility/tuple/ignore>)(C++11) | marcador para pular um elemento ao desempacotar uma `tuple` usando `tie`
(constant)