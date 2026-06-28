# std::nullptr_t

Definido no cabeçalho `[<cstddef>](<#/doc/header/cstddef>)`

```c
using nullptr_t = decltype(nullptr);
```

`std::nullptr_t` é o tipo do literal de ponteiro nulo `nullptr`. É um tipo distinto que não é, por si só, um tipo de ponteiro ou um tipo de ponteiro para membro. Prvalues deste tipo são [constantes de ponteiro nulo](<#/doc/language/pointer>), e podem ser [implicitamente convertidos](<#/doc/language/implicit_cast>) para qualquer tipo de ponteiro e ponteiro para membro.

`sizeof(std::nullptr_t)` é igual a `sizeof(void *)`.

### Notas

O padrão C++ exige que [`<stddef.h>`](<#/>) coloque o conteúdo de [`<cstddef>`](<#/doc/header/cstddef>) no namespace global, e, portanto, exige que `nullptr_t` esteja disponível no namespace global quando [`<stddef.h>`](<#/>) é incluído.

`nullptr_t` não faz parte do C até C23.

Não é especificado se a declaração de `std::nullptr_t` está disponível em qualquer outro cabeçalho da standard library. Uma implementação pode evitar introduzir este nome mesmo quando o padrão exige que `std::nullptr_t` seja usado, por exemplo, escrevendo `decltype(nullptr)` em vez disso.

### Exemplo

Se duas ou mais sobrecargas aceitam diferentes tipos de ponteiro, uma sobrecarga para `std::nullptr_t` é necessária para aceitar um argumento de ponteiro nulo.

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    
    void f(int*)
    {
        std::cout << "Pointer to integer overload\n";
    }
    
    void f(double*)
    {
        std::cout << "Pointer to double overload\n";
    }
    
    void f(std::nullptr_t)
    {
        std::cout << "null pointer overload\n";
    }
    
    int main()
    {
        int* pi{};
        double* pd{};
    
        f(pi);
        f(pd);
        f(nullptr); // seria ambíguo sem void f(nullptr_t)
        // f(0);    // chamada ambígua: todas as três funções são candidatas
        // f(NULL); // ambíguo se NULL é uma constante de ponteiro nulo integral 
                    // (como é o caso na maioria das implementações)
    }
```

Saída:
```
    Pointer to integer overload
    Pointer to double overload
    null pointer overload
```

### Veja também

[`nullptr`](<#/doc/language/nullptr>) (C++11) | o literal de ponteiro que especifica um valor de ponteiro nulo
---|---
[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(macro constante)
[ is_null_pointer](<#/doc/types/is_null_pointer>)(C++11)(DR*) | verifica se um tipo é **std::nullptr_t**
(modelo de classe)
[documentação C](<#/>) para nullptr_t