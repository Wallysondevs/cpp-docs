# operador noexcept (desde C++11)

O operador noexcept realiza uma verificação em tempo de compilação que retorna true se uma expressão for declarada para não lançar nenhuma exceção.

Ele pode ser usado dentro do [especificador noexcept](<#/doc/language/noexcept_spec>) de um template de função para declarar que a função lançará exceções para alguns tipos, mas não para outros.

### Sintaxe

---
`noexcept(` expression `)`
---

Retorna um [prvalue](<#/doc/language/value_category>) do tipo bool. O resultado é true se o conjunto de [exceções potenciais](<#/doc/language/except_spec>) da expressão for vazio (até C++17) a expressão for especificada como [não lançadora](<#/doc/language/noexcept_spec>) (desde C++17), e false caso contrário.

expression é um [operando não avaliado](<#/doc/language/expressions>).

Se expression for um prvalue, a [materialização temporária](<#/doc/language/implicit_cast>) é aplicada. | (desde C++17)

### Notas

Mesmo que noexcept(expr) seja true, uma avaliação de expr ainda pode lançar uma exceção como resultado de encontrar comportamento indefinido.

Se expression for de um tipo de classe ou um array (possivelmente multidimensional) dele, a materialização temporária requer que o destrutor não seja deletado e seja acessível. | (desde C++17)

### Palavras-chave

[`noexcept`](<#/doc/keyword/noexcept>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <utility>
    #include <vector>
    
    void may_throw();
    void no_throw() noexcept;
    auto lmay_throw = []{};
    auto lno_throw =  noexcept {};
    
    class T
    {
    public:
        ~T(){} // dtor prevents move ctor
               // copy ctor is noexcept
    };
    
    class U
    {
    public:
        ~U(){} // dtor prevents move ctor
               // copy ctor is noexcept(false)
        std::vector<int> v;
    };
    
    class V
    {
    public:
        std::vector<int> v;
    };
    
    int main()
    {
        T t;
        U u;
        V v;
    
        std::cout << std::boolalpha <<
            "may_throw() is noexcept(" << noexcept(may_throw()) << ")\n"
            "no_throw() is noexcept(" << noexcept(no_throw()) << ")\n"
            "lmay_throw() is noexcept(" << noexcept(lmay_throw()) << ")\n"
            "lno_throw() is noexcept(" << noexcept(lno_throw()) << ")\n"
            "~T() is noexcept(" << noexcept(std::declval<T>().~T()) << ")\n"
            // note: the following tests also require that ~T() is noexcept because
            // the expression within noexcept constructs and destroys a temporary
            "T(rvalue T) is noexcept(" << noexcept(T(std::declval<T>())) << ")\n"
            "T(lvalue T) is noexcept(" << noexcept(T(t)) << ")\n"
            "U(rvalue U) is noexcept(" << noexcept(U(std::declval<U>())) << ")\n"
            "U(lvalue U) is noexcept(" << noexcept(U(u)) << ")\n"
            "V(rvalue V) is noexcept(" << noexcept(V(std::declval<V>())) << ")\n"
            "V(lvalue V) is noexcept(" << noexcept(V(v)) << ")\n";
    }
```

Saída:
```
    may_throw() is noexcept(false)
    no_throw() is noexcept(true)
    lmay_throw() is noexcept(false)
    lno_throw() is noexcept(true)
    ~T() is noexcept(true)
    T(rvalue T) is noexcept(true)
    T(lvalue T) is noexcept(true)
    U(rvalue U) is noexcept(false)
    U(lvalue U) is noexcept(false)
    V(rvalue V) is noexcept(true)
    V(lvalue V) is noexcept(false)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 2722](<https://cplusplus.github.io/CWG/issues/2722.html>) | C++17 | não estava claro se a materialização temporária é aplicada se expression for um prvalue | ela é aplicada neste caso
[CWG 2792](<https://cplusplus.github.io/CWG/issues/2792.html>) | C++11 | o operador noexcept era exigido para determinar se exceções poderiam ser lançadas no caso de encontrar comportamento indefinido | não exigido

### Veja também

[`noexcept` specifier](<#/doc/language/noexcept_spec>)(C++11) | especifica se uma função pode lançar exceções
---|---
[Especificação de exceção dinâmica](<#/doc/language/except_spec>)(até C++17) | especifica quais exceções são lançadas por uma função (obsoleto em C++11)