# especificador alignas (desde C++11)

Especifica o [requisito de alinhamento](<#/doc/language/objects>) de um tipo ou de um objeto.

### Sintaxe

---
`alignas(` expression `)`
`alignas(` type-id `)`
`alignas(` pack `...` `)`

1) expression deve ser uma [expressão constante integral](<#/doc/language/constant_expression>) que avalia para zero, ou para um valor válido para um [alinhamento](<#/doc/language/objects>) ou alinhamento estendido.

2) Equivalente a alignas(alignof( `type-id` )).

3) Equivalente a múltiplos especificadores alignas aplicados à mesma declaração, um para cada membro do [parameter pack](<#/doc/language/parameter_pack>), que pode ser um parameter pack de tipo ou não-tipo.

### Explicação

O especificador alignas pode ser aplicado a:

  * a declaração ou definição de uma [classe](<#/doc/language/classes>);
  * a declaração de um membro de dados de classe não-bitfield;
  * a declaração de uma variável, exceto que não pode ser aplicado ao seguinte:
    * um parâmetro de função;
    * o parâmetro de exceção de uma cláusula catch.

O objeto ou o tipo declarado por tal declaração terá seu [requisito de alinhamento](<#/doc/language/objects>) igual à expressão não-zero mais rigorosa (maior) de todos os especificadores `alignas` usados na declaração, a menos que isso enfraqueça o alinhamento natural do tipo.

Se o `alignas` mais rigoroso (maior) em uma declaração for mais fraco do que o alinhamento que teria sem nenhum especificador `alignas` (ou seja, mais fraco do que seu alinhamento natural ou mais fraco do que `alignas` em outra declaração do mesmo objeto ou tipo), o programa é malformado:
```cpp
    struct alignas(8) S {};
    struct alignas(1) U { S s; }; // error: alignment of U would have been 8 without alignas(1)
```

Alinhamentos não-zero inválidos, como alignas(3), são malformados.

Alinhamentos não-zero válidos que são mais fracos do que outro alignas na mesma declaração são ignorados.

alignas(0) é sempre ignorado.

### Notas

A partir do padrão ISO C11, a linguagem C possui a palavra-chave _Alignas e define alignas como uma macro de pré-processador que se expande para a palavra-chave no header [`<stdalign.h>`](<#/>).

Em C++, esta é uma palavra-chave, e

os headers [`<stdalign.h>`](<#/doc/header/cstdalign>) e [`<cstdalign>`](<#/doc/header/cstdalign>) não definem tal macro. Eles, no entanto, definem a constante de macro __alignas_is_defined. | (até C++20)
---|---
o header [`<stdalign.h>`](<#/doc/header/cstdalign>) não define tal macro. Ele, no entanto, define a constante de macro __alignas_is_defined. | (desde C++20)

### Palavras-chave

[`alignas`](<#/doc/keyword/alignas>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    // Todo objeto do tipo struct_float será alinhado
    // ao limite de alignof(float) (geralmente 4):
    struct alignas(float) struct_float
    {
        // sua definição aqui
    };
     
    // Todo objeto do tipo sse_t será alinhado a um limite de 32 bytes:
    struct alignas(32) sse_t
    {
        float sse_data[4];
    };
     
    int main()
    {
        struct default_aligned
        {
            float data[4];
        } a, b, c;
        sse_t x, y, z;
     
        std::cout
            << "alignof(struct_float) = " << alignof(struct_float) << '\n'
            << "sizeof(sse_t) = " << sizeof(sse_t) << '\n'
            << "alignof(sse_t) = " << alignof(sse_t) << '\n'
            << std::hex << std::showbase
            << "&a: " << &a << "\n"
               "&b: " << &b << "\n"
               "&c: " << &c << "\n"
               "&x: " << &x << "\n"
               "&y: " << &y << "\n"
               "&z: " << &z << '\n';
    }
```

Saída possível:
```
    alignof(struct_float) = 4
    sizeof(sse_t) = 32
    alignof(sse_t) = 32
    &a: 0x7fffcec89930
    &b: 0x7fffcec89940
    &c: 0x7fffcec89950
    &x: 0x7fffcec89960
    &y: 0x7fffcec89980
    &z: 0x7fffcec899a0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1437](<https://cplusplus.github.io/CWG/issues/1437.html>) | C++11 | alignas poderia ser usado em declarações de alias | proibido
[CWG 2354](<https://cplusplus.github.io/CWG/issues/2354.html>) | C++11 | alignas poderia ser aplicado à declaração de uma enumeração | proibido

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 9.12.4 Atributo de dependência de transporte [dcl.attr.depend]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 9.12.3 Atributo de dependência de transporte [dcl.attr.depend]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 10.6.3 Atributo de dependência de transporte [dcl.attr.depend]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 7.6.4 Atributo de dependência de transporte [dcl.attr.depend]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 7.6.4 Atributo de dependência de transporte [dcl.attr.depend]

### Ver também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta requisitos de alinhamento de um tipo
(operador)
[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(template de classe)
[Documentação C](<#/>) para _Alignas, alignas