# Modelo de memória

Define a semântica do armazenamento da memória do computador para o propósito da máquina abstrata C++.

A memória disponível para um programa C++ é uma ou mais sequências contíguas de _bytes_. Cada byte na memória possui um _endereço_ único.

### Byte

Um _byte_ é a menor unidade de memória endereçável. Ele é definido como uma sequência contígua de bits, grande o suficiente para armazenar

*   o valor de qualquer unidade de código `UTF-8` (256 valores distintos) e de
*   qualquer membro do [conjunto básico de caracteres de execução](<#/doc/language/charset>).

| (até C++23)

*   a codificação literal ordinária de qualquer elemento do [conjunto básico de caracteres literais](<#/doc/language/charset>).

| (desde C++23)

Similar ao C, C++ suporta bytes de tamanhos de 8 bits ou mais.

Os [tipos](<#/doc/language/types>) char, unsigned char e signed char usam um byte tanto para armazenamento quanto para [representação de valor](<#/doc/language/objects>). O número de bits em um byte é acessível como [CHAR_BIT](<#/doc/types/climits>) ou [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned char&gt;::digits.

### Localização de memória

Uma _localização de memória_ é o armazenamento ocupado pela [representação de objeto](<#/doc/language/objects>) de um objeto de [tipo escalar](<#/doc/language/type-id>) que não é um [bit-field](<#/doc/language/bit_field>), ou a maior sequência contígua de bit-fields de comprimento não-zero.

Nota: Várias características da linguagem, como [referências](<#/doc/language/reference>) e [funções virtuais](<#/doc/language/virtual>), podem envolver localizações de memória adicionais que não são acessíveis aos programas, mas são gerenciadas pela implementação.
```
    struct S
    {
        char a;     // memory location #1
        int b : 5;  // memory location #2
        int c : 11, // memory location #2 (continued)
              : 0,
            d : 8;  // memory location #3
        struct
        {
            int ee : 8; // memory location #4
        } e;
    } obj; // The object “obj” consists of 4 separate memory locations
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1953](<https://cplusplus.github.io/CWG/issues/1953.html>) | C++98 | objetos ocupando o mesmo armazenamento eram
considerados como localizações de memória diferentes | localização de memória
agora se refere ao armazenamento

### Veja também

[Documentação C](<#/>) para Modelo de memória
---