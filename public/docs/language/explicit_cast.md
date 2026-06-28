# Conversão de tipo explícita

Converte entre tipos usando uma combinação de conversões explícitas e implícitas.

### Sintaxe

---
`(` type-id `)` unary-expression | (1) |
simple-type-specifier `(` expression-list ﻿(optional) `)`
simple-type-specifier `(` initializer-list ﻿(optional) `)` | (2) | (ate C++11)
(desde C++11)
simple-type-specifier `{` initializer-list ﻿(optional) `}` | (3) | (desde C++11)
---|---|---
simple-type-specifier `{` designated-initializer-list `}` | (4) | (desde C++20)
`typename` identifier `(` initializer-list ﻿(optional) `)` | (5) | (desde C++11)
`typename` identifier `{` initializer-list ﻿(optional) `}` | (6) | (desde C++11)
`typename` identifier `{` designated-initializer-list `}` | (7) | (desde C++20)

Converte explicitamente qualquer número de valores para um valor do tipo de destino.

1) Conversão de tipo explícita (notação de cast), também chamada de _cast estilo C_.

2-7) Conversão de tipo explícita (notação funcional), também chamada de _cast estilo função_.

- **type-id** — um [type-id](<#/doc/language/type-id>)
- **unary-expression** — uma expressão unária (cujo operador de nível superior não tem uma [precedência](<#/doc/language/operator_precedence>) maior do que a do cast estilo C)
- **simple-type-specifier** — um [especificador de tipo simples](<#/doc/language/declarations>)
- **expression-list** — uma lista de expressões separadas por vírgulas (exceto [expressões de vírgula](<#/doc/language/operator_other>) sem parênteses)
- **initializer-list** — uma lista de [cláusulas de inicialização](<#/doc/language/initialization>) separadas por vírgulas
- **designated-initializer-list** — uma lista de [cláusulas de inicialização designadas](<#/doc/language/aggregate_initialization>) separadas por vírgulas
- **identifier** — um identificador (possivelmente qualificado) (incluindo [identificadores de template](<#/doc/language/templates>))

### Explicação

1) Quando o cast estilo C é encontrado, o compilador tenta interpretá-lo como as seguintes expressões de cast, nesta ordem:

a) [`const_cast`](<#/doc/language/const_cast>)<type-id ﻿>(unary-expression ﻿);

b) [`static_cast`](<#/doc/language/static_cast>)<type-id ﻿>(unary-expression ﻿), com extensões: ponteiro ou referência para uma [classe derivada](<#/doc/language/derived_class>) é adicionalmente permitido ser convertido para ponteiro ou referência para uma classe base não ambígua (e vice-versa), mesmo que a classe base seja [inacessível](<#/doc/language/access>) (ou seja, este cast ignora o especificador de herança privada). O mesmo se aplica à conversão de [ponteiro para membro](<#/doc/language/pointer>) para ponteiro para membro de uma base não virtual não ambígua;

c) um static_cast (com extensões) seguido por const_cast;

d) [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)<type-id ﻿>(unary-expression ﻿);

e) um reinterpret_cast seguido por const_cast.

A primeira escolha que satisfaz os requisitos do respectivo operador de cast é selecionada, mesmo que seja malformada (veja o exemplo). Se um static_cast seguido por um const_cast for usado e a conversão puder ser interpretada de mais de uma maneira, a conversão é malformada.

Além disso, casts estilo C podem converter de, para e entre ponteiros para tipos de classe incompletos. Se tanto o type-id quanto o tipo da unary-expression forem ponteiros para tipos de classe incompletos, é não especificado se static_cast ou reinterpret_cast é selecionado.

2-7) Um cast estilo função especifica um **tipo** (simple-type-specifier ﻿ ou identifier ﻿(desde C++11)) e um **inicializador** (as partes restantes), ele constrói um valor do tipo de destino `T`, que é determinado a partir do tipo especificado e do inicializador(desde C++17): `T` é o tipo especificado. | (ate C++17)
`T` é determinado da seguinte forma:

  * Se o tipo especificado for um placeholder para um tipo de classe deduzido, `T` é o tipo de retorno da função selecionada pela resolução de sobrecarga para [dedução de template de classe](<#/doc/language/ctad>).

|

  * Caso contrário, se o tipo especificado contiver um [tipo placeholder](<#/doc/language/auto>), `T` é o tipo deduzido.

| (desde C++23)

  * Caso contrário, `T` é o tipo especificado.

(desde C++17)

O resultado da conversão é determinado da seguinte forma:

  * Se o cast estilo função for da sintaxe (2), e houver exatamente uma expressão entre parênteses, este cast é equivalente ao cast estilo C correspondente.
  * Caso contrário, se `T` for void (possivelmente cv-qualificado), o resultado é um rvalue(ate C++11)um prvalue(desde C++11) do tipo void que não realiza inicialização.

    

  * Se o inicializador não for (), o programa é malformado.

| (ate C++11)

    

  * Se o inicializador não for () ou {} após [expansão de pack](<#/doc/language/parameter_pack>) (se houver), o programa é malformado.

| (desde C++11)

  * Caso contrário, se `T` for um tipo de referência, o cast estilo função tem o mesmo efeito que [inicializar diretamente](<#/doc/language/direct_initialization>) uma variável t inventada do tipo `T` a partir do inicializador especificado, e o resultado é o t inicializado.

    

  * O resultado é um lvalue.

| (ate C++11)

    

  * Se `T` for um tipo de referência lvalue ou uma referência rvalue para tipo de função, o resultado é um lvalue.
  * Caso contrário, o resultado é um xvalue.

| (desde C++11)

  * Caso contrário, o resultado é um rvalue(ate C++11)um prvalue(desde C++11) do tipo `T` designando um temporário(ate C++17)cujo objeto resultante é(desde C++17) [inicializado diretamente](<#/doc/language/direct_initialization>) com o inicializador especificado.

### Resolução de Ambiguidade

#### Declaração ambígua

No caso de uma ambiguidade entre uma instrução de expressão com uma expressão de cast estilo função como sua subexpressão mais à esquerda e uma instrução de declaração, a ambiguidade é resolvida tratando-a como uma declaração. Esta desambiguação é puramente sintática: ela não considera o significado dos nomes que ocorrem na instrução, exceto se são nomes de tipo:
```cpp
    struct M {};
    struct L { L(M&); };
    
    M n;
    void f()
    {
        M(m);    // declaração, equivalente a M m;
        L(n);    // declaração malformada, equivalente a L n;
        L(l)(m); // ainda uma declaração, equivalente a L l((m));
    }
```

No entanto, se o declarador mais externo na instrução de declaração ambígua tiver um [tipo de retorno trailing](<#/doc/language/function>), a instrução só será tratada como uma instrução de declaração se o tipo de retorno trailing começar com auto:
```cpp
    struct M;
    
    struct S
    {
        S* operator()();
        int N;
        int M;
    
        void mem(S s)
        {
            auto(s)()->M; // expressão (S::M oculta ::M), inválida antes de C++23
        }
    };
    
    void f(S s)
    {
        {
            auto(s)()->N; // expressão, inválida antes de C++23
            auto(s)()->M; // declaração de função, equivalente a M s();
        }
        {
            S(s)()->N;    // expressão
            S(s)()->M;    // expressão
        }
    }
```

| (desde C++11)

#### Parâmetro de função ambíguo

A ambiguidade acima também pode ocorrer no contexto de uma declaração. Nesse contexto, a escolha é entre uma declaração de objeto com um cast estilo função como inicializador e uma declaração envolvendo um declarador de função com um conjunto redundante de parênteses em torno de um nome de parâmetro. A resolução também é considerar qualquer construção, como a potencial declaração de parâmetro, que possa ser uma declaração como uma declaração:
```cpp
    struct S
    {
        S(int);
    };
    
    void foo(double a)
    {
        S w(int(a)); // declaração de função: tem um parâmetro `a` do tipo int
        S x(int());  // declaração de função: tem um parâmetro sem nome do tipo int(*)() 
                     // que é ajustado de int()
    
        // Formas de evitar ambiguidade:
        S y((int(a))); // declaração de objeto: par extra de parênteses
        S y((int)a);   // declaração de objeto: cast estilo C
        S z = int(a);  // declaração de objeto: sem ambiguidade para esta sintaxe
    }
```

No entanto, se o declarador mais externo na declaração de parâmetro ambígua tiver um [tipo de retorno trailing](<#/doc/language/function>), a ambiguidade só será resolvida tratando-a como uma declaração se ela começar com auto:
```cpp
    typedef struct BB { int C[2]; } *B, C;
    
    void foo()
    {
        S a(B()->C);    // declaração de objeto: B()->C não pode declarar um parâmetro
        S b(auto()->C); // declaração de função: tem um parâmetro sem nome do tipo C(*)()
                        // que é ajustado de C()
    }
```

| (desde C++11)

#### type-id ambíguo

Uma ambiguidade pode surgir da similaridade entre um cast estilo função e um [type-id](<#/doc/language/type-id>). A resolução é que qualquer construção que possa ser um type-id em seu contexto sintático deve ser considerada um type-id:
```cpp
    // `int()` e `int(unsigned(a))` podem ambos ser analisados como type-id:
    // `int()`            representa uma função que retorna int
    //                    e não recebe argumentos
    // `int(unsigned(a))` representa uma função que retorna int
    //                    e recebe um argumento do tipo unsigned
    void foo(signed char a)
    {
        sizeof(int());            // type-id (malformado)
        sizeof(int(a));           // expressão
        sizeof(int(unsigned(a))); // type-id (malformado)
    
        (int()) + 1;            // type-id (malformado)
        (int(a)) + 1;           // expressão
        (int(unsigned(a))) + 1; // type-id (malformado)
    }
```

No entanto, se o abstract-declarator mais externo no [type-id](<#/doc/language/type-id>) ambíguo tiver um [tipo de retorno trailing](<#/doc/language/function>), a ambiguidade só será resolvida tratando-o como um type-id se ele começar com auto:
```cpp
    typedef struct BB { int C[2]; } *B, C;
    
    void foo()
    {
        sizeof(B()->C[1]);    // OK, sizeof(expressão)
        sizeof(auto()->C[1]); // erro: sizeof de uma função que retorna um array
    }
```

| (desde C++11)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_auto_cast`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | auto(x) and auto{x}

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    
    double f = 3.14;
    unsigned int n1 = (unsigned int)f; // cast estilo C
    unsigned int n2 = unsigned(f);     // cast estilo função
    
    class C1;
    class C2;
    C2* foo(C1* p)
    {
        return (C2*)p; // converte tipo incompleto para tipo incompleto
    }
    
    void cpp23_decay_copy_demo()
    {
        auto inc_print = 
        {
            ++x;
            std::cout << "x:" << x << ", y:" << y << '\n';
        };
    
        int p{1};
        inc_print(p, p); // imprime x:2 y:2, porque o parâmetro y aqui é um alias de p
        int q{1};
        inc_print(q, auto{q}); // imprime x:2 y:1, auto{q} (C++23) converte para prvalue,
                               // então o parâmetro y é uma cópia de q (não um alias de q)
    }
    
    // Neste exemplo, o cast estilo C é interpretado como static_cast
    // mesmo que funcionasse como reinterpret_cast
    struct A {};
    struct I1 : A {};
    struct I2 : A {};
    struct D : I1, I2 {};
    
    int main()
    {
        D* d = nullptr;
    //  A* a = (A*)d;                   // erro em tempo de compilação
        A* a = reinterpret_cast<A*>(d); // isso compila
        assert(a == nullptr);
    
        cpp23_decay_copy_demo();
    }
```

Saída:
```
    x:2 y:2
    x:2 y:1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 1223](<https://cplusplus.github.io/CWG/issues/1223.html>)
([P2915R0](<https://wg21.link/P2915R0>)) | C++11 | a adição de tipo de retorno trailing introduziu mais ambiguidades | as resolve
---|---|---|---
[CWG 1893](<https://cplusplus.github.io/CWG/issues/1893.html>) | C++11 | cast estilo função não considerava expansões de pack | as considera
[CWG 2351](<https://cplusplus.github.io/CWG/issues/2351.html>) | C++11 | void{} era malformado | tornou-se bem-formado
[CWG 2620](<https://cplusplus.github.io/CWG/issues/2620.html>) | C++98 | a resolução de parâmetros de função ambíguos poderia ser mal interpretada | melhorou a redação
[CWG 2828](<https://cplusplus.github.io/CWG/issues/2828.html>) | C++98 | um cast estilo C era malformado se existissem múltiplas interpretações de um static_cast seguido por um const_cast, independentemente de essas conversões serem realmente usadas | considera apenas as conversões possivelmente sendo usadas
[CWG 2894](<https://cplusplus.github.io/CWG/issues/2894.html>) | C++98 | casts estilo função poderiam criar rvalues de referência | só podem criar lvalues de referência

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 7.6.1.4 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 7.6.3 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 7.6.1.4 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 7.6.3 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 8.2.3 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 8.4 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 5.2.3 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 5.4 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 5.2.3 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 5.4 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 5.2.3 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 5.4 Conversão de tipo explícita (notação de cast) [expr.cast]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 5.2.3 Conversão de tipo explícita (notação funcional) [expr.type.conv]

    

  * 5.4 Conversão de tipo explícita (notação de cast) [expr.cast]

### Veja também

[`const_cast` conversão](<#/doc/language/const_cast>) | adiciona ou remove const
---|---
[`static_cast` conversão](<#/doc/language/static_cast>) | realiza conversões básicas
[`dynamic_cast` conversão](<#/doc/language/dynamic_cast>) | realiza conversões polimórficas verificadas
[`reinterpret_cast` conversão](<#/doc/language/reinterpret_cast>) | realiza conversões gerais de baixo nível
[conversões padrão](<#/doc/language/implicit_cast>) | conversões implícitas de um tipo para outro
[documentação C](<#/>) para o operador de cast