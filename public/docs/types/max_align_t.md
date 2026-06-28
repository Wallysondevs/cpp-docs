# std::max_align_t

Definido no header `[<cstddef>](<#/doc/header/cstddef>)`

```cpp
typedef /* implementation-defined */ max_align_t;  // (desde C++11)
```

`std::max_align_t` é um tipo [standard-layout](<#/doc/named_req/StandardLayoutType>) [TrivialType](<#/doc/named_req/TrivialType>)(até C++26)[TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>)(desde C++26) cujo [requisito de alinhamento](<#/doc/language/objects>) é pelo menos tão rigoroso (tão grande) quanto o de todo tipo escalar.

[std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)<std::max_align_t> é verdadeiro.

### Notas

Ponteiros retornados por funções de alocação como [std::malloc](<#/doc/memory/c/malloc>) são adequadamente alinhados para qualquer objeto, o que significa que eles são alinhados pelo menos tão rigorosamente quanto `std::max_align_t`.

### Exemplo

Execute este código
```
    #include <cstddef>
    #include <iostream>
    
    int main()
    {
        std::cout << alignof(std::max_align_t) << '\n';
    }
```

Saída possível:
```
    16
```

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 17.2.4 Tamanhos, alinhamentos e offsets [support.types.layout] (p: 504-505)

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 17.2.4 Tamanhos, alinhamentos e offsets [support.types.layout] (p: 507-508)

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 21.2.4 Tamanhos, alinhamentos e offsets [support.types.layout] (p: 479)

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 18.2 Tipos [support.types] (p: 443-444)

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 18.2 Tipos [support.types] (p: 454-455)

### Veja também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo
(operador)
[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(modelo de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(modelo de classe)
[documentação C](<#/>) para max_align_t