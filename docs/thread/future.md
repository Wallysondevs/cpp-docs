# std::future

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class T > class future;
template< class T > class future<T&>;
template<> class future<void>;
```

O template de classe `std::future` fornece um mecanismo para acessar o resultado de operações assíncronas:

*   Uma operação assíncrona (criada via [std::async](<#/doc/thread/async>), [std::packaged_task](<#/doc/thread/packaged_task>), ou [std::promise](<#/doc/thread/promise>)) pode fornecer um objeto `std::future` para o criador dessa operação assíncrona.

*   O criador da operação assíncrona pode então usar uma variedade de métodos para consultar, aguardar ou extrair um valor do `std::future`. Esses métodos podem bloquear se a operação assíncrona ainda não tiver fornecido um valor.

*   Quando a operação assíncrona estiver pronta para enviar um resultado ao criador, ela pode fazê-lo modificando o _estado compartilhado_ (por exemplo, [std::promise::set_value](<#/doc/thread/promise/set_value>)) que está vinculado ao `std::future` do criador.

Note que `std::future` referencia um estado compartilhado que não é compartilhado com nenhum outro objeto de retorno assíncrono (ao contrário de [std::shared_future](<#/doc/thread/shared_future>)).

### Funções membro

[ (constructor)](<#/doc/thread/future/future>) | constrói o objeto future
(public member function)
[ (destructor)](<#/doc/thread/future/~future>) | destrói o objeto future
(public member function)
[ operator=](<#/>) | move o objeto future
(public member function)
[ share](<#/doc/thread/future/share>) | transfere o estado compartilhado de *this para um [`shared_future`](<#/doc/thread/shared_future>) e o retorna
(public member function)

##### Obtendo o resultado

[ get](<#/doc/thread/future/get>) | retorna o resultado
(public member function)

##### Estado

[ valid](<#/doc/thread/future/valid>) | verifica se o future possui um estado compartilhado
(public member function)
[ wait](<#/doc/thread/future/wait>) | aguarda o resultado ficar disponível
(public member function)
[ wait_for](<#/doc/thread/future/wait_for>) | aguarda o resultado, retorna se não estiver disponível pela duração de timeout especificada
(public member function)
[ wait_until](<#/doc/thread/future/wait_until>) | aguarda o resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(public member function)

### Exemplos

Run this code
```cpp
    #include <future>
    #include <iostream>
    #include <thread>
     
    int main()
    {
        // future from a packaged_task
        std::packaged_task<int()> task([]{ return 7; }); // wrap the function
        std::future<int> f1 = task.get_future(); // get a future
        std::thread t(std::move(task)); // launch on a thread
     
        // future from an async()
        std::future<int> f2 = std::async(std::launch::async, []{ return 8; });
     
        // future from a promise
        std::promise<int> p;
        std::future<int> f3 = p.get_future();
        std::thread([&p]{ p.set_value_at_thread_exit(9); }).detach();
     
        std::cout << "Waiting..." << std::flush;
        f1.wait();
        f2.wait();
        f3.wait();
        std::cout << "Done!\nResults are: "
                  << f1.get() << ' ' << f2.get() << ' ' << f3.get() << '\n';
        t.join();
    }
```

Saída:
```
    Waiting...Done!
    Results are: 7 8 9
```

#### Exemplo com exceções

Run this code
```cpp
    #include <future>
    #include <iostream>
    #include <thread>
     
    int main()
    {
        std::promise<int> p;
        std::future<int> f = p.get_future();
     
        std::thread t([&p]
        {
            try
            {
                // code that may throw
                throw std::runtime_error("Example");
            }
            catch (...)
            {
                try
                {
                    // store anything thrown in the promise
                    p.set_exception(std::current_exception());
                }
                catch (...) {} // set_exception() may throw too
            }
        });
     
        try
        {
            std::cout << f.get();
        }
        catch (const std::exception& e)
        {
            std::cout << "Exception from the thread: " << e.what() << '\n';
        }
        t.join();
    }
```

Saída:
```
    Exception from the thread: Example
```

### Veja também

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um **std::future** que conterá o resultado
(template de função)
[ shared_future](<#/doc/thread/shared_future>)(C++11) | aguarda por um valor (possivelmente referenciado por outros futures) que é definido assincronamente
(template de classe)