# std::async

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class F, class... Args >
std::future</* see below */> async( F&& f, Args&&... args );
template< class F, class... Args >
std::future</* see below */> async( std::launch policy,
F&& f, Args&&... args );
```

O template de função `std::async` executa a função f assincronamente (potencialmente em uma thread separada que pode fazer parte de um pool de threads) e retorna um [std::future](<#/doc/thread/future>) que eventualmente conterá o resultado dessa chamada de função.

1) Comporta-se como se (2) fosse chamado com a policy sendo [std::launch::async](<#/doc/thread/launch>) | [std::launch::deferred](<#/doc/thread/launch>).

2) Chama uma função f com os argumentos args de acordo com uma policy de lançamento específica (veja [abaixo](<#/doc/thread/async>)).

O tipo de retorno de `std::async` é [std::future](<#/doc/thread/future>)&lt;V&gt;, onde `V` é:

typename [std::result_of](<#/doc/types/result_of>)<typename [std::decay](<#/doc/types/decay>)&lt;F&gt;::type(
typename [std::decay](<#/doc/types/decay>)&lt;Args&gt;::type...)>::type. | (até C++17)
---|---
[std::invoke_result_t](<#/doc/types/result_of>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, [std::decay_t](<#/doc/types/decay>)&lt;Args&gt;...>. | (desde C++17)

Se qualquer uma das seguintes condições for satisfeita, o programa é malformado:

* `F` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
* Qualquer tipo em `Args` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
* [`_INVOKE_`](<#/doc/utility/functional>)([`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),
` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) não é uma expressão válida.

| (até C++20)
Se qualquer um dos seguintes for falso, o programa é malformado:

* [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, F>
* ([std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;Args&gt;, Args> && ...)
* [std::is_invocable_v](<#/doc/types/is_invocable>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, [std::decay_t](<#/doc/types/decay>)&lt;Args&gt;...>

| (desde C++20)

A chamada para `std::async` [sincroniza com](<#/doc/atomic/memory_order>) a chamada para f, e a conclusão de f é [sequenciada antes](<#/doc/language/eval_order>) de tornar o estado compartilhado pronto.

### Parâmetros

- **f** — Objeto [Callable](<#/doc/named_req/Callable>) a ser chamado
- **args** — parâmetros a serem passados para f
- **policy** — valor de bitmask, onde bits individuais controlam os métodos de execução permitidos

### Valor de retorno

[std::future](<#/doc/thread/future>) referindo-se ao estado compartilhado criado por esta chamada para `std::async`.

### Políticas de lançamento

#### Invocação assíncrona

Se a flag _async_ estiver definida, ou seja, (policy & [std::launch::async](<#/doc/thread/launch>)) != 0, então `std::async` chama

[`_INVOKE_`](<#/doc/utility/functional>)([`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),
[` _decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (até C++23)
[std::invoke](<#/doc/utility/functional/invoke>)(auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),
auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (desde C++23)

como se em uma nova thread de execução representada por um objeto [std::thread](<#/doc/thread/thread>).

As chamadas de [`_decay-copy_`](<#/doc/standard_library/decay-copy>) são avaliadas na thread atual. | (até C++23)
---|---
Os valores produzidos por auto são [materializados](<#/doc/language/implicit_cast>) na thread atual. | (desde C++23)

Se a função f retornar um valor ou lançar uma exceção, ele é armazenado no estado compartilhado acessível através do [std::future](<#/doc/thread/future>) que `std::async` retorna ao chamador.

#### Invocação adiada

Se a flag _deferred_ estiver definida (ou seja, (policy & [std::launch::deferred](<#/doc/thread/launch>)) != 0), então `std::async` armazena

[`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)) e [`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))... no estado compartilhado. | (até C++23)
---|---
auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)) e auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))... no estado compartilhado. | (desde C++23)

A _avaliação preguiçosa_ é realizada:

* A primeira chamada a uma função de espera não temporizada no [std::future](<#/doc/thread/future>) que `std::async` retornou ao chamador avaliará [`_INVOKE_`](<#/doc/utility/functional>)(std::move(g), std::move(xyz)) na thread que chamou a função de espera (que não precisa ser a thread que originalmente chamou `std::async`), onde

* g é o valor armazenado de [`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)) e
* xyz é a cópia armazenada de [`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))....

| (até C++23)

* g é o valor armazenado de auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)) e
* xyz é a cópia armazenada de auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))....

| (desde C++23)

* O resultado ou exceção é colocado no estado compartilhado associado ao [std::future](<#/doc/thread/future>) retornado e somente então ele é tornado pronto. Todos os acessos futuros ao mesmo [std::future](<#/doc/thread/future>) retornarão o resultado imediatamente.

#### Outras políticas

Se nem [std::launch::async](<#/doc/thread/launch>) nem [std::launch::deferred](<#/doc/thread/launch>), nem qualquer flag de política definida pela implementação estiver definida em policy, o comportamento é indefinido.

### Seleção de política

Se mais de uma flag estiver definida, é definido pela implementação qual política é selecionada. Para o padrão (ambas as flags [std::launch::async](<#/doc/thread/launch>) e [std::launch::deferred](<#/doc/thread/launch>) estão definidas em policy), o padrão recomenda (mas não exige) a utilização da concorrência disponível e o adiamento de quaisquer tarefas adicionais.

Se a política [std::launch::async](<#/doc/thread/launch>) for escolhida,

* uma chamada a uma função de espera em um objeto de retorno assíncrono que compartilha o estado compartilhado criado por esta chamada `std::async` bloqueia até que a thread associada tenha sido concluída, como se tivesse sido juntada (joined), ou então expire; e
* a conclusão da thread associada _sincroniza-com_ o retorno bem-sucedido da primeira função que está esperando no estado compartilhado, ou com o retorno da última função que libera o estado compartilhado, o que ocorrer primeiro.

### Exceções

Lança

* [std::bad_alloc](<#/doc/memory/new/bad_alloc>), se a memória para as estruturas de dados internas não puder ser alocada, ou
* [std::system_error](<#/doc/error/system_error>) com a condição de erro [std::errc::resource_unavailable_try_again](<#/doc/error/errc>), se policy == [std::launch::async](<#/doc/thread/launch>) e a implementação não conseguir iniciar uma nova thread.
* Se policy for [std::launch::async](<#/doc/thread/launch>) | [std::launch::deferred](<#/doc/thread/launch>) ou tiver bits adicionais definidos, ele recorrerá à invocação adiada ou às políticas definidas pela implementação neste caso.

### Notas

A implementação pode estender o comportamento da primeira sobrecarga de `std::async` habilitando bits adicionais (definidos pela implementação) na política de lançamento padrão.

Exemplos de políticas de lançamento definidas pela implementação são a política sync (executa imediatamente, dentro da chamada `std::async`) e a política task (semelhante a `std::async`, mas as thread-locals não são limpas)

Se o [std::future](<#/doc/thread/future>) obtido de `std::async` não for movido ou vinculado a uma referência, o destrutor do [std::future](<#/doc/thread/future>) bloqueará no final da expressão completa até que a operação assíncrona seja concluída, essencialmente tornando o código como o seguinte síncrono:
```cpp
    std::async(std::launch::async, []{ f(); }); // o destrutor do temporário espera por f()
    std::async(std::launch::async, []{ g(); }); // não inicia até que f() seja concluído
```
Note que os destrutores de [std::future](<#/doc/thread/future>)s obtidos por outros meios que não uma chamada a `std::async` nunca bloqueiam.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <future>
    #include <iostream>
    #include <mutex>
    #include <numeric>
    #include <string>
    #include <vector>
    
    std::mutex m;
    
    struct X
    {
        void foo(int i, const std::string& str)
        {
            std::lock_guard<std::mutex> lk(m);
            std::cout << str << ' ' << i << '\n';
        }
    
        void bar(const std::string& str)
        {
            std::lock_guard<std::mutex> lk(m);
            std::cout << str << '\n';
        }
    
        int operator()(int i)
        {
            std::lock_guard<std::mutex> lk(m);
            std::cout << i << '\n';
            return i + 10;
        }
    };
    
    template<typename RandomIt>
    int parallel_sum(RandomIt beg, RandomIt end)
    {
        auto len = end - beg;
        if (len < 1000)
            return std::accumulate(beg, end, 0);
    
        RandomIt mid = beg + len / 2;
        auto handle = std::async(std::launch::async,
                                 parallel_sum<RandomIt>, mid, end);
        int sum = parallel_sum(beg, mid);
        return sum + handle.get();
    }
    
    int main()
    {
        std::vector<int> v(10000, 1);
        std::cout << "The sum is " << parallel_sum(v.begin(), v.end()) << '\n';
    
        X x;
        // Chama (&x)->foo(42, "Hello") com a política padrão:
        // pode imprimir "Hello 42" concorrentemente ou adiar a execução
        auto a1 = std::async(&X::foo, &x, 42, "Hello");
        // Chama x.bar("world!") com a política adiada
        // imprime "world!" quando a2.get() ou a2.wait() é chamado
        auto a2 = std::async(std::launch::deferred, &X::bar, x, "world!");
        // Chama X()(43); com a política assíncrona
        // imprime "43" concorrentemente
        auto a3 = std::async(std::launch::async, X(), 43);
        a2.wait();                     // imprime "world!"
        std::cout << a3.get() << '\n'; // imprime "53"
    } // se a1 não estiver concluído neste ponto, o destrutor de a1 imprime "Hello 42" aqui
```

Saída possível:
```
    The sum is 10000
    43
    world!
    53
    Hello 42
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 2021](<https://cplusplus.github.io/LWG/issue2021>) | C++11 | tipo de retorno incorreto e categoria de valor
de argumentos pouco clara no caso adiado | tipo de retorno corrigido e
esclarecido que rvalues são usados
[LWG 2078](<https://cplusplus.github.io/LWG/issue2078>) | C++11 | não estava claro se [std::system_error](<#/doc/error/system_error>)
poderia ser lançado se a política especificasse outras
políticas de lançamento além de [std::launch::async](<#/doc/thread/launch>) | só pode ser lançado se
policy == [std::launch::async](<#/doc/thread/launch>)
[LWG 2100](<https://cplusplus.github.io/LWG/issue2100>) | C++11 | funções de espera temporizadas não podiam expirar
---|---|---
se a política [std::launch::async](<#/doc/thread/launch>) fosse usada | permitido
[LWG 2120](<https://cplusplus.github.io/LWG/issue2120>) | C++11 | o comportamento era incerto se nenhuma política padrão
ou definida pela implementação fosse definida | o comportamento é
indefinido neste caso
[LWG 2186](<https://cplusplus.github.io/LWG/issue2186>) | C++11 | não estava claro como o valor retornado e a
exceção lançada da avaliação preguiçosa são tratados | eles são armazenados no
estado compartilhado
[LWG 2752](<https://cplusplus.github.io/LWG/issue2752>) | C++11 | `std::async` pode não lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a
---|---|---
memória para as estruturas de dados internas não puder ser alocada | lança
[LWG 3476](<https://cplusplus.github.io/LWG/issue3476>) | C++20 | (os tipos decayed de) `F` e os tipos de argumento
eram diretamente exigidos como move constructible | removeu esses requisitos[1](<#/doc/thread/async>)

1. [↑](<#/doc/thread/async>) A move-constructibility já é indiretamente exigida por [std::is_constructible_v](<#/doc/types/is_constructible>).

### Veja também

[ future](<#/doc/thread/future>)(C++11) | espera por um valor que é definido assincronamente
(template de classe)
[documentação C++](<#/doc/experimental/execution>) para a biblioteca de suporte à execução