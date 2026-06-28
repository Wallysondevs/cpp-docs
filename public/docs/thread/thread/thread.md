# std::thread::thread

```cpp
thread() noexcept;  // (1) (desde C++11)
thread( thread&& other ) noexcept;  // (2) (desde C++11)
template< class F, class... Args >
explicit thread( F&& f, Args&&... args );  // (3) (desde C++11)
thread( const thread& ) = delete;  // (4) (desde C++11)
```

Constrói um novo objeto `std::thread`.

1) Cria um novo objeto `std::thread` que não representa uma thread.

2) Construtor de movimento. Constrói o objeto `std::thread` para representar a thread de execução que era representada por other. Após esta chamada, other não representa mais uma thread de execução.

3) Cria um novo objeto `std::thread` e o associa a uma thread de execução. A nova thread de execução começa a executar: [`_INVOKE_`](<#/doc/utility/functional>)([`_decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),
` `[` _decay-copy_`](<#/doc/standard_library/decay-copy>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (até C++23)
[std::invoke](<#/doc/utility/functional/invoke>)(auto([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)),
auto([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args))...) | (desde C++23)

As chamadas de [`_decay-copy_`](<#/doc/standard_library/decay-copy>) são avaliadas (até C++23) Os valores produzidos por auto são [materializados](<#/doc/language/implicit_cast>) (desde C++23) na thread atual, de modo que quaisquer exceções lançadas durante a avaliação e cópia/movimento dos argumentos são lançadas na thread atual, sem iniciar a nova thread.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::decay](<#/doc/types/decay>)&lt;F&gt;::type (até C++20) [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;F&gt; (desde C++20) não for do mesmo tipo que `std::thread`. Se qualquer uma das seguintes condições for satisfeita, o programa é malformado:

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

A conclusão da invocação do construtor [sincroniza com](<#/doc/atomic/memory_order>) o início da invocação da cópia de f na nova thread de execução.

4) O construtor de cópia é deletado; threads não são copiáveis. Nenhum par de objetos `std::thread` pode representar a mesma thread de execução.

### Parâmetros

- **other** — outro objeto thread para construir este objeto thread com
- **f** — Objeto [Callable](<#/doc/named_req/Callable>) para executar na nova thread
- **args** — argumentos para passar para a nova função

### Pós-condições

1) [get_id()](<#/doc/thread/thread/get_id>) igual a [std::thread::id](<#/doc/thread/thread/id>)() (ou seja, [joinable()](<#/doc/thread/thread/joinable>) é falso).

2) other.get_id() igual a [std::thread::id()](<#/doc/thread/thread/id>) e [get_id()](<#/doc/thread/thread/get_id>) retorna o valor de other.get_id() antes do início da construção.

3) [get_id()](<#/doc/thread/thread/get_id>) diferente de [std::thread::id()](<#/doc/thread/thread/id>) (ou seja, [joinable()](<#/doc/thread/thread/joinable>) é verdadeiro).

### Exceções

3) [std::system_error](<#/doc/error/system_error>) se a thread não pôde ser iniciada. A exceção pode representar a condição de erro `std::errc::resource_unavailable_try_again` ou outra condição de erro específica da implementação.

### Observações

Os argumentos para a função da thread são movidos ou copiados por valor. Se um argumento de referência precisar ser passado para a função da thread, ele deve ser encapsulado (por exemplo, com [std::ref](<#/doc/utility/functional/ref>) ou [std::cref](<#/doc/utility/functional/ref>)).

Qualquer valor de retorno da função é ignorado. Se a função lançar uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado. Para passar valores de retorno ou exceções de volta para a thread chamadora, [std::promise](<#/doc/thread/promise>) ou [std::async](<#/doc/thread/async>) podem ser usados.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    #include <utility>
    
    void f1(int n)
    {
        for (int i = 0; i < 5; ++i)
        {
            std::cout << "Thread 1 executing\n";
            ++n;
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
    }
    
    void f2(int& n)
    {
        for (int i = 0; i < 5; ++i)
        {
            std::cout << "Thread 2 executing\n";
            ++n;
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
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
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
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
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
        }
        int n = 0;
    };
    
    int main()
    {
        int n = 0;
        foo f;
        baz b;
        std::thread t1; // t1 is not a thread
        std::thread t2(f1, n + 1); // pass by value
        std::thread t3(f2, std::ref(n)); // pass by reference
        std::thread t4(std::move(t3)); // t4 is now running f2(). t3 is no longer a thread
        std::thread t5(&foo::bar, &f); // t5 runs foo::bar() on object f
        std::thread t6(b); // t6 runs baz::operator() on a copy of object b
        t2.join();
        t4.join();
        t5.join();
        t6.join();
        std::cout << "Final value of n is " << n << '\n';
        std::cout << "Final value of f.n (foo::n) is " << f.n << '\n';
        std::cout << "Final value of b.n (baz::n) is " << b.n << '\n';
    }
```

Saída possível:
```
    Thread 1 executing
    Thread 2 executing
    Thread 3 executing
    Thread 4 executing
    Thread 3 executing
    Thread 1 executing
    Thread 2 executing
    Thread 4 executing
    Thread 2 executing
    Thread 3 executing
    Thread 1 executing
    Thread 4 executing
    Thread 3 executing
    Thread 2 executing
    Thread 1 executing
    Thread 4 executing
    Thread 3 executing
    Thread 1 executing
    Thread 2 executing
    Thread 4 executing
    Final value of n is 5
    Final value of f.n (foo::n) is 5
    Final value of b.n (baz::n) is 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2097](<https://cplusplus.github.io/LWG/issue2097>) | C++11 | para a sobrecarga (3), `F` poderia ser `std::thread` | `F` é restrito
[LWG 3476](<https://cplusplus.github.io/LWG/issue3476>) | C++20 | a sobrecarga (3) exigia diretamente (os tipos decaídos de)
`F` e os tipos de argumento para serem move constructible | removeu esses requisitos[1](<#/doc/thread/thread/thread>)

  1. [↑](<#/doc/thread/thread/thread>) A move-constructibility já é indiretamente exigida por [std::is_constructible_v](<#/doc/types/is_constructible>).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 33.4.3.3 thread constructors [thread.thread.constr]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 32.4.2.2 thread constructors [thread.thread.constr]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 33.3.2.2 thread constructors [thread.thread.constr]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 30.3.1.2 thread constructors [thread.thread.constr]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 30.3.1.2 thread constructors [thread.thread.constr]

### Veja também

[ (constructor)](<#/doc/thread/jthread/jthread>) | constrói um novo objeto `jthread`
(função membro pública de `std::jthread`)
[Documentação C](<#/>) para thrd_create