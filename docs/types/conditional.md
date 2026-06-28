# std::conditional

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< bool B, class T, class F >
struct conditional;
```

Fornece o typedef membro `type`, que é definido como `T` se `B` for verdadeiro em tempo de compilação, ou como `F` se `B` for falso.

Se o programa adicionar especializações para `std::conditional`, o comportamento é indefinido.

### Tipos membro

Tipo membro | Definição
---|---
`type` | `T` se B == true, `F` se B == false

### Tipos auxiliares

```cpp
template< bool B, class T, class F >
using conditional_t = typename conditional<B,T,F>::type;  // (desde C++14)
```

### Implementação possível
```cpp
    template<bool B, class T, class F>
    struct conditional { using type = T; };
    
    template<class T, class F>
    struct conditional<false, T, F> { using type = F; };
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    #include <typeinfo>
    
    int main() 
    {
        using Type1 = std::conditional<true, int, double>::type;
        using Type2 = std::conditional<false, int, double>::type;
        using Type3 = std::conditional<sizeof(int) >= sizeof(double), int, double>::type;
    
        std::cout << typeid(Type1).name() << '\n';
        std::cout << typeid(Type2).name() << '\n';
        std::cout << typeid(Type3).name() << '\n';
    }
```

Saída possível:
```
    int
    double
    double
```

### Veja também

[ enable_if](<#/doc/types/enable_if>)(C++11) | remove condicionalmente uma sobrecarga de função ou especialização de template da resolução de sobrecarga
(template de classe)