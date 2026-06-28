# std::jthread::jthread

```cpp
jthread() noexcept;  // (1) (desde C++20)
jthread( jthread&& other ) noexcept;  // (2) (desde C++20)
template< class F, class... Args >
explicit jthread( F&& f, Args&&... args );  // (3) (desde C++20)
jthread( const jthread& ) = delete;  // (4) (desde C++20)
```

  
Constrói um novo objeto `std::jthread`.

1) Cria um novo objeto `std::jthread` que não representa uma thread.

2) Construtor de movimento. Constrói o objeto `std::jthread` para representar a thread de execução que era representada por other. Após esta chamada, other não representa mais uma thread de execução.

3) Cria um novo objeto `std::jthread` e o associa a uma thread de execução.

A nova thread de execução começa a executar:

[std::invoke](<#/doc/utility/functional/invoke>)([`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)), get_stop_token(),  
` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (até C++23)  
[std::invoke](<#/doc/utility/functional/invoke>)(auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)), get_stop_token(),  
auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (desde C++23)  
  
se a expressão acima for bem-formada, caso contrário, começa a executar:

[std::invoke](<#/doc/utility/functional/invoke>)([`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),  
` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...). | (até C++23)  
[std::invoke](<#/doc/utility/functional/invoke>)(auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),  
auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...). | (desde C++23)  
  
As chamadas de [`_decay-copy_`](<#/doc/standard_library/decay-copy>) são avaliadas (até C++23) Os valores produzidos por auto são [materializados](<#/doc/language/implicit_cast>) (desde C++23) na thread atual, de modo que quaisquer exceções lançadas durante a avaliação e cópia/movimentação dos argumentos são lançadas na thread atual, sem iniciar a nova thread.

Essas sobrecargas participam da resolução de sobrecarga somente se [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;F&gt; não for do mesmo tipo que `std::jthread`.

Se qualquer uma das seguintes condições for falsa, o programa é malformado:

  * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, F>
  * ([std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;Args&gt;, Args> && ...)
  * [std::is_invocable_v](<#/doc/types/is_invocable>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, [std::decay_t](<#/doc/types/decay>)&lt;Args&gt;...>
[std::is_invocable_v](<#/doc/types/is_invocable>)<[std::decay_t](<#/doc/types/decay>)&lt;F&gt;, [std::stop_token](<#/doc/thread/stop_token>), [std::decay_t](<#/doc/types/decay>)&lt;Args&gt;...>

A conclusão da invocação do construtor [sincroniza com](<#/doc/atomic/memory_order>) o início da invocação da cópia de f na nova thread de execução.

4) O construtor de cópia é deletado; threads não são copiáveis. Nenhum objeto `std::jthread` pode representar a mesma thread de execução.

### Parâmetros

- **other** — outro objeto `std::jthread` para construir este objeto `std::jthread` com
- **f** — objeto [Callable](<#/doc/named_req/Callable>) a ser executado na nova thread
- **args** — argumentos a serem passados para a nova função
  
### Pós-condições

1) [`get_id()`](<#/doc/thread/jthread/get_id>) igual a [`std::jthread::id()`](<#/doc/thread/thread/id>) (ou seja, [`joinable()`](<#/doc/thread/jthread/joinable>) retorna false) e get_stop_source().stop_possible() é false.

2) other.get_id() igual a [`std::jthread::id()`](<#/doc/thread/thread/id>) e [`get_id()`](<#/doc/thread/jthread/get_id>) retorna o valor de other.get_id() antes do início da construção.

3) [`get_id()`](<#/doc/thread/jthread/get_id>) diferente de [`std::jthread::id()`](<#/doc/thread/thread/id>) (ou seja, [`joinable()`](<#/doc/thread/jthread/joinable>) retorna true), e get_stop_source().stop_possible() é true.

### Exceções

3) [std::system_error](<#/doc/error/system_error>) se a thread não pôde ser iniciada. A exceção pode representar a condição de erro `std::errc::resource_unavailable_try_again` ou outra condição de erro específica da implementação.

### Observações

Os argumentos para a função da thread são movidos ou copiados por valor. Se um argumento de referência precisar ser passado para a função da thread, ele deve ser encapsulado (por exemplo, com [std::ref](<#/doc/utility/functional/ref>) ou [std::cref](<#/doc/utility/functional/ref>)).

Qualquer valor de retorno da função é ignorado. Se a função lançar uma exceção, [std::terminate](<#/doc/error/terminate>) é chamada. Para passar valores de retorno ou exceções de volta para a thread chamadora, [std::promise](<#/doc/thread/promise>) ou [std::async](<#/doc/thread/async>) podem ser usados.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    #include <utility>
    
    using namespace std::literals;
    
    void f1(int n)
    {
        for (int i = 0; i < 5; ++i)
        {
            std::cout << "Thread 1 executing\n";
            ++n;
            std::this_thread::sleep_for(10ms);
        }
    }
    
    void f2(int& n)
    {
        for (int i = 0; i < 5; ++i)
        {
            std::cout << "Thread 2 executing\n";
            ++n;
            std::this_thread::sleep_for(10ms);
        }
    }
    
    class foo
    {
    public:
        void bar()
        {
            for (int i = 0; i < 5; ++i)
            {
                std::cout << "Thread 3 executing\n";
                ++n;
                std::this_thread::sleep_for(10ms);
            }
        }
        int n = 0;
    };
    
    class baz
    {
    public:
        void operator()()
        {
            for (int i = 0; i < 5; ++i)
            {
                std::cout << "Thread 4 executing\n";
                ++n;
                std::this_thread::sleep_for(10ms);
            }
        }
        int n = 0;
    };
    
    int main()
    {
        int n = 0;
        foo f;
        baz b;
        std::jthread t0; // t0 is not a thread
        std::jthread t1(f1, n + 1); // pass by value
        std::jthread t2a(f2, std::ref(n)); // pass by reference
        std::jthread t2b(std::move(t2a)); // t2b is now running f2(). t2a is no longer a thread
        std::jthread t3(&foo::bar, &f); // t3 runs foo::bar() on object f
        std::jthread t4(b); // t4 runs baz::operator() on a copy of object b
        t1.join();
        t2b.join();
        t3.join();
        std::cout << "Final value of n is " << n << '\n';
        std::cout << "Final value of f.n (foo::n) is " << f.n << '\n';
        std::cout << "Final value of b.n (baz::n) is " << b.n << '\n';
        // t4 joins on destruction
    }
```

Saída possível:
```
    Thread 2 executing
    Thread 1 executing
    Thread 4 executing
    Thread 3 executing
    Thread 3 executing
    Thread 4 executing
    Thread 2 executing
    Thread 1 executing
    Thread 3 executing
    Thread 1 executing
    Thread 4 executing
    Thread 2 executing
    Thread 3 executing
    Thread 1 executing
    Thread 4 executing
    Thread 2 executing
    Thread 3 executing
    Thread 1 executing
    Thread 4 executing
    Thread 2 executing
    Final value of n is 5
    Final value of f.n (foo::n) is 5
    Final value of b.n (baz::n) is 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3476](<https://cplusplus.github.io/LWG/issue3476>) | C++20 | a sobrecarga (3) exigia diretamente (os tipos decaídos de) `F` e os tipos de argumento para serem move constructible | removeu esses requisitos[1](<#/doc/thread/jthread/jthread>)
  
  1. [↑](<#/doc/thread/jthread/jthread>) A move-constructibility já é indiretamente exigida por [std::is_constructible_v](<#/doc/types/is_constructible>).

### Veja também

[ (construtor)](<#/doc/thread/thread/thread>) | constrói um novo objeto `thread`   
(função membro pública de `std::thread`)  
[documentação C](<#/>) para thrd_create