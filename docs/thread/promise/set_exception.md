# std::promise&lt;R&gt;::set_exception

void set_exception( [std::exception_ptr](<#/doc/error/exception_ptr>) p ); |  |  (desde C++11)  

  
Armazena atomicamente o ponteiro de exceção p no estado compartilhado e torna o estado pronto.

A operação se comporta como se [set_value](<#/doc/thread/promise/set_value>), `set_exception`, [set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>) e [set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) adquirissem um único mutex associado ao objeto promise enquanto atualizam o objeto promise.

Uma exceção é lançada se não houver estado compartilhado ou se o estado compartilhado já armazenar um valor ou exceção.

Chamadas a esta função não introduzem data races com chamadas a [get_future](<#/doc/thread/promise/get_future>) (portanto, elas não precisam se sincronizar entre si).

### Parâmetros

p  |  \-  |  ponteiro de exceção a ser armazenado. O comportamento é indefinido se p for nulo   
  
### Valor de retorno

(nenhum)

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições:

  * `*this` não possui estado compartilhado. O código de erro é definido como [`no_state`](<#/doc/thread/future_errc>).

  * O estado compartilhado já armazena um valor ou exceção. O código de erro é definido como [`promise_already_satisfied`](<#/doc/thread/future_errc>).

### Exemplo

Execute este código
```
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
                    // or throw a custom exception instead
                    // p.set_exception(std::make_exception_ptr(MyException("mine")));
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

Output: 
```
    Exception from the thread: Example
```

### Veja também

[ set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) | define o resultado para indicar uma exceção, entregando a notificação apenas na saída da thread   
(função membro pública)  