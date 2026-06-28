# especificador final (desde C++11)

Especifica que uma [função virtual](<#/doc/language/virtual>) não pode ser sobrescrita em uma classe derivada, ou que uma classe não pode ser [derivada](<#/doc/language/derived_class>).

### Sintaxe

Quando aplicado a uma função membro, o identificador `final` aparece imediatamente após o [declarator](<#/doc/language/function>) na sintaxe de uma declaração de função membro ou de uma definição de função membro dentro de uma definição de classe.

Quando aplicado a uma classe (incluindo struct e union), o identificador `final` aparece no início da definição da classe, imediatamente após o nome da classe, e não pode aparecer em uma declaração de classe.

---
declarator virt-specifier-seq ﻿(optional) pure-specifier ﻿(optional) | (1) |
---|---|---
declarator virt-specifier-seq ﻿(optional) function-body | (2) |
class-key attr ﻿(optional) class-head-name class-virt-specifier ﻿(optional) base-clause ﻿(optional) | (3) |

1) Em uma declaração de função membro, `final` pode aparecer em virt-specifier-seq imediatamente após o declarator, e antes do [pure-specifier](<#/doc/language/abstract_class>), se usado.

2) Em uma definição de função membro dentro de uma definição de classe, `final` pode aparecer em virt-specifier-seq imediatamente após o declarator e logo antes de function-body.

3) Em uma definição de classe, `final` pode aparecer como class-virt-specifier imediatamente após o nome da classe, logo antes dos dois pontos que iniciam a base-clause, se usada.

Nos casos (1,2), virt-specifier-seq, se usado, é [`override`](<#/doc/language/override>) ou `final`, ou `final override` ou `override final`. No caso (3), o único valor permitido para class-virt-specifier, se usado, é `final`.

### Explicação

Quando usado em uma declaração ou definição de função virtual, o especificador final garante que a função é virtual e especifica que ela não pode ser sobrescrita por classes derivadas. O programa é malformado (um erro em tempo de compilação é gerado) caso contrário.

Quando usado em uma definição de classe, final especifica que esta classe não pode aparecer na base-specifier-list de outra definição de classe (em outras palavras, não pode ser derivada). O programa é malformado caso contrário (um erro em tempo de compilação é gerado). final também pode ser usado com uma definição de [union](<#/doc/language/union>), caso em que não tem efeito (além do resultado de [std::is_final](<#/doc/types/is_final>))(desde C++14), já que unions não podem ser derivadas.

final é um identificador com um significado especial quando usado em uma declaração de função membro ou cabeçalho de classe. Em outros contextos, não é reservado e pode ser usado para nomear objetos e funções.

### Nota

Em uma sequência dos seguintes tokens:

1. um de class, struct e union
2. um [identificador](<#/doc/language/name>) possivelmente qualificado
3. final
4. um de : e {

o terceiro token final na sequência é sempre considerado como um especificador em vez de um identificador.

Run this code
```cpp
    struct A;
    struct A final {}; // OK, definição da struct A,
                       // não inicialização por valor da variável final
    
    struct X
    {
        struct C { constexpr operator int() { return 5; } };
        struct B final : C{}; // OK, definição da classe aninhada B,
                              // não declaração de um membro bit-field final
    };
    
    // Uso anormal de final.
    
    struct final final // OK, definição de uma struct chamada `final` da qual
    {                  // você não pode herdar
    };
    
    // struct final final {}; // Erro: redefinição de `struct final`, NÃO uma
                              // definição de uma variável `final` usando um
                              // especificador de tipo elaborado `struct final` seguido por uma
                              // inicialização agregada
    
    // struct override : final {}; // Erro: não é possível derivar de um tipo base final;
                                   // `override` no contexto dado é um nome normal
    void foo()
    {
        [[maybe_unused]]
        final final; // OK, declaração de uma variável chamada `final` do tipo
                     // `struct final` 
    }
    
    struct final final; // OK, declaração de uma variável chamada `final` do tipo
                        // `struct final` usando um especificador de tipo elaborado
    int main()
    {
    }
```

### Keywords

[`final`](<#/doc/identifier_with_special_meaning/final>)

### Exemplo

Run this code
```cpp
    struct Base
    {
        virtual void foo();
    };
    
    struct A : Base
    {
        void foo() final; // Base::foo é sobrescrita e A::foo é a sobrescrita final
        void bar() final; // Erro: bar não pode ser final pois não é virtual
    };
    
    struct B final : A // struct B é final
    {
        void foo() override; // Erro: foo não pode ser sobrescrita pois é final em A
    };
    
    struct C : B {}; // Erro: B é final
```

Possible output:
```
    main.cpp:9:10: error: 'void A::bar()' marked 'final', but is not virtual
        9 |     void bar() final; // Erro: bar não pode ser final pois não é virtual
          |          ^~~
    main.cpp:14:10: error: virtual function 'virtual void B::foo()' overriding final function
       14 |     void foo() override; // Erro: foo não pode ser sobrescrita pois é final em A
          |          ^~~
    main.cpp:8:10: note: overridden function is 'virtual void A::foo()'
        8 |     void foo() final; // Base::foo é sobrescrita e A::foo é a sobrescrita final
          |          ^~~
    main.cpp:17:8: error: cannot derive from 'final' base 'B' in derived type 'C'
       17 | struct C : B // Erro: B é final
          |
```

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

    *   11 Classes [class]
    *   11.7.3 Virtual functions [class.virtual]
*   C++20 standard (ISO/IEC 14882:2020):

    *   11 Classes [class]
    *   11.7.2 Virtual functions [class.virtual]
*   C++17 standard (ISO/IEC 14882:2017):

    *   12 Classes [class]
    *   13.3 Virtual functions [class.virtual]
*   C++14 standard (ISO/IEC 14882:2014):

    *   9 Classes [class]
    *   10.3 Virtual functions [class.virtual]
*   C++11 standard (ISO/IEC 14882:2011):

    *   9 Classes [class]
    *   10.3 Virtual functions [class.virtual]

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1318](<https://cplusplus.github.io/CWG/issues/1318.html>) | C++11 | uma definição de classe que tem final após o nome da classe e uma lista de especificação de membros vazia pode fazer de final um identificador | final é sempre um especificador neste caso

### Veja também

[`override` specifier](<#/doc/language/override>)(C++11) | declara explicitamente que um método sobrescreve outro método
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.