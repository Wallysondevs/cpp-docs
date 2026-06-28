# operador alignof (desde C++11)

Consulta os requisitos de alinhamento de um tipo.

### Sintaxe

---
`alignof(` type-id `)`

Retorna um valor do tipo [std::size_t](<#/doc/types/size_t>).

### Explicação

Retorna [o alinhamento](<#/doc/language/objects>), em bytes, exigido para qualquer instância do tipo indicado por [type-id](<#/doc/language/type-id>), que é um tipo de objeto [completo](<#/doc/language/type-id>), um tipo array cujo tipo de elemento é completo, ou um tipo de referência para um desses tipos.

Se o tipo for um tipo de referência, o operador retorna o alinhamento do tipo referenciado; se o tipo for um tipo array, o requisito de alinhamento do tipo de elemento é retornado.

### Notas

Consulte [alinhamento](<#/doc/language/objects>) para o significado e as propriedades do valor retornado por `alignof`.

### Palavras-chave

[`alignof`](<#/doc/keyword/alignof>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    struct Foo
    {
        int   i;
        float f;
        char  c;
    };
     
    // Note: alignas(alignof(long double)) below can be
    // simplified to alignas(long double) if desired.
    struct alignas(alignof(long double)) Foo2
    {
        // put your definition here
    }; 
     
    struct Empty {};
     
    struct alignas(64) Empty64 {};
     
    #define SHOW(expr) std::cout << #expr << " = " << (expr) << '\n'
     
    int main()
    {
        SHOW(alignof(char));
        SHOW(alignof(int*));
        SHOW(alignof(Foo));
        SHOW(alignof(Foo2));
        SHOW(alignof(Empty));
        SHOW(alignof(Empty64));
    }
```

Saída possível:
```
    alignof(char) = 1
    alignof(int*) = 8
    alignof(Foo) = 4
    alignof(Foo2) = 16
    alignof(Empty) = 1
    alignof(Empty64) = 64
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1305](<https://cplusplus.github.io/CWG/issues/1305.html>) | C++11 | type-id não podia representar uma referência a um array
com um limite desconhecido, mas um tipo de elemento completo | permitido

### Referências

* C++23 standard (ISO/IEC 14882:2024):

  * 7.6.2.6 Alignof [expr.alignof]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 7.6.2.5 Alignof [expr.alignof]

* Padrão C++17 (ISO/IEC 14882:2017):

  * 8.3.6 Alignof [expr.alignof]

* Padrão C++14 (ISO/IEC 14882:2014):

  * 5.3.6 Alignof [expr.alignof]

* Padrão C++11 (ISO/IEC 14882:2011):

  * 5.3.6 Alignof [expr.alignof]

### Veja também

[Requisito de alinhamento](<#/doc/language/objects>) | restringe os endereços nos quais um objeto pode ser alocado
---|---
`[alignas](<#/doc/language/alignas>)` (C++11) | especifica que o armazenamento para a variável deve ser alinhado por uma quantidade específica
(especificador)
[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(modelo de classe)
[Documentação C](<#/>) para `_Alignof`, operador `alignof`