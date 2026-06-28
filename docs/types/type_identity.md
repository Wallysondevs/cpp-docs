# std::type_identity

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct type_identity;
```

Fornece o typedef membro `type` que nomeia `T` (ou seja, a transformação de identidade).

Se o programa adicionar especializações para `std::type_identity`, o comportamento é indefinido.

### Tipos de membros

Nome | Definição
---|---
`type` | `T`

### Tipos auxiliares

```cpp
template< class T >
using type_identity_t = type_identity<T>::type;  // (desde C++20)
```

### Implementação possível
```cpp
    template<class T>
    struct type_identity { using type = T; };
```

---

### Notas

`std::type_identity` pode ser usado para estabelecer [contextos não deduzidos](<#/doc/language/template_argument_deduction>) na dedução de argumentos de template.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_type_identity`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | `std::type_identity`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    template<class T>
    T foo(T a, T b) { return a + b; }
    
    template<class T>
    T bar(T a, std::type_identity_t<T> b) { return a + b; }
    
    int main()
    {
        // foo(4.2, 1); // error, deduced conflicting types for 'T'
        std::cout << bar(4.2, 1) << '\n';  // OK, calls bar<double>
    }
```

Saída:
```
    5.2
```

### Veja também

[ identity](<#/doc/utility/functional/identity>)(C++20) | objeto de função que retorna seu argumento inalterado
---|---
(classe) |
---