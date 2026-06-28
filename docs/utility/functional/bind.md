# std::bind

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class F, class... Args >
/* unspecified */ bind( F&& f, Args&&... args );
(constexpr desde C++20)
template< class R, class F, class... Args >
/* unspecified */ bind( F&& f, Args&&... args );
(constexpr desde C++20)
```

O function template `std::bind` gera um wrapper de chamada de encaminhamento para f. Chamar este wrapper é equivalente a invocar f com alguns de seus argumentos [ligados](<#/doc/utility/functional/bind>) a args.

Se [std::is_constructible](<#/doc/types/is_constructible>)<[std::decay](<#/doc/types/decay>)&lt;F&gt;::type, F>::value for falso, ou [std::is_constructible](<#/doc/types/is_constructible>)<[std::decay](<#/doc/types/decay>)<Arg_i>::type, Arg_i>::value for falso para qualquer tipo `Arg_i` em `Args`, o programa é malformado.

Se [std::decay](<#/doc/types/decay>)&lt;Ti&gt;::type ou qualquer tipo em `Args` não for [MoveConstructible](<#/doc/named_req/MoveConstructible>) ou [Destructible](<#/doc/named_req/Destructible>), o comportamento é indefinido.

### Parâmetros

- **f** — Objeto [Callable](<#/doc/named_req/Callable>) (objeto de função, ponteiro para função, referência para função, ponteiro para função membro, ou ponteiro para membro de dados) que será ligado a alguns argumentos
- **args** — lista de argumentos para ligar, com os argumentos não ligados substituídos pelos [placeholders](<#/doc/utility/functional/placeholders>) _1, _2, _3... do namespace `std::placeholders`

### Valor de retorno

Um objeto de função g de tipo não especificado `T`, para o qual [std::is_bind_expression](<#/doc/utility/functional/is_bind_expression>)&lt;T&gt;::value é verdadeiro. Ele possui os seguintes membros:

## std::bind _tipo de retorno_

#### Objetos membro

O tipo de retorno de `std::bind` contém um objeto membro do tipo [std::decay](<#/doc/types/decay>)&lt;F&gt;::type construído a partir de [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), e um objeto para cada um dos args..., do tipo [std::decay](<#/doc/types/decay>)<Arg_i>::type, similarmente construído a partir de [std::forward](<#/doc/utility/forward>)<Arg_i>(arg_i).

#### Construtores

O tipo de retorno de `std::bind` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) se todos os seus objetos membro (especificados acima) forem CopyConstructible, e é [MoveConstructible](<#/doc/named_req/MoveConstructible>) caso contrário. O tipo define os seguintes membros:

#### Tipo membro `result_type`

1) (obsoleto em C++17) Se `F` é um ponteiro para função ou um ponteiro para função membro, `result_type` é o tipo de retorno de `F`. Se `F` é um tipo de classe com typedef aninhado `result_type`, então `result_type` é `F::result_type`. Caso contrário, nenhum `result_type` é definido. 2) (obsoleto em C++17) `result_type` é exatamente `R`. | (até C++20)

#### Função membro `operator()`

Quando g é invocado em uma expressão de chamada de função g(u1, u2, ... uM), uma invocação do objeto armazenado ocorre, como se por

1) [`_INVOKE_`](<#/doc/utility/functional>)(fd, [std::forward](<#/doc/utility/forward>)&lt;V1&gt;(v1), [std::forward](<#/doc/utility/forward>)&lt;V2&gt;(v2), ..., [std::forward](<#/doc/utility/forward>)&lt;VN&gt;(vN)), ou

2) [`_INVOKE <R>_`](<#/doc/utility/functional>)(fd, [std::forward](<#/doc/utility/forward>)&lt;V1&gt;(v1), [std::forward](<#/doc/utility/forward>)&lt;V2&gt;(v2), ..., [std::forward](<#/doc/utility/forward>)&lt;VN&gt;(vN)),

onde fd é um valor do tipo [std::decay](<#/doc/types/decay>)&lt;F&gt;::type, os valores e tipos dos argumentos ligados v1`, `v2`, ..., `vN são determinados conforme especificado [abaixo](<#/doc/utility/functional/bind>).

Se alguns dos argumentos fornecidos na chamada para g() não forem correspondidos por nenhum placeholder armazenado em g, os argumentos não utilizados são avaliados e descartados.

Uma invocação de operator() é [non-throwing](<#/doc/language/noexcept>) ou é uma [constant subexpression](<#/doc/language/constant_expression>)(desde C++20) se e somente se a operação `_INVOKE_` subjacente também for. operator() participa da resolução de sobrecarga apenas se a operação `_INVOKE_` for bem-formada quando tratada como um operando não avaliado.

Se g for qualificado como [volatile](<#/doc/language/cv>), o programa é malformado.

Se [`_INVOKE_`](<#/doc/utility/functional>)(fd, w1, w2, ..., wN) nunca puder ser uma expressão válida para quaisquer valores possíveis w1`, `w2`, ..., `wN, o comportamento é indefinido.

### Argumentos ligados

Para cada argumento armazenado arg_i, o argumento ligado correspondente v_i na operação [`_INVOKE_`](<#/doc/utility/functional>) ou [`_INVOKE <R>_`](<#/doc/utility/functional>) é determinado da seguinte forma:

#### Caso 1: wrappers de referência

Se arg_i é do tipo [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;T&gt; (por exemplo, [std::ref](<#/doc/utility/functional/ref>) ou [std::cref](<#/doc/utility/functional/ref>) foi usado na chamada inicial para `std::bind`), então v_i é arg_i.get() e seu tipo `V_i` é `T&`: o argumento armazenado é passado por referência para o objeto de função invocado.

#### Caso 2: expressões bind

Se arg_i é do tipo `T` para o qual [std::is_bind_expression](<#/doc/utility/functional/is_bind_expression>)&lt;T&gt;::value é verdadeiro (por exemplo, outra expressão `std::bind` foi passada diretamente na chamada inicial para `std::bind`), então `std::bind` realiza composição de função: em vez de passar o objeto de função que a subexpressão bind retornaria, a subexpressão é invocada ansiosamente, e seu valor de retorno é passado para o objeto invocável externo. Se a subexpressão bind tiver quaisquer argumentos placeholder, eles são compartilhados com o bind externo (escolhidos de u1`, `u2`, ...`). Especificamente, v_i é arg_i([std::forward](<#/doc/utility/forward>)&lt;Uj&gt;(uj)...) e seu tipo `V_i` é [std::result_of](<#/doc/types/result_of>)&lt;T _cv_ ﻿&(Uj&&...)&gt;::type&&(até C++17)[std::invoke_result_t](<#/doc/types/result_of>)&lt;T _cv_ ﻿&, Uj&&...&gt;&&(desde C++17) (a qualificação cv é a mesma de g).

#### Caso 3: placeholders

Se arg_i é do tipo `T`, para o qual [std::is_placeholder](<#/doc/utility/functional/is_placeholder>)&lt;T&gt;::value não é ​0​ (significando que um placeholder como `std::placeholders::_1, _2, _3, ...` foi usado como argumento para a chamada inicial para `std::bind`), então o argumento indicado pelo placeholder (u1 para _1, u2 para _2, etc) é passado para o objeto invocável: v_i é [std::forward](<#/doc/utility/forward>)&lt;Uj&gt;(uj) e seu tipo `V_i` é `Uj&&`.

#### Caso 4: argumentos ordinários

Caso contrário, arg_i é passado para o objeto invocável como argumento lvalue: v_i é simplesmente arg_i e seu tipo `V_i` é `T` _cv_ ﻿`&`, onde _cv_ é a mesma qualificação cv de g.

### Exceções

Somente lança exceções se a construção de [std::decay](<#/doc/types/decay>)&lt;F&gt;::type a partir de [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f) lançar exceções, ou se qualquer um dos construtores para [std::decay](<#/doc/types/decay>)<Arg_i>::type a partir do correspondente [std::forward](<#/doc/utility/forward>)<Arg_i>(arg_i) lançar exceções, onde `Arg_i` é o i-ésimo tipo e arg_i é o i-ésimo argumento em `Args... args`.

### Observações

Conforme descrito em [Callable](<#/doc/named_req/Callable>), ao invocar um ponteiro para função membro não estática ou ponteiro para membro de dados não estático, o primeiro argumento deve ser uma referência ou ponteiro (incluindo, possivelmente, smart pointer como [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::unique_ptr](<#/doc/memory/unique_ptr>)) para um objeto cujo membro será acessado.

Os argumentos para bind são copiados ou movidos, e nunca são passados por referência a menos que estejam envolvidos em [std::ref](<#/doc/utility/functional/ref>) ou [std::cref](<#/doc/utility/functional/ref>).

Placeholders duplicados na mesma expressão bind (múltiplos _1, por exemplo) são permitidos, mas os resultados são bem definidos apenas se o argumento correspondente (u1) for um lvalue ou um rvalue não movível.

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <memory>
    #include <random>
    
    void f(int n1, int n2, int n3, const int& n4, int n5)
    {
        std::cout << n1 << ' ' << n2 << ' ' << n3 << ' ' << n4 << ' ' << n5 << '\n';
    }
    
    int g(int n1)
    {
        return n1;
    }
    
    struct Foo
    {
        void print_sum(int n1, int n2)
        {
            std::cout << n1 + n2 << '\n';
        }
    
        int data = 10;
    };
    
    int main()
    {
        using namespace std::placeholders;  // for _1, _2, _3...
    
        std::cout << "1) argument reordering and pass-by-reference: ";
        int n = 7;
        // (_1 e _2 são de std::placeholders, e representam futuros
        // argumentos que serão passados para f1)
        auto f1 = std::bind(f, _2, 42, _1, std::cref(n), n);
        n = 10;
        f1(1, 2, 1001); // 1 é ligado por _1, 2 é ligado por _2, 1001 não é usado
                        // faz uma chamada para f(2, 42, 1, n, 7)
    
        std::cout << "2) achieving the same effect using a lambda: ";
        n = 7;
        auto lambda = &ncref = n, n
        {
            f(b, 42, a, ncref, n);
        };
        n = 10;
        lambda(1, 2, 1001); // o mesmo que uma chamada para f1(1, 2, 1001)
    
        std::cout << "3) nested bind subexpressions share the placeholders: ";
        auto f2 = std::bind(f, _3, std::bind(g, _3), _3, 4, 5);
        f2(10, 11, 12); // faz uma chamada para f(12, g(12), 12, 4, 5);
    
        std::cout << "4) bind a RNG with a distribution: ";
        std::default_random_engine e;
        std::uniform_int_distribution<> d(0, 10);
        auto rnd = std::bind(d, e); // uma cópia de e é armazenada em rnd
        for (int n = 0; n < 10; ++n)
            std::cout << rnd() << ' ';
        std::cout << '\n';
    
        std::cout << "5) bind to a pointer to member function: ";
        Foo foo;
        auto f3 = std::bind(&Foo::print_sum, &foo, 95, _1);
        f3(5);
    
        std::cout << "6) bind to a mem_fn that is a pointer to member function: ";
        auto ptr_to_print_sum = std::mem_fn(&Foo::print_sum);
        auto f4 = std::bind(ptr_to_print_sum, &foo, 95, _1);
        f4(5);
    
        std::cout << "7) bind to a pointer to data member: ";
        auto f5 = std::bind(&Foo::data, _1);
        std::cout << f5(foo) << '\n';
    
        std::cout << "8) bind to a mem_fn that is a pointer to data member: ";
        auto ptr_to_data = std::mem_fn(&Foo::data);
        auto f6 = std::bind(ptr_to_data, _1);
        std::cout << f6(foo) << '\n';
    
        std::cout << "9) use smart pointers to call members of the referenced objects: ";
        std::cout << f6(std::make_shared<Foo>(foo)) << ' '
                  << f6(std::make_unique<Foo>(foo)) << '\n';
    }
```

Saída:
```
    1) argument reordering and pass-by-reference: 2 42 1 10 7
    2) achieving the same effect using a lambda: 2 42 1 10 7
    3) nested bind subexpressions share the placeholders: 12 12 12 4 5
    4) bind a RNG with a distribution: 0 1 8 5 5 2 0 7 7 10 
    5) bind to a pointer to member function: 100
    6) bind to a mem_fn that is a pointer to member function: 100
    7) bind to a pointer to data member: 10
    8) bind to a mem_fn that is a pointer to data member: 10
    9) use smart pointers to call members of the referenced objects: 10 10
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 2021](<https://cplusplus.github.io/LWG/issue2021>) | C++11 | 1. os argumentos ligados
não eram encaminhados para fd
2. no caso 2, o tipo de `V_i` era
[std::result_of](<#/doc/types/result_of>)&lt;T _cv_ ﻿(Uj...)&gt;::type | 1. encaminhado
2. alterado para
[std::result_of](<#/doc/types/result_of>)&lt;T _cv_ ﻿&(Uj&&...)&gt;::type&&

### Veja também

[ bind_frontbind_back](<#/doc/utility/functional/bind_front>)(C++20)(C++23) | liga um número variável de argumentos, em ordem, a um objeto de função
(function template)
[ _1, _2, _3, _4, ...](<#/doc/utility/functional/placeholders>)(C++11) | placeholders para os argumentos não ligados em uma expressão `std::bind`
(constante)
[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para um membro
(function template)