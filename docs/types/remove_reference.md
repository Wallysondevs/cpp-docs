# std::remove_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct remove_reference;
```

Se o tipo `T` for um tipo de referência, fornece o typedef de membro `type` que é o tipo referenciado por `T`. Caso contrário, `type` é `T`.

Se o programa adicionar especializações para `std::remove_reference`, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo referenciado por `T` ou `T` se não for uma referência

### Tipos auxiliares

```cpp
template< class T >
using remove_reference_t = typename remove_reference<T>::type;  // (desde C++14)
```

### Implementação possível
```cpp
    template<class T> struct remove_reference { typedef T type; };
    template<class T> struct remove_reference<T&> { typedef T type; };
    template<class T> struct remove_reference<T&&> { typedef T type; };
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::cout << "std::remove_reference<int>::type is int? "
                  << std::is_same<int, std::remove_reference<int>::type>::value << '\n';
        std::cout << "std::remove_reference<int&>::type is int? "
                  << std::is_same<int, std::remove_reference<int&>::type>::value << '\n';
        std::cout << "std::remove_reference<int&&>::type is int? "
                  << std::is_same<int, std::remove_reference<int&&>::type>::value << '\n';
        std::cout << "std::remove_reference<const int&>::type is const int? "
                  << std::is_same<const int,
                                  std::remove_reference<const int&>::type>::value << '\n';
    }
```

Saída:
```
    std::remove_reference<int>::type is int? true
    std::remove_reference<int&>::type is int? true
    std::remove_reference<int&&>::type is int? true
    std::remove_reference<const int&>::type is const int? true
```

### Veja também

[ is_reference](<#/doc/types/is_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_ ou _referência rvalue_
(modelo de classe)
[ add_lvalue_referenceadd_rvalue_reference](<#/doc/types/add_reference>)(C++11)(C++11) | adiciona uma referência _lvalue_ ou _rvalue_ ao tipo fornecido
(modelo de classe)
[ remove_cvref](<#/doc/types/remove_cvref>)(C++20) | combina [std::remove_cv](<#/doc/types/remove_cv>) e **std::remove_reference**
(modelo de classe)