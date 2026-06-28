# Função de conversão definida pelo usuário

Permite [conversão implícita](<#/doc/language/implicit_cast>) ou [conversão explícita](<#/doc/language/explicit_cast>) de um [tipo de classe](<#/doc/language/class>) para outro tipo.

### Sintaxe

A função de conversão é declarada como uma [função membro não estática](<#/doc/language/member_functions>) ou um [template de função membro](<#/doc/language/function_template>) sem parâmetros, sem tipo de retorno explícito e com o nome no formato:

---
```cpp
`operator` conversion-type-id  // (1)
`explicit` `operator` conversion-type-id  // (2) (desde C++11)
`explicit (` expression `)` `operator` conversion-type-id  // (3) (desde C++20)
```

1) Declara uma função de conversão definida pelo usuário que participa de todas as [conversões implícitas](<#/doc/language/implicit_cast>) e [explícitas](<#/doc/language/explicit_cast>).

2) Declara uma função de conversão definida pelo usuário que participa apenas de [inicialização direta](<#/doc/language/direct_initialization>) e [conversões explícitas](<#/doc/language/explicit_cast>).

3) Declara uma função de conversão definida pelo usuário que é [condicionalmente explícita](<#/doc/language/explicit>).

conversion-type-id é um [type-id](<#/doc/language/type-id>), exceto que operadores de função e array `[]` ou `()` não são permitidos em seu declarator (assim, a conversão para tipos como ponteiro para array requer um alias de tipo/typedef ou um template de identidade: veja abaixo). Independentemente de typedef, conversion-type-id não pode representar um tipo array ou um tipo função.

Embora o tipo de retorno não seja permitido na declaração de uma função de conversão definida pelo usuário, o decl-specifier-seq da [gramática de declaração](<#/doc/language/declarations>) pode estar presente e pode incluir qualquer especificador diferente de type-specifier ou da palavra-chave `static`. Em particular, além de [`explicit`](<#/doc/language/explicit>), os especificadores [`inline`](<#/doc/language/inline>), [`virtual`](<#/doc/language/virtual>), [`constexpr`](<#/doc/language/constexpr>)(desde C++11), [`consteval`](<#/doc/language/consteval>)(desde C++20) e [`friend`](<#/doc/language/friend>) também são permitidos (note que `friend` requer um nome qualificado: friend A::operator B();).

Quando tal função membro é declarada na classe X, ela realiza a conversão de X para conversion-type-id:
```cpp
    struct X
    {
        // implicit conversion
        operator int() const { return 7; }
    
        // explicit conversion
        explicit operator int*() const { return nullptr; }
    
        // Error: array operator not allowed in conversion-type-id
    //  operator int(*)3 const { return nullptr; }
    
        using arr_t = int[3];
        operator arr_t*() const { return nullptr; } // OK if done through typedef
    //  operator arr_t () const; // Error: conversion to array not allowed in any case
    };
    
    int main()
    {
        X x;
    
        int n = static_cast<int>(x);   // OK: sets n to 7
        int m = x;                     // OK: sets m to 7
    
        int* p = static_cast<int*>(x); // OK: sets p to null
    //  int* q = x; // Error: no implicit conversion
    
        int (*pa)[3] = x;  // OK
    }
```

### Explicação

A função de conversão definida pelo usuário é invocada na segunda etapa da [conversão implícita](<#/doc/language/implicit_cast>), que consiste em zero ou um [construtor de conversão](<#/doc/language/converting_constructor>) ou zero ou uma função de conversão definida pelo usuário.

Se tanto funções de conversão quanto construtores de conversão puderem ser usados para realizar alguma conversão definida pelo usuário, as funções de conversão e os construtores são ambos considerados pela [resolução de sobrecarga](<#/doc/language/overload_resolution>) em contextos de [inicialização por cópia](<#/doc/language/copy_initialization>) e [inicialização por referência](<#/doc/language/reference_initialization>), mas apenas os construtores são considerados em contextos de [inicialização direta](<#/doc/language/direct_initialization>).
```cpp
    struct To
    {
        To() = default;
        To(const struct From&) {} // converting constructor
    };
    
    struct From
    {
        operator To() const {return To();} // conversion function
    };
    
    int main()
    {
        From f;
        To t1(f);  // direct-initialization: calls the constructor
        // Note: if converting constructor is not available, implicit copy constructor
        // will be selected, and conversion function will be called to prepare its argument
    
    //  To t2 = f; // copy-initialization: ambiguous
        // Note: if conversion function is from a non-const type, e.g.
        // From::operator To();, it will be selected instead of the ctor in this case
    
        To t3 = static_cast<To>(f); // direct-initialization: calls the constructor
        const To& r = f;            // reference-initialization: ambiguous
    }
```

Funções de conversão para sua própria classe (possivelmente cv-qualificada) (ou para uma referência a ela), para a base de sua própria classe (ou para uma referência a ela), e para o tipo void podem ser definidas, mas não podem ser executadas como parte da sequência de conversão, exceto, em alguns casos, através de [dispatch virtual](<#/doc/language/virtual>):
```cpp
    struct D;
    
    struct B
    {
        virtual operator D() = 0;
    };
    
    struct D : B
    {
        operator D() override { return D(); }
    };
    
    int main()
    {
        D obj;
        D obj2 = obj; // does not call D::operator D()
        B& br = obj;
        D obj3 = br;  // calls D::operator D() through virtual dispatch
    }
```

Também pode ser chamada usando a sintaxe de chamada de função membro:
```cpp
    struct B {};
    
    struct X : B
    {
        operator B&() { return *this; };
    };
    
    int main()
    {
        X x;
        B& b1 = x;                  // does not call X::operatorB&()
        B& b2 = static_cast<B&>(x); // does not call X::operatorB&
        B& b3 = x.operator B&();    // calls X::operatorB&
    }
```

Ao fazer uma chamada explícita para a função de conversão, conversion-type-id é guloso: é a sequência mais longa de tokens que poderia formar um conversion-type-id (incluindo atributos, se houver)(desde C++11):
```cpp
    & x.operator int * a; // error: parsed as & (x.operator int*) a,
                          //           not as & (x.operator int) * a
    
    operator int [[noreturn]] (); // error: noreturn attribute applied to a type
```

O marcador de posição [auto](<#/doc/language/auto>) pode ser usado em conversion-type-id, indicando um [tipo de retorno deduzido](<#/doc/language/function>):
```cpp
    struct X
    {
        operator int(); // OK
        operator auto() -> short; // error: trailing return type not part of syntax
        operator auto() const { return 10; } // OK: deduced return type
        operator decltype(auto)() const { return 10l; } // OK: deduced return type
    };
```

Nota: um [template de função de conversão](<#/doc/language/member_template>) não pode ter um tipo de retorno deduzido. | (desde C++14)

Funções de conversão podem ser herdadas e podem ser [virtuais](<#/doc/language/virtual>), mas não podem ser [estáticas](<#/doc/language/static>). Uma função de conversão na classe derivada não oculta uma função de conversão na classe base, a menos que estejam convertendo para o mesmo tipo.

A função de conversão pode ser uma função membro template, por exemplo, [`std::auto_ptr<T>::operator auto_ptr<Y>`](<#/doc/memory/auto_ptr/operator_auto_ptr>). Veja [template de membro](<#/doc/language/member_template>) e [dedução de argumento de template](<#/doc/language/template_argument_deduction>) para regras especiais aplicáveis.

### Palavras-chave

[`operator`](<#/doc/keyword/operator>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 296](<https://cplusplus.github.io/CWG/issues/296.html>) | C++98 | funções de conversão poderiam ser estáticas | elas não podem ser declaradas estáticas
[CWG 2016](<https://cplusplus.github.io/CWG/issues/2016.html>) | C++98 | funções de conversão não podiam especificar tipos de retorno, mas os tipos estão presentes em conversion-type-id | tipos de retorno não podem ser especificados nos especificadores de declaração de funções de conversão
[CWG 2175](<https://cplusplus.github.io/CWG/issues/2175.html>) | C++11 | não estava claro se o [[noreturn]] em operator int [[noreturn]] (); é analisado como parte de noptr-declarator (de declarator de função) ou conversion-type-id | é analisado como parte de conversion-type-id