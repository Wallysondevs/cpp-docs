# Funções

Funções são entidades C++ que associam uma sequência de [instruções](<#/doc/language/statements>) (um _corpo de função_) a um _nome_ e uma lista de zero ou mais _parâmetros de função_.
```cpp
    // function name: "isodd"
    // parameter list has one parameter, with name "n" and type int
    // the return type is bool
    bool isodd(int n)
    {                 // the body of the function begins
        return n % 2;
    }                 // the body of the function ends
```

Quando uma função é invocada, por exemplo, em uma [expressão de chamada de função](<#/doc/language/operator_other>), os parâmetros são inicializados a partir dos argumentos (fornecidos no local da chamada ou [padronizados](<#/doc/language/default_arguments>)) e as instruções no corpo da função são executadas. Se a [lista de parâmetros](<#/doc/language/function>) terminar com ..., argumentos extras podem ser fornecidos à função; tal função é chamada de [função variádica](<#/doc/language/variadic_arguments>).
```cpp
    int main()
    {
        for (int arg : {-3, -2, -1, 0, 1, 2, 3})
            std::cout << isodd(arg) << ' '; // isodd called 7 times, each
                                            // time n is copy-initialized from arg
    }
```

Nomes de função [não qualificados](<#/doc/language/unqualified_lookup>) em expressões de chamada de função são pesquisados com um conjunto extra de regras chamado ["pesquisa dependente de argumento" (ADL)](<#/doc/language/adl>).

Uma função pode terminar [retornando](<#/doc/language/return>) ou [lançando](<#/doc/language/throw>) uma [exceção](<#/doc/language/exceptions>).

Uma função pode ser uma [coroutine](<#/doc/language/coroutines>), caso em que pode suspender a execução para ser retomada mais tarde. | (desde C++20)

Uma [declaração de função](<#/doc/language/function>) pode aparecer em qualquer escopo, mas uma [definição de função](<#/doc/language/function>) só pode aparecer no escopo de namespace ou, para funções [membro](<#/doc/language/member_functions>) e [friend](<#/doc/language/friend>), no escopo de classe. Uma função declarada no corpo de uma classe sem um especificador friend é uma função membro de classe. Tais funções possuem muitas propriedades adicionais; veja [funções membro](<#/doc/language/member_functions>) para detalhes.

Funções não são objetos: não existem arrays de funções e funções não podem ser passadas por valor ou retornadas de outras funções. Ponteiros e referências a funções (exceto para [a função main](<#/doc/language/main_function>) e [a maioria das funções da biblioteca padrão](<#/doc/language/extending_std>)(desde C++20)) são permitidos e podem ser usados onde as próprias funções não podem. Portanto, dizemos que essas funções são "endereçáveis".

Cada função tem um tipo, que consiste no tipo de retorno da função, nos tipos de todos os parâmetros (após transformações de array para ponteiro e de função para ponteiro, veja [lista de parâmetros](<#/doc/language/function>)), se a função é [`noexcept`](<#/doc/language/noexcept_spec>) ou não(desde C++17), e, para funções membro não estáticas, qualificação cv e qualificação ref(desde C++11). Tipos de função também possuem [ligação de linguagem](<#/doc/language/language_linkage>). Não existem tipos de função cv-qualificados (não confundir com os tipos de [funções cv-qualificadas](<#/doc/language/member_functions>) como int f() const; ou funções que retornam [tipos cv-qualificados](<#/doc/language/cv>), como [std::string](<#/doc/string/basic_string>) const f();). Qualquer qualificador cv é ignorado se for adicionado a um alias para um tipo de função.

Múltiplas funções no mesmo escopo podem ter o mesmo nome, desde que suas listas de parâmetros e, para funções membro não estáticas, qualificações cv/ref(desde C++11) sejam diferentes. Isso é conhecido como [sobrecarga de função](<#/doc/language/overload_resolution>). Declarações de função que diferem apenas no tipo de retorno e na especificação noexcept(desde C++17) não podem ser sobrecarregadas. O [endereço de uma função sobrecarregada](<#/doc/language/overloaded_address>) é determinado de forma diferente.

C++ implementa [funções anônimas](<https://en.wikipedia.org/wiki/anonymous_function> "enwiki:anonymous function") usando [lambda-expressions](<#/doc/language/lambda>). | (desde C++11)

### Objetos de Função

Além de lvalues de função, a expressão de chamada de função suporta ponteiros para funções e qualquer valor de tipo de classe que sobrecarregue o operador de chamada de função ou seja conversível para ponteiro de função (incluindo [lambda-expressions](<#/doc/language/lambda>))(desde C++11). Juntos, esses tipos são conhecidos como [FunctionObjects](<#/doc/named_req/FunctionObject>), e são usados de forma ubíqua em toda a biblioteca padrão C++; veja, por exemplo, os usos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>) e [Compare](<#/doc/named_req/Compare>).

A biblioteca padrão também fornece vários [templates de objetos de função](<#/doc/utility/functional>) predefinidos, bem como métodos para compor novos (incluindo [std::less](<#/doc/utility/functional/less>), [std::mem_fn](<#/doc/utility/functional/mem_fn>), [std::bind](<#/doc/utility/functional/bind>), [std::function](<#/doc/utility/functional/function>)(desde C++11), [std::not_fn](<#/doc/utility/functional/not_fn>)(desde C++17), [std::bind_front](<#/doc/utility/functional/bind_front>)(desde C++20), std::bind_back, std::move_only_function(desde C++23), std::copyable_function, e std::function_ref(desde C++26)).