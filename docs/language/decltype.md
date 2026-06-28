# especificador decltype (desde C++11)

Inspeciona o tipo declarado de uma entidade ou o tipo e a categoria de valor de uma expressão.

### Sintaxe

---
```cpp
`decltype (` entity `)`  // (1)
`decltype (` expression `)`  // (2)
```

### Explicação

1) Se o argumento for uma [id-expression](<#/doc/language/name>) não-parentesizada ou uma expressão de [acesso a membro de classe](<#/doc/language/operator_member_access>) não-parentesizada, então decltype produz o tipo da entidade nomeada por esta expressão. Se não houver tal entidade, ou se o argumento nomear um conjunto de funções sobrecarregadas, o programa é malformado. Se o argumento for uma [id-expression](<#/doc/language/name>) não-parentesizada que nomeia um [structured binding](<#/doc/language/structured_binding>), então decltype produz o _tipo referenciado_ (descrito na especificação da declaração de structured binding). | (desde C++17)
```cpp
Se o argumento for uma id-expression não-parentesizada que nomeia um parâmetro de template não-tipo, então decltype produz o tipo do parâmetro de template (após realizar qualquer dedução de tipo necessária se o parâmetro de template for declarado com um tipo placeholder). O tipo é não-const mesmo que a entidade seja um objeto de parâmetro de template (que é um objeto const).  // (desde C++20)
```

2) Se o argumento for qualquer outra expressão do tipo `T`, e

a) se a [categoria de valor](<#/doc/language/value_category>) da expressão for [_xvalue_](<#/doc/language/value_category>), então decltype produz T&&;

b) se a categoria de valor da expressão for [_lvalue_](<#/doc/language/value_category>), então decltype produz T&;

```cpp
c) se a categoria de valor da expressão for _prvalue_, então decltype produz T. Se a expressão for uma chamada de função que retorna um prvalue de tipo de classe ou for uma expressão de vírgula cujo operando direito é tal chamada de função, um objeto temporário não é introduzido para esse prvalue.  // (até C++17)
Se a expressão for um prvalue diferente de uma invocação imediata (possivelmente parentesizada) (desde C++20), um objeto temporário não é materializado a partir desse prvalue: tal prvalue não tem objeto de resultado.  // (desde C++17)
Como nenhum objeto temporário é criado, o tipo não precisa ser completo ou ter um destrutor disponível, e pode ser abstrato. Esta regra não se aplica a subexpressões: em decltype(f(g())), g() deve ter um tipo completo, mas f() não precisa.
```

Note que se o nome de um objeto for parentesizado, ele é tratado como uma expressão lvalue comum, portanto decltype(x) e decltype((x)) são frequentemente tipos diferentes.

`decltype` é útil ao declarar tipos que são difíceis ou impossíveis de declarar usando a notação padrão, como tipos relacionados a lambdas ou tipos que dependem de parâmetros de template.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_decltype`](<#/doc/feature_test>) | [`200707L`](<#/>) | (C++11) | decltype

### Palavras-chave

[`decltype`](<#/doc/keyword/decltype>)

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <iostream>
    #include <type_traits>
    
    struct A { double x; };
    const A* a;
    
    decltype(a->x) y;       // type of y is double (declared type)
    decltype((a->x)) z = y; // type of z is const double& (lvalue expression)
    
    template<typename T, typename U>
    auto add(T t, U u) -> decltype(t + u) // return type depends on template parameters
                                          // return type can be deduced since C++14
    {
        return t + u;
    }
    
    const int& getRef(const int* p) { return *p; }
    static_assert(std::is_same_v<decltype(getRef), const int&(const int*)>);
    auto getRefFwdBad(const int* p) { return getRef(p); }
    static_assert(std::is_same_v<decltype(getRefFwdBad), int(const int*)>,
        "Just returning auto isn't perfect forwarding.");
    decltype(auto) getRefFwdGood(const int* p) { return getRef(p); }
    static_assert(std::is_same_v<decltype(getRefFwdGood), const int&(const int*)>,
        "Returning decltype(auto) perfectly forwards the return type.");
    
    // Alternatively:
    auto getRefFwdGood1(const int* p) -> decltype(getRef(p)) { return getRef(p); }
    static_assert(std::is_same_v<decltype(getRefFwdGood1), const int&(const int*)>,
        "Returning decltype(return expression) also perfectly forwards the return type.");
    
    int main()
    {
        int i = 33;
        decltype(i) j = i * 2;
        static_assert(std::is_same_v<decltype(i), decltype(j)>);
        assert(i == 33 && 66 == j);
    
        auto f = i -> int { return av * bv + i; };
        auto h = i -> int { return av * bv + i; };
        static_assert(!std::is_same_v<decltype(f), decltype(h)>,
            "The type of a lambda function is unique and unnamed");
    
        decltype(f) g = f;
        std::cout << f(3, 3) << ' ' << g(3, 3) << '\n';
    }
```

Output:
```
    42 42
```

### Referências

Conteúdo estendido
---

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   9.2.9.5 Especificadores decltype [dcl.type.decltype]
*   Padrão C++20 (ISO/IEC 14882:2020):

    *   9.2.8.4 Especificadores decltype [dcl.type.decltype]
*   Padrão C++17 (ISO/IEC 14882:2017):

    *   TBD Especificadores decltype [dcl.type.decltype]
*   Padrão C++14 (ISO/IEC 14882:2014):

    *   TBD Especificadores decltype [dcl.type.decltype]
*   Padrão C++11 (ISO/IEC 14882:2011):

    *   TBD Especificadores decltype [dcl.type.decltype]

| Esta seção está incompleta
Razão: Requer correção. Veja: [Discussão: Referências Erradas](<https://en.cppreference.com/w/Talk:cpp/language/decltype#Wrong_References> "Talk:cpp/language/decltype").

### Veja também

[ especificador `auto` ](<#/doc/language/auto>)(C++11) | especifica um tipo deduzido de uma expressão
---|---
[ declval](<#/doc/utility/declval>)(C++11) | obtém uma referência a um objeto do argumento de tipo do template para uso em um contexto não avaliado
(template de função)
[ is_same](<#/doc/types/is_same>)(C++11) | verifica se dois tipos são os mesmos
(template de classe)
[Documentação C](<#/>) para typeof
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão