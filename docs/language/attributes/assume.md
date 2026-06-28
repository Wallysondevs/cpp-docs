# Atributo C++: assume (desde C++23)

Especifica que a expressão fornecida é assumida como sempre avaliando para verdadeiro em um determinado ponto, a fim de permitir otimizações do compilador baseadas nas informações fornecidas.

### Sintaxe

---
`[[assume(` expression `)]]`
- **expression** — qualquer expressão (exceto [expressões de vírgula](<#/doc/language/operator_other>) não-parentesizadas)

### Explicação

[[assume]] só pode ser aplicado a uma [instrução nula](<#/doc/language/statements>), como em [[assume(x > 0)]];. Esta instrução é chamada de _suposição_.

expression é [convertida contextualmente para bool](<#/doc/language/implicit_cast>), mas não é avaliada (ainda é [potencialmente avaliada](<#/doc/language/expressions>)).

*   Se a expressão convertida avaliasse para verdadeiro no ponto onde a suposição aparece, a suposição não tem efeito.
*   Caso contrário, a avaliação da suposição tem [comportamento indefinido em tempo de execução](<#/doc/language/ub>).

### Notas

Como as suposições causam comportamento indefinido em tempo de execução se não forem válidas, elas devem ser usadas com moderação.

Uma maneira correta de usá-las é seguir asserções com suposições:
```cpp
    assert(x > 0);     // dispara uma asserção quando NDEBUG não está definido e x > 0 é falso
    [[assume(x > 0)]]; // fornece oportunidades de otimização quando NDEBUG está definido
```

### Exemplo
```cpp
    #include <cmath>
    
    void f(int& x, int y)
    {
        void g(int);
        void h();
    
        [[assume(x > 0)]]; // O compilador pode assumir que x é positivo
    
        g(x / 2); // Código mais eficiente possivelmente gerado
    
        x = 3;
        int z = x;
    
        [[assume((h(), x == z))]]; // O compilador pode assumir que x teria o mesmo valor após
                                   // chamar h
                                   // A suposição não causa uma chamada para h
    
        h();
        g(x); // O compilador pode substituir isso por g(3);
    
        h();
        g(x); // O compilador PODE NÃO substituir isso por g(3);
              // Uma suposição se aplica apenas no ponto onde ela aparece
    
        z = std::abs(y);
    
        [[assume((g(z), true))]]; // O compilador pode assumir que g(z) retornará
    
        g(z); // Devido às suposições acima e abaixo, o compilador pode substituir isso por g(10);
    
        [[assume(y == -10)]]; // Comportamento indefinido se y != -10 neste ponto
    
        [[assume((x - 1) * 3 == 12)]];
    
        g(x); // O compilador pode substituir isso por g(5);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 2924](<https://cplusplus.github.io/CWG/issues/2924.html>) | C++23 | violar uma suposição resultaria em comportamento indefinido | resulta em comportamento indefinido em tempo de execução

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   9.12.3 Atributo de suposição [dcl.attr.assume]

### Veja também

[ unreachable](<#/doc/utility/unreachable>)(C++23) | marca um ponto de execução inatingível
(função)

### Links externos

1.  | Documentação das extensões de linguagem Clang: [`__builtin_assume`](<https://clang.llvm.org/docs/LanguageExtensions.html#langext-builtin-assume>).
---|---
2.  | Documentação de referência de atributos Clang: [`assume`](<https://clang.llvm.org/docs/AttributeReference.html#assume>).
3.  | Documentação MSVC: [`__assume`](<https://learn.microsoft.com/en-us/cpp/intrinsics/assume>) built-in.
4.  | Documentação GCC: [`__attribute__((assume(...)))`](<https://gcc.gnu.org/onlinedocs/gcc/Statement-Attributes.html#index-assume-statement-attribute>).