# std::move_only_function

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class... >
class move_only_function; // não definido
template< class R, class... Args >
class move_only_function<R(Args...)>;
template< class R, class... Args >
class move_only_function<R(Args...) noexcept>;
template< class R, class... Args >
class move_only_function<R(Args...) &>;
template< class R, class... Args >
class move_only_function<R(Args...) & noexcept>;
template< class R, class... Args >
class move_only_function<R(Args...) &&>;
template< class R, class... Args >
class move_only_function<R(Args...) && noexcept>;
template< class R, class... Args >
class move_only_function<R(Args...) const>;
template< class R, class... Args >
class move_only_function<R(Args...) const noexcept>;
template< class R, class... Args >
class move_only_function<R(Args...) const &>;
template< class R, class... Args >
class move_only_function<R(Args...) const & noexcept>;
template< class R, class... Args >
class move_only_function<R(Args...) const &&>;
template< class R, class... Args >
class move_only_function<R(Args...) const && noexcept>;
```

O template de classe `std::move_only_function` é um wrapper de função polimórfico de propósito geral. Objetos `std::move_only_function` podem armazenar e invocar qualquer _target_ [Callable](<#/doc/named_req/Callable>) construtível (não é exigido que seja move constructible) — funções, [expressões lambda](<#/doc/language/lambda>), [expressões bind](<#/doc/utility/functional/bind>), ou outros objetos de função, bem como ponteiros para funções membro e ponteiros para objetos membro.

O objeto callable armazenado é chamado de _target_ de `std::move_only_function`. Se um `std::move_only_function` não contém um target, ele é chamado de _vazio_. Ao contrário de [std::function](<#/doc/utility/functional/function>), invocar um `std::move_only_function` _vazio_ resulta em comportamento indefinido.

`std::move_only_function`s suporta todas as combinações possíveis de [cv-qualifiers](<#/doc/language/member_functions>) (não incluindo volatile), [ref-qualifiers](<#/doc/language/member_functions>), e [noexcept-specifiers](<#/doc/language/noexcept_spec>) fornecidas em seu parâmetro de template. Esses qualifiers e specifier (se houver) são adicionados ao seu [`operator()`](<#/>).

`std::move_only_function` satisfaz os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>), mas não satisfaz [CopyConstructible](<#/doc/named_req/CopyConstructible>) ou [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Member types

Tipo | Definição
---|---
`result_type` | `R`

### Member functions

[ (construtor)](<#/doc/utility/functional/move_only_function/move_only_function>) | constrói um novo objeto `std::move_only_function`
(função membro pública)
[ (destrutor)](<#/doc/utility/functional/move_only_function/~move_only_function>) | destrói um objeto `std::move_only_function`
(função membro pública)
[ operator=](<#/>) | substitui ou destrói o target
(função membro pública)
[ swap](<#/doc/utility/functional/move_only_function/swap>) | troca os targets de dois objetos `std::move_only_function`
(função membro pública)
[ operator bool](<#/doc/utility/functional/move_only_function/operator_bool>) | verifica se o `std::move_only_function` possui um target
(função membro pública)
[ operator()](<#/>) | invoca o target
(função membro pública)

### Non-member functions

[ swap(std::move_only_function)](<#/doc/utility/functional/move_only_function/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ operator==](<#/>)(C++23) | compara um `std::move_only_function` com nullptr
(função)

### Notes

Implementações podem armazenar um objeto callable de tamanho pequeno dentro do objeto `std::move_only_function`. Tal otimização de objeto pequeno é efetivamente exigida para ponteiros de função e especializações de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), e só pode ser aplicada a tipos `T` para os quais [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; é verdadeiro.

Se um `std::move_only_function` que retorna uma referência é inicializado a partir de uma função ou objeto de função que retorna um prvalue (incluindo uma expressão lambda sem um trailing-return-type), o programa é malformado porque vincular a referência retornada a um objeto temporário é proibido. Veja também as Notas de [`std::function`](<#/doc/utility/functional/function>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_move_only_function`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | `std::move_only_function`

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <future>
    #include <iostream>
    
    int main()
    {
        std::packaged_task<double()> packaged_task({ return 3.14159; });
    
        std::future<double> future = packaged_task.get_future();
    
        auto lambda = task = std::move(packaged_task) mutable { task(); };
    
    //  std::function<void()> function = std::move(lambda); // Error
        std::move_only_function<void()> function = std::move(lambda); // OK
    
        function();
    
        std::cout << future.get();
    }
```

Saída:
```
    3.14159
```

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copy constructible
(template de classe)
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | wrapper não-proprietário de qualquer objeto callable
(template de classe)
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | wrapper copiável de qualquer objeto callable copy constructible que suporta qualifiers em uma dada assinatura de chamada
(template de classe)