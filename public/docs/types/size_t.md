# std::size_t

Definido no header `[<cstddef>](<#/doc/header/cstddef>)`

```cpp
Definido no header `<cstdio>`
Definido no header `<cstdlib>`
Definido no header `<cstring>`
Definido no header `<ctime>`
```

Definido no header `[<cuchar>](<#/doc/header/cuchar>)` | | (desde C++17)

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
typedef /* implementation-defined */ size_t;
```

`std::size_t` é o tipo inteiro sem sinal do resultado dos seguintes operadores:

  * [`sizeof`](<#/doc/language/sizeof>)

  * [`sizeof...`](<#/doc/language/sizeof...>)
  * [`alignof`](<#/doc/language/alignof>)

| (desde C++11)

Se um programa tentar formar um tipo superdimensionado (ou seja, o número de bytes em sua [representação de objeto](<#/doc/language/objects>) exceder o valor máximo representável em `std::size_t`), o programa é malformado.

A largura em bits de `std::size_t` não é menor que 16. | (desde C++11)

### Notas

`std::size_t` pode armazenar o tamanho máximo de um objeto teoricamente possível de qualquer tipo (incluindo array). Em muitas plataformas (uma exceção são sistemas com endereçamento segmentado) `std::size_t` pode armazenar com segurança o valor de qualquer ponteiro não-membro, caso em que é sinônimo de [std::uintptr_t](<#/doc/types/integer>).

`std::size_t` é comumente usado para indexação de arrays e contagem de loops. Programas que usam outros tipos, como unsigned int, para indexação de arrays podem falhar em, por exemplo, sistemas de 64 bits quando o índice excede [UINT_MAX](<#/doc/types/climits>) ou se dependem de aritmética modular de 32 bits.

Ao indexar containers C++, como [std::string](<#/doc/string/basic_string>), [std::vector](<#/doc/container/vector>), etc., o tipo apropriado é o tipo aninhado `size_type` fornecido por esses containers. Ele é geralmente definido como um sinônimo para `std::size_t`.

Não é especificado se a declaração de `std::size_t` está disponível em qualquer outro header da standard library. Uma implementação pode evitar introduzir este nome mesmo quando o padrão exige que `std::size_t` seja usado.

O [sufixo literal inteiro](<#/doc/language/integer_literal>) para `std::size_t` é qualquer combinação de `z` ou `Z` com `u` ou `U` (ou seja, `zu`, `zU`, `Zu`, `ZU`, `uz`, `uZ`, `Uz`, ou `UZ`). | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstddef>
    #include <iostream>
    
    int main()
    {
        std::array<std::size_t, 10> a;
    
        // Example with C++23 std::size_t literal
        for (auto i = 0uz; i != a.size(); ++i)
            std::cout << (a[i] = i) << ' ';
        std::cout << '\n';
    
        // Example of decrementing loop
        for (std::size_t i = a.size(); i--;)
            std::cout << a[i] << ' ';
        std::cout << '\n';
    
        // Note the naive decrementing loop:
        //  for (std::size_t i = a.size() - 1; i >= 0; --i) ...
        // is an infinite loop, because unsigned numbers are always non-negative
    }
```

Saída:
```
    0 1 2 3 4 5 6 7 8 9
    9 8 7 6 5 4 3 2 1 0
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1122](<https://cplusplus.github.io/CWG/issues/1122.html>) | C++98 | `std::size_t` foi definido circularmente[1](<#/doc/types/size_t>) | é definido pela implementação
[CWG 1464](<https://cplusplus.github.io/CWG/issues/1464.html>) | C++98 | o tamanho do objeto pode não ser representável em `std::size_t` | tal tipo é malformado

1. [↑](<#/doc/types/size_t>) A definição de `std::size_t` era exatamente a mesma que a definição de `size_t` em C, que é "o tipo de resultado de [`sizeof`](<#/doc/language/sizeof>)". Não há definição circular em C porque o tipo de resultado de `sizeof` em C é um tipo inteiro sem sinal definido pela implementação.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 6.8.4 Compound types [basic.compound] (p: 79-80)

    

  * 7.6.2.5 Sizeof [expr.sizeof] (p: 136)

    

  * 7.6.2.6 Alignof [expr.alignof] (p: 136)

    

  * 17.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 504-505)

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 6.8.3 Compound types [basic.compound] (p: 75-76)

    

  * 7.6.2.5 Sizeof [expr.sizeof] (p: 129-130)

    

  * 7.6.2.6 Alignof [expr.alignof] (p: 130)

    

  * 17.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 507-508)

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 6.9.2 Compound types [basic.compound] (p: 81-82)

    

  * 8.3.3 Sizeof [expr.sizeof] (p: 121-122)

    

  * 8.3.6 Alignof [expr.alignof] (p: 129)

    

  * 21.2.4 Sizes, alignments, and offsets [support.types.layout] (p: 479)

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 3.9.2 Compound types [basic.compound] (p: 73-74)

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 109-110)

    

  * 5.3.6 Alignof [expr.alignof] (p: 116)

    

  * 18.2 Types [support.types] (p: 443-444)

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 111)

    

  * 5.3.6 Alignof [expr.alignof] (p: 116)

    

  * 18.2 Types [support.types] (p: 454-455)

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 79)

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 5.3.3 Sizeof [expr.sizeof] (p: 77)

### Veja também

[ ptrdiff_t](<#/doc/types/ptrdiff_t>) | tipo inteiro com sinal retornado ao subtrair dois ponteiros
(typedef)
[ offsetof](<#/doc/types/offsetof>) | deslocamento em bytes do início de um tipo [standard-layout](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)
[literais inteiros ](<#/doc/language/integer_literal>) | números binários, (desde C++14) decimais, octais ou hexadecimais de tipo inteiro
[documentação C](<#/>) para size_t