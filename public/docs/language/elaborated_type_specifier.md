# Especificador de tipo elaborado

Especificadores de tipo elaborado podem ser usados para se referir a um nome de classe previamente declarado (class, struct, ou union) ou a um nome de enum previamente declarado, mesmo que o nome tenha sido [ocultado por uma declaração não-tipo](<#/doc/language/lookup>). Eles também podem ser usados para declarar novos nomes de classe.

### Sintaxe

---
class-key class-name | (1) |
---|---|---
`enum` enum-name | (2) |
class-key attr ﻿(optional) identifier `;` | (3) |
- **class-key** — uma de [class](<#/doc/keyword/class>), [struct](<#/doc/keyword/struct>), [union](<#/doc/keyword/union>)
- **class-name** — o nome de um tipo de classe previamente declarado, opcionalmente [qualificado](<#/doc/language/name>), ou um identificador não declarado previamente como um nome de tipo
- **enum-name** — o nome de um tipo de enumeração previamente declarado, opcionalmente [qualificado](<#/doc/language/name>)
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)

1) Especificador de tipo elaborado para um tipo de classe.

2) Especificador de tipo elaborado para um tipo de enumeração.

3) Uma declaração que consiste unicamente de um especificador de tipo elaborado sempre declara um tipo de classe nomeado pelo identificador no [escopo](<#/doc/language/scope>) que contém a declaração.

[Declaração de enum opaca](<#/doc/language/enum>) se assemelha à forma (3), mas o tipo enum é um tipo completo após uma declaração de enum opaca.

### Explicação

A forma (3) é um caso especial de especificador de tipo elaborado, geralmente referido como _declaração antecipada_ de classes; para a descrição da forma (3), veja [Declaração antecipada](<#/doc/language/class>). O seguinte se aplica apenas às formas (1) e (2).

O class-name ou enum-name no especificador de tipo elaborado pode ser um identificador simples ou um [qualified-id](<#/doc/language/name>). O nome é procurado usando [unqualified name lookup](<#/doc/language/unqualified_lookup>) ou [qualified name lookup](<#/doc/language/qualified_lookup>), dependendo de sua aparência. Mas em ambos os casos, nomes não-tipo não são considerados.
```cpp
    class T
    {
    public:
        class U;
    private:
        int U;
    };
    
    int main()
    {
        int T;
        T t; // erro: a variável local T é encontrada
        class T t; // OK: encontra ::T, a variável local T é ignorada
        T::U* u; // erro: a procura por T::U encontra o membro de dados privado
        class T::U* u; // OK: o membro de dados é ignorado
    }
```

Se a procura de nome não encontrar um nome de tipo previamente declarado, o elaborated-type-specifier é introduzido por `class`, `struct`, ou `union` (ou seja, não por `enum`), e class-name é um identificador não qualificado, então o elaborated-type-specifier é uma declaração de classe do class-name.
```cpp
    template<typename T>
    struct Node
    {
        struct Node* Next; // OK: a procura por Node encontra o injected-class-name
        struct Data* Data; // OK: declara o tipo Data no escopo global
                           // e também declara o membro de dados Data
        friend class ::List; // erro: não pode introduzir um nome qualificado
        enum Kind* kind; // erro: não pode introduzir um enum
    };
    
    Data* p; // OK: struct Data foi declarado
```

Se o nome se refere a um [typedef name](<#/doc/language/typedef>), um [type alias](<#/doc/language/type_alias>), um [template type parameter](<#/doc/language/template_parameters>), ou uma [alias template specialization](<#/doc/language/type_alias>), o programa é malformado; caso contrário, o especificador de tipo elaborado introduz o nome na declaração da mesma forma que um [simple type specifier](<#/doc/language/declarations>) introduz seu type-name.
```cpp
    template<typename T>
    class Node
    {
        friend class T; // erro: parâmetro de tipo não pode aparecer em um especificador de tipo elaborado;
                        // note que uma declaração similar `friend T;` está OK.
    };
    
    class A {};
    enum b { f, t };
    
    int main()
    {
        class A a; // OK: equivalente a 'A a;'
        enum b flag; // OK: equivalente a 'b flag;'
    }
```

A class-key ou a palavra-chave `enum` presente no elaborated-type-specifier deve concordar em tipo com a declaração à qual o nome no elaborated-type-specifier se refere.

*   a palavra-chave `enum` deve ser usada para se referir a um [tipo de enumeração](<#/doc/language/enum>) (seja com escopo ou sem escopo)
*   a class-key `union` deve ser usada para se referir a uma [union](<#/doc/language/union>)
*   a class-key `class` ou `struct` deve ser usada para se referir a um tipo de classe não-union (as palavras-chave `class` e `struct` são intercambiáveis aqui).

```cpp
    enum class E { a, b };
    enum E x = E::a; // OK
    enum class E y = E::b; // erro: 'enum class' não pode introduzir um especificador de tipo elaborado
    
    struct A {};
    class A a; // OK
```

Quando usado como um [template argument](<#/doc/language/template_parameters>), class T é um parâmetro de tipo de template nomeado `T`, não um parâmetro não-tipo sem nome cujo tipo `T` é introduzido por um especificador de tipo elaborado.

### Palavras-chave

[`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>), [`union`](<#/doc/keyword/union>), [`enum`](<#/doc/keyword/enum>)

### Referências

*   C++23 standard (ISO/IEC 14882:2024):
    *   6.5.6 Elaborated type specifiers [basic.lookup.elab]
    *   9.2.9.4 Elaborated type specifiers [dcl.type.elab]
*   C++20 standard (ISO/IEC 14882:2020):
    *   6.5.4 Elaborated type specifiers [basic.lookup.elab]
    *   9.2.8.3 Elaborated type specifiers [dcl.type.elab]
*   C++17 standard (ISO/IEC 14882:2017):
    *   6.4.4 Elaborated type specifiers [basic.lookup.elab]
    *   10.1.7.3 Elaborated type specifiers [dcl.type.elab]
*   C++14 standard (ISO/IEC 14882:2014):
    *   3.4.4 Elaborated type specifiers [basic.lookup.elab]
    *   7.1.6.3 Elaborated type specifiers [dcl.type.elab]
*   C++11 standard (ISO/IEC 14882:2011):
    *   3.4.4 Elaborated type specifiers [basic.lookup.elab]
    *   7.1.6.3 Elaborated type specifiers [dcl.type.elab]
*   C++98 standard (ISO/IEC 14882:1998):
    *   3.4.4 Elaborated type specifiers [basic.lookup.elab]
    *   7.1.5.3 Elaborated type specifiers [dcl.type.elab]

| Esta seção está incompleta
Razão: provavelmente extrair a maior parte de 9.1[class.name]/2-3 de cpp/language/class