# NULL

Definido no header `[<clocale>](<#/doc/header/clocale>)`

```cpp
Definido no header `<cstddef>`
Definido no header `<cstdio>`
Definido no header `<cstdlib>`
Definido no header `<cstring>`
Definido no header `<ctime>`
Definido no header `<cwchar>`
#define NULL /* implementation-defined */
```

A macro `NULL` é uma [constante de ponteiro nulo](<#/doc/language/pointer>) definida pela implementação.

### Possível implementação
```cpp
    #define NULL 0
    // desde C++11
    #define NULL nullptr
```

---

### Notas

Em C, a macro `NULL` pode ter o tipo void*, mas isso não é permitido em C++ porque constantes de ponteiro nulo não podem ter esse tipo.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <type_traits>
    #include <typeinfo>
    
    class S;
    
    int main()
    {
        int* p = NULL;
        int* p2 = static_cast<std::nullptr_t>(NULL);
        void(*f)(int) = NULL;
        int S::*mp = NULL;
        void(S::*mfp)(int) = NULL;
        auto nullvar = NULL; // pode disparar um aviso ao compilar com gcc/clang
    
        std::cout << "The type of nullvar is " << typeid(nullvar).name() << '\n';
    
        if constexpr(std::is_same_v<decltype(NULL), std::nullptr_t>)
            std::cout << "NULL implemented with type std::nullptr_t\n";
        else
            std::cout << "NULL implemented using an integral type\n";
    
        {}(p, p2, f, mp, mfp); // < suprime avisos de "variável não utilizada"
    }
```

Saída possível:
```
    The type of nullvar is long
    NULL implemented using an integral type
```

### Veja também

[`nullptr`](<#/doc/language/nullptr>) (C++11) | o literal de ponteiro que especifica um valor de ponteiro nulo
---|---
[`nullptr_t`](<#/doc/types/nullptr_t>) (C++11) | o tipo do literal de ponteiro nulo [`nullptr`](<#/doc/language/nullptr>)
(typedef)
[Documentação C](<#/>) para NULL