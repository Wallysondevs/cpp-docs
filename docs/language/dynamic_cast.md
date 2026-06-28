# Conversão dynamic_cast

Converte com segurança ponteiros e referências para classes para cima, para baixo e lateralmente ao longo da hierarquia de herança.

### Sintaxe

---
`dynamic_cast <` target-type `>(` expression `)`
- **target-type** — ponteiro para tipo de classe completo, referência para tipo de classe completo, ou ponteiro para void (opcionalmente cv-qualified)
- **expression** — lvalue(ate C++11)glvalue(desde C++11) de um tipo de classe completo se target-type for uma referência, prvalue de um ponteiro para tipo de classe completo se target-type for um ponteiro

### Explicação

Para conveniência da descrição, "expressão ou o resultado é uma referência para `T`" significa que "é um glvalue do tipo `T`", o que segue a convenção de [`decltype`](<#/doc/language/decltype>)(desde C++11).

Apenas as seguintes conversões podem ser feitas com dynamic_cast, exceto quando tais conversões [removeriam a constness](<#/doc/language/const_cast>) (ou volatility).

1) Se o tipo de expression for exatamente target-type ou uma versão menos cv-qualified de target-type, o resultado é o valor de expression com o tipo target-type.[1](<#/doc/language/dynamic_cast>)

2) Se target-type for "ponteiro para `Base` (possivelmente cv-qualified)" e o tipo de expression for "ponteiro para `Derived` (possivelmente cv-qualified)" de tal forma que `Base` seja uma classe base de `Derived`, o resultado é

  * um valor de ponteiro nulo se expression for um valor de ponteiro nulo, ou
  * um ponteiro para o [subobjeto](<#/doc/language/objects>) `Base` único do objeto `Derived` apontado por expression caso contrário.[2](<#/doc/language/dynamic_cast>)

3) Se target-type for "referência para `Base` (possivelmente cv-qualified)" e o tipo de expression for "`Derived` (possivelmente cv-qualified)" de tal forma que `Base` seja uma classe base de `Derived`, o resultado é o subobjeto `Base` único do objeto `Derived` referenciado por expression.[2](<#/doc/language/dynamic_cast>)

4) Caso contrário, expression é um ponteiro ou referência para um [tipo polimórfico](<#/doc/language/objects>).

a) Se expression for um ponteiro:

i) Se expression for um valor de ponteiro nulo, o resultado é o valor de ponteiro nulo do tipo target-type.

ii) Caso contrário, se target-type for "ponteiro para void (possivelmente cv-qualified)", o resultado é um ponteiro para o [objeto mais derivado](<#/doc/language/objects>) apontado por expression.

iii) Caso contrário, se o tipo de expression for "ponteiro para `U` (possivelmente cv-qualified)", expression deve apontar para um objeto cujo tipo é [similar](<#/doc/language/implicit_cast>) a `U` e que esteja dentro de seu [tempo de vida](<#/doc/language/lifetime>) ou dentro de seu período de construção ou destruição, caso contrário o comportamento é indefinido.

b) Se o tipo de expression for "referência para `U` (possivelmente cv-qualified)", expression deve referenciar um objeto cujo tipo é similar a `U` e que esteja dentro de seu tempo de vida ou dentro de seu período de construção ou destruição, caso contrário o comportamento é indefinido.

c) Caso contrário (expression aponta/referencia um objeto apropriado), uma verificação em tempo de execução é aplicada para ver se o objeto apontado/referenciado por expression pode ser convertido para o tipo apontado ou referenciado por target-type.

Seja `C` o tipo de classe para o qual target-type aponta ou referencia. A verificação em tempo de execução é logicamente executada da seguinte forma:

i) Se, no objeto mais derivado apontado/referenciado por expression, expression aponta/referencia um subobjeto de classe base pública de um objeto `C`, e se apenas um objeto do tipo `C` é derivado do subobjeto apontado/referenciado por expression, o resultado aponta/referencia para esse objeto `C`.[3](<#/doc/language/dynamic_cast>)

ii) Caso contrário, se expression aponta/referencia um subobjeto de classe base pública do objeto mais derivado, e o tipo do objeto mais derivado tem uma classe base pública e não ambígua do tipo `C`, o resultado aponta/referencia para o subobjeto `C` do objeto mais derivado.[4](<#/doc/language/dynamic_cast>)

iii) Caso contrário, a verificação em tempo de execução falha.

  * Se target-type for um tipo ponteiro, o resultado é o valor de ponteiro nulo de target-type.
  * Se target-type for um tipo referência, uma exceção de um tipo que corresponderia a um [handler](<#/doc/language/catch>) do tipo [std::bad_cast](<#/doc/types/bad_cast>) é lançada.

Quando dynamic_cast é usado em um construtor ou um destrutor (direta ou indiretamente), e expression referencia o objeto que está atualmente em construção/destruição, o objeto é considerado o objeto mais derivado. Se target-type não for um ponteiro ou referência para a própria classe do construtor/destrutor ou uma de suas bases, o comportamento é indefinido.

  1. [↑](<#/doc/language/dynamic_cast>) Em outras palavras, dynamic_cast pode ser usado para adicionar constness. Uma conversão implícita e static_cast também podem realizar esta conversão.
  2. ↑ [2.0](<#/doc/language/dynamic_cast>) [2.1](<#/doc/language/dynamic_cast>) Uma conversão implícita e static_cast também podem realizar esta conversão.
  3. [↑](<#/doc/language/dynamic_cast>) Isso é conhecido como um "downcast".
  4. [↑](<#/doc/language/dynamic_cast>) Isso é conhecido como um "sidecast".

Similar a outras expressões de cast, o resultado é:

  * um lvalue se target-type for um tipo referência
  * um rvalue se target-type for um tipo ponteiro

| (ate C++11)

  * um lvalue se target-type for um tipo de referência lvalue (expression deve ser um lvalue)
  * um xvalue se target-type for um tipo de referência rvalue (expression pode ser lvalue ou rvalue(ate C++17)deve ser um glvalue (prvalues são [materializados](<#/doc/language/implicit_cast>))(desde C++17) de um tipo de classe completo)
  * um prvalue se target-type for um tipo ponteiro

| (desde C++11)

### Notas

Um downcast também pode ser realizado com static_cast, o que evita o custo da verificação em tempo de execução, mas é seguro apenas se o programa puder garantir (através de alguma outra lógica) que o objeto apontado por expression é definitivamente `Derived`.

Algumas formas de dynamic_cast dependem de [identificação de tipo em tempo de execução](<https://en.wikipedia.org/wiki/Run-time_type_information> "enwiki:Run-time type information") (RTTI), ou seja, informações sobre cada classe polimórfica no programa compilado. Os compiladores geralmente têm opções para desabilitar a inclusão dessas informações.

### Palavras-chave

[`dynamic_cast`](<#/doc/keyword/dynamic_cast>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    struct V
    {
        virtual void f() {} // must be polymorphic to use runtime-checked dynamic_cast
    };
     
    struct A : virtual V {};
     
    struct B : virtual V
    {
        B(V* v, A* a)
        {
            // casts during construction (see the call in the constructor of D below)
            dynamic_cast<B*>(v); // well-defined: v of type V*, V base of B, results in B*
            dynamic_cast<B*>(a); // undefined behavior: a has type A*, A not a base of B
        }
    };
     
    struct D : A, B
    {
        D() : B(static_cast<A*>(this), this) {}
    };
     
    struct Base
    {
        virtual ~Base() {}
    };
     
    struct Derived : Base
    {
        virtual void name() {}
    };
     
    int main()
    {
        D d; // the most derived object
        A& a = d; // upcast, dynamic_cast may be used, but unnecessary
     
        [[maybe_unused]]
        D& new_d = dynamic_cast<D&>(a); // downcast
        [[maybe_unused]]
        B& new_b = dynamic_cast<B&>(a); // sidecast
     
        Base* b1 = new Base;
        if (Derived* d = dynamic_cast<Derived*>(b1); d != nullptr)
        {
            std::cout << "downcast from b1 to d successful\n";
            d->name(); // safe to call
        }
     
        Base* b2 = new Derived;
        if (Derived* d = dynamic_cast<Derived*>(b2); d != nullptr)
        {
            std::cout << "downcast from b2 to d successful\n";
            d->name(); // safe to call
        }
     
        delete b1;
        delete b2;
    }
```

Saída:
```
    downcast from b2 to d successful
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1269](<https://cplusplus.github.io/CWG/issues/1269.html>) | C++11 | a verificação em tempo de execução não era realizada para expressões xvalue se target-type fosse um tipo de referência rvalue | realizada
[CWG 2861](<https://cplusplus.github.io/CWG/issues/2861.html>) | C++98 | expression poderia apontar/referenciar um objeto inacessível por tipo | o comportamento é indefinido neste caso

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 7.6.1.7 Dynamic cast [expr.dynamic.cast]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 7.6.1.6 Dynamic cast [expr.dynamic.cast]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 8.2.7 Dynamic cast [expr.dynamic.cast]

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 5.2.7 Dynamic cast [expr.dynamic.cast]

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 5.2.7 Dynamic cast [expr.dynamic.cast]

  * C++98 standard (ISO/IEC 14882:1998):

    

  * 5.2.7 Dynamic cast [expr.dynamic.cast]

  * C++03 standard (ISO/IEC 14882:2003):

    

  * 5.2.7 Dynamic cast [expr.dynamic.cast]

### Veja também

  * [`const_cast`](<#/doc/language/const_cast>)
  * [`static_cast`](<#/doc/language/static_cast>)
  * [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  * [explicit cast](<#/doc/language/explicit_cast>)
  * [implicit conversions](<#/doc/language/implicit_cast>)
