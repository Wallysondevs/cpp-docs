# Alias de tipo, template de alias (desde C++11)

Alias de tipo é um nome que se refere a um tipo previamente definido (similar a [`typedef`](<#/doc/language/typedef>)).

Template de alias é um nome que se refere a uma família de tipos.

### Sintaxe

Declarações de alias são [declarações](<#/doc/language/declarations>) com a seguinte sintaxe:

---
`using` identifier attr ﻿(optional) `=` type-id `;` | (1) |
---|---|---
`template` `<` template-parameter-list `>` `using` identifier attr ﻿(optional) `=` type-id `;` | (2) |
`template` `<` template-parameter-list `>` `requires` constraint `using` identifier attr ﻿(optional) `=` type-id `;` | (3) | (desde C++20)
- **attr** — sequência opcional de qualquer número de [atributos](<#/doc/language/attributes>)
- **identifier** — o nome introduzido por esta declaração, que se torna um nome de tipo (1) ou um nome de template (2)
- **template-parameter-list** — [lista de parâmetros de template](<#/doc/language/template_parameters>), como em [declaração de template](<#/doc/language/templates>)
- **constraint** — uma [expressão de restrição](<#/doc/language/constraints>) que restringe os parâmetros de template aceitos por este template de alias
- **type-id** — declarador abstrato ou qualquer outro type-id válido (que pode introduzir um novo tipo, como observado em [type-id](<#/doc/language/type-id>)). O type-id não pode se referir direta ou indiretamente ao identifier. Note que o [ponto de declaração](<#/doc/language/scope>) do identifier está no ponto e vírgula que segue o type-id.

### Explicação

1) Uma declaração de alias de tipo introduz um nome que pode ser usado como sinônimo para o tipo denotado por type-id. Ela não introduz um novo tipo e não pode alterar o significado de um nome de tipo existente. Não há diferença entre uma declaração de alias de tipo e uma declaração [typedef](<#/doc/language/typedef>). Esta declaração pode aparecer em escopo de bloco, escopo de classe ou escopo de namespace.

2) Um template de alias é um template que, quando especializado, é equivalente ao resultado da substituição dos argumentos de template do template de alias pelos parâmetros de template no type-id.
```cpp
    template<class T>
    struct Alloc {};
    
    template<class T>
    using Vec = vector<T, Alloc<T>>; // type-id is vector<T, Alloc<T>>
    
    Vec<int> v; // Vec<int> is the same as vector<int, Alloc<int>>
```

Quando o resultado da especialização de um template de alias é um [template-id](<#/doc/language/templates>) dependente, substituições subsequentes se aplicam a esse template-id:
```cpp
    template<typename...>
    using void_t = void;
    
    template<typename T>
    void_t<typename T::foo> f();
    
    f<int>(); // erro, int não possui um tipo aninhado foo
```

O tipo produzido ao especializar um template de alias não pode usar direta ou indiretamente seu próprio tipo:
```cpp
    template<class T>
    struct A;
    
    template<class T>
    using B = typename A<T>::U; // type-id is A<T>::U
    
    template<class T>
    struct A { typedef B<T> U; };
    
    B<short> b; // erro: B<short> usa seu próprio tipo via A<short>::U
```

Templates de alias nunca são deduzidos por [dedução de argumento de template](<#/doc/language/function_template>) ao deduzir um parâmetro de template template.

Não é possível [especializar parcialmente](<#/doc/language/partial_specialization>) ou [especializar explicitamente](<#/doc/language/template_specialization>) um template de alias.

Assim como qualquer declaração de template, um template de alias só pode ser declarado em escopo de classe ou escopo de namespace.

O tipo de uma [expressão lambda](<#/doc/language/lambda>) que aparece em uma declaração de template de alias é diferente entre as instanciações desse template, mesmo quando a expressão lambda não é dependente.
```cpp
    template<class T>
    using A = decltype([] {}); // A<int> e A<char> referem-se a diferentes tipos de closure
```

| (desde C++20)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_alias_templates`](<#/doc/feature_test>) | [`200704L`](<#/>) | (C++11) | Templates de alias

### Palavras-chave

[`using`](<#/doc/keyword/using>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <type_traits>
    #include <typeinfo>
    
    // alias de tipo, idêntico a
    // typedef std::ios_base::fmtflags flags;
    using flags = std::ios_base::fmtflags;
    // o nome 'flags' agora denota um tipo:
    flags fl = std::ios_base::dec;
    
    // alias de tipo, idêntico a
    // typedef void (*func)(int, int);
    using func = void (*) (int, int);
    
    // o nome 'func' agora denota um ponteiro para função:
    void example(int, int) {}
    func f = example;
    
    // template de alias
    template<class T>
    using ptr = T*;
    // o nome 'ptr<T>' agora é um alias para ponteiro para T
    ptr<int> x;
    
    // alias de tipo usado para ocultar um parâmetro de template
    template<class CharT>
    using mystring = std::basic_string<CharT, std::char_traits<CharT>>;
    
    mystring<char> str;
    
    // alias de tipo pode introduzir um nome typedef de membro
    template<typename T>
    struct Container { using value_type = T; };
    
    // que pode ser usado em programação genérica
    template<typename ContainerT>
    void info(const ContainerT& c)
    {
        typename ContainerT::value_type T;
        std::cout << "ContainerT is `" << typeid(decltype(c)).name() << "`\n"
                     "value_type is `" << typeid(T).name() << "`\n";
    }
    
    // alias de tipo usado para simplificar a sintaxe de std::enable_if
    template<typename T>
    using Invoke = typename T::type;
    
    template<typename Condition>
    using EnableIf = Invoke<std::enable_if<Condition::value>>;
    
    template<typename T, typename = EnableIf<std::is_polymorphic<T>>>
    int fpoly_only(T) { return 1; }
    
    struct S { virtual ~S() {} };
    
    int main()
    {
        Container<int> c;
        info(c); // Container::value_type será int nesta função
    //  fpoly_only(c); // erro: enable_if proíbe isso
        S s;
        fpoly_only(s); // ok: enable_if permite isso
    }
```

Saída possível:
```
    ContainerT is `struct Container<int>`
    value_type is `int`
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[CWG 1558](<https://cplusplus.github.io/CWG/issues/1558.html>) | C++11 | se argumentos não utilizados em uma especialização de alias
participavam da substituição não era especificado | substituição
é realizada

### Veja também

[`typedef` declaration](<#/doc/language/typedef>) | cria um sinônimo para um tipo
---|---
[ `namespace alias` ](<#/doc/language/namespace_alias>) | cria um alias de um namespace existente