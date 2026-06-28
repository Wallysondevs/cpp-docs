# Atributo C++: deprecated (desde C++14)

Indica que o nome ou entidade declarada com este atributo está [obsoleta](<https://en.wikipedia.org/wiki/Deprecation> "enwiki:Deprecation"), ou seja, o uso é permitido, mas desencorajado por alguma razão.

### Sintaxe

---
`[[deprecated]]` | (1) |
---|---|---
`[[deprecated(` string-literal `)]]` | (2) |
- **string-literal** — um [literal de string não avaliado](<#/doc/language/string_literal>) que pode ser usado para explicar a razão da obsolescência e/ou para sugerir uma entidade de substituição

### Explicação

Indica que o uso do nome ou entidade declarada com este atributo é permitido, mas desencorajado por alguma razão. Compiladores tipicamente emitem avisos sobre tais usos. O literal de string, se especificado, é geralmente incluído nos avisos.

Este atributo é permitido em declarações dos seguintes nomes ou entidades:

  * [class/struct/union](<#/doc/language/classes>), por exemplo, struct [[deprecated]] S;,
  * [typedef-name](<#/doc/language/typedef>), incluindo aqueles declarados por [alias declaration](<#/doc/language/type_alias>), por exemplo,

    

  * [[deprecated]] typedef S* PS;,
  * using PS [[deprecated]] = S*;,

  * variável (não-membro), por exemplo, [[deprecated]] int x;,
  * [membro de dados estático](<#/doc/language/static>), por exemplo, struct S { [[deprecated]] static constexpr char CR{13}; };,
  * [membro de dados não estático](<#/doc/language/data_members>), por exemplo, union U { [[deprecated]] int n; };,
  * [função](<#/doc/language/function>), por exemplo, [[deprecated]] void f();,
  * [namespace](<#/doc/language/namespace>), por exemplo, namespace [[deprecated]] NS { int x; },
  * [enumeração](<#/doc/language/enum>), por exemplo, enum [[deprecated]] E {};,

  * enumerador, por exemplo, enum { A [[deprecated]], B [[deprecated]] = 42 };,

| (desde C++17)

  * [especialização de template](<#/doc/language/template_specialization>), por exemplo, template<> struct [[deprecated]] X&lt;int&gt; {};.

Um nome declarado não-obsoleto pode ser redeclarado como obsoleto. Um nome declarado obsoleto não pode ser tornado não-obsoleto ao redeclará-lo sem este atributo.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    [[deprecated]]
    void TriassicPeriod()
    {
        std::clog << "Triassic Period: [251.9 - 208.5] million years ago.\n";
    }
    
    [[deprecated("Use NeogenePeriod() instead.")]]
    void JurassicPeriod()
    {
        std::clog << "Jurassic Period: [201.3 - 152.1] million years ago.\n";
    }
    
    [[deprecated("Use calcSomethingDifferently(int).")]]
    int calcSomething(int x)
    {
        return x * 2;
    }
    
    int main()
    {
        TriassicPeriod();
        JurassicPeriod();
    }
```

Saída possível:
```
    Triassic Period: [251.9 - 208.5] million years ago.
    Jurassic Period: [201.3 - 152.1] million years ago.
    
    main.cpp:20:5: warning: 'TriassicPeriod' is deprecated [-Wdeprecated-declarations]
        TriassicPeriod();
        ^
    main.cpp:3:3: note: 'TriassicPeriod' has been explicitly marked deprecated here
    [[deprecated]]
      ^
    main.cpp:21:5: warning: 'JurassicPeriod' is deprecated: Use NeogenePeriod() instead ⮠
     [-Wdeprecated-declarations]
        JurassicPeriod();
        ^
    main.cpp:8:3: note: 'JurassicPeriod' has been explicitly marked deprecated here
    [[deprecated("Use NeogenePeriod() instead")]]
      ^
    2 warnings generated.
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 9.12.5 Atributo deprecated [dcl.attr.deprecated]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 9.12.4 Atributo deprecated [dcl.attr.deprecated]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 10.6.4 Atributo deprecated [dcl.attr.deprecated]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 7.6.5 Atributo deprecated [dcl.attr.deprecated]

### Veja também

[Documentação C](<#/>) para deprecated
---