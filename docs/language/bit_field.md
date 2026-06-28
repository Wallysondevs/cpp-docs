# Campo de bits

Declara um membro de dados de classe com tamanho explícito, em bits. Membros de campo de bits adjacentes podem (ou não) ser empacotados para compartilhar e se estender por bytes individuais.

Uma declaração de campo de bits é uma [declaração de membro de dados de classe](<#/doc/language/data_members>) que usa o seguinte declarador:

---
identifier ﻿(opcional) attr ﻿(opcional) `:` size | (1) |
---|---|---
identifier ﻿(opcional) attr ﻿(opcional) `:` size brace-or-equal-initializer | (2) | (desde C++20)

O _tipo_ do campo de bits é introduzido pela decl-specifier-seq da [sintaxe de declaração](<#/doc/language/declarations>).

- **attr** — (desde C++11) sequência de qualquer número de [atributos](<#/doc/language/attributes>)
- **identifier** — o nome do campo de bits que está sendo declarado. O nome é opcional: campos de bits sem nome introduzem o número especificado de [bits de preenchimento](<#/doc/language/objects>).
- **size** — uma [expressão constante integral](<#/doc/language/constant_expression>) com um valor maior ou igual a zero. Quando maior que zero, este é o número de bits que este campo de bits ocupará. O valor zero é permitido apenas para campos de bits sem nome e tem [significado especial](<#/doc/language/bit_field>).
- **brace-or-equal-initializer** — [inicializador de membro padrão](<#/doc/language/data_members>) a ser usado com este campo de bits

### Explicação

O tipo de um campo de bits pode ser apenas integral (incluindo bool) ou um tipo de enumeração (possivelmente cv-qualified), um campo de bits sem nome não pode ser declarado com um tipo cv-qualified.

Um campo de bits não pode ser um [membro de dados estático](<#/doc/language/static>).

Não existem [prvalues](<#/doc/language/value_category>) de campo de bits: a conversão de lvalue para rvalue sempre produz um objeto do tipo subjacente do campo de bits.

O número de bits em um campo de bits define o limite para o intervalo de valores que ele pode armazenar:

Run this code
```cpp
    #include <iostream>
    
    struct S
    {
        // three-bit unsigned field, allowed values are 0...7
        unsigned int b : 3;
    };
    
    int main()
    {
        S s = {6};
    
        ++s.b; // store the value 7 in the bit-field
        std::cout << s.b << '\n';
    
        ++s.b; // the value 8 does not fit in this bit-field
        std::cout << s.b << '\n'; // formally implementation-defined, typically 0
    }
```

Possible output:
```
    7
    0
```

Múltiplos campos de bits adjacentes são geralmente empacotados juntos (embora este comportamento seja definido pela implementação):

Run this code
```cpp
    #include <bit>
    #include <cstdint>
    #include <iostream>
    
    struct S
    {
        // will usually occupy 2 bytes:
        unsigned char b1 : 3; // 1st 3 bits (in 1st byte) are b1
        unsigned char    : 2; // next 2 bits (in 1st byte) are blocked out as unused
        unsigned char b2 : 6; // 6 bits for b2 - doesn't fit into the 1st byte => starts a 2nd
        unsigned char b3 : 2; // 2 bits for b3 - next (and final) bits in the 2nd byte
    };
    
    int main()
    {
        std::cout << sizeof(S) << '\n'; // usually prints 2
    
        S s;
        // set distinguishable field values
        s.b1 = 0b111;
        s.b2 = 0b101111;
        s.b3 = 0b11;
    
        // show layout of fields in S
        auto i = std::bit_cast<std::uint16_t>(s);
        // usually prints 1110000011110111
        // breakdown is:  └┬┘├┘└┬┘└─┬──┘└┤
        //                b1 u  a   b2  b3
        // where “u” marks the unused :2 specified in the struct, and
        // “a” marks compiler-added padding to byte-align the next field.
        // Byte-alignment is happening because b2's type is declared unsigned char;
        // if b2 were declared uint16_t there would be no “a”, b2 would abut “u”.
        for (auto b = i; b; b >>= 1) // print LSB-first
            std::cout << (b & 1);
        std::cout << '\n';
    }
```

Possible output:
```
    2
    1110000011110111
```

O campo de bits especial sem nome de tamanho zero pode ser forçado a quebrar o preenchimento. Ele especifica que o próximo campo de bits começa no início de sua unidade de alocação:

Run this code
```cpp
    #include <iostream>
    
    struct S
    {
        // will usually occupy 2 bytes:
        // 3 bits: value of b1
        // 5 bits: unused
        // 2 bits: value of b2
        // 6 bits: unused
        unsigned char b1 : 3;
        unsigned char :0; // start a new byte
        unsigned char b2 : 2;
    };
    
    int main()
    {
        std::cout << sizeof(S) << '\n'; // usually prints 2
                                        // would usually print 1 if not for
                                        // the padding break in line 11
    }
```

Possible output:
```
    2
```

Se o tamanho especificado do campo de bits for maior que o tamanho de seu tipo, o valor é limitado pelo tipo: um [std::uint8_t](<#/doc/types/integer>) b : 1000; ainda armazenaria valores no intervalo `[`​0​`, `255`]`. Os bits extras são [bits de preenchimento](<#/doc/language/objects>).

Como os campos de bits não começam necessariamente no início de um byte, o endereço de um campo de bits não pode ser obtido. Ponteiros e referências não-const a campos de bits não são possíveis. Ao [inicializar uma referência const](<#/doc/language/reference_initialization>) a partir de um campo de bits, um temporário é criado (seu tipo é o tipo do campo de bits), inicializado por cópia com o valor do campo de bits, e a referência é vinculada a esse temporário.

Não existem [inicializadores de membro padrão](<#/doc/language/data_members>) para campos de bits: int b : 1 = 0; e int b : 1 {0} são malformados. | (até C++20)
Em caso de ambiguidade entre o tamanho do campo de bits e o inicializador de membro padrão, a sequência mais longa de tokens que forma um tamanho válido é escolhida:
```cpp
    int a;
    const int b = 0;
    
    struct S
    {
        // simple cases
        int x1 : 8 = 42; // OK; "= 42" is brace-or-equal-initializer
        int x2 : 8 {42}; // OK; "{42}" is brace-or-equal-initializer
    
        // ambiguities
        int y1 : true ? 8 : a = 42;   // OK; brace-or-equal-initializer is absent
        int y2 : true ? 8 : b = 42;   // error: cannot assign to const int
        int y3 : (true ? 8 : b) = 42; // OK; "= 42" is brace-or-equal-initializer
        int z : 1 || new int{0};      // OK; brace-or-equal-initializer is absent
    };
```

| (desde C++20)

### Notas

As seguintes propriedades de campos de bits são _definidas pela implementação_ :

  * O valor que resulta da atribuição ou inicialização de um campo de bits assinado com um valor fora do intervalo, ou do incremento de um campo de bits assinado além de seu intervalo.
  * Tudo sobre os detalhes reais de alocação de campos de bits dentro do objeto de classe.

    

  * Por exemplo, em algumas plataformas, campos de bits não se estendem por bytes, em outras sim.
  * Além disso, em algumas plataformas, campos de bits são empacotados da esquerda para a direita, em outras da direita para a esquerda.

Na linguagem de programação C, a largura de um campo de bits não pode exceder a largura do tipo subjacente, e se campos de bits int que não são explicitamente signed ou unsigned são signed ou unsigned é definido pela implementação. Por exemplo, int b : 3; pode ter o intervalo de valores `[`​0​`, `7`]` ou `[`-4`, `3`]` em C, mas apenas a última opção é permitida em C++.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 324](<https://cplusplus.github.io/CWG/issues/324.html>) | C++98 | não era especificado se o valor de retorno de uma atribuição a um campo de bits é um campo de bits | adicionadas especificações de campo de bits para operadores que podem retornar lvalues
[CWG 739](<https://cplusplus.github.io/CWG/issues/739.html>) | C++98 | o sinal de campos de bits que não eram declarados signed nem unsigned era definido pela implementação | consistente com os tipos subjacentes
[CWG 2229](<https://cplusplus.github.io/CWG/issues/2229.html>) | C++98 | campos de bits sem nome podiam ser declarados com um tipo cv-qualified | proibido
[CWG 2511](<https://cplusplus.github.io/CWG/issues/2511.html>) | C++98 | cv-qualifications não eram permitidas em tipos de campo de bits | campos de bits podem ter tipos de enumeração cv-qualified

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 11.4.10 Campos de bits [class.bit]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 11.4.9 Campos de bits [class.bit]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 12.2.4 Campos de bits [class.bit]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 9.6 Campos de bits [class.bit]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 9.6 Campos de bits [class.bit]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 9.6 Campos de bits [class.bit]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 9.6 Campos de bits [class.bit]

### Veja também

[ bitset](<#/doc/utility/bitset>) | implementa array de bits de comprimento constante
(modelo de classe)
[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) | bitset dinâmico com eficiência de espaço
(especialização de modelo de classe)
[**Manipulação de bits**](<#/doc/utility/bit>) (C++20) | utilitários para acessar, manipular e processar bits individuais e sequências de bits
[Documentação C](<#/>) para Campos de bits