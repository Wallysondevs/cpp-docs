# std::try_lock

Definido no cabeçalho `[<mutex>](<#/doc/header/mutex>)`

```c
template< class Lockable1, class Lockable2, class... LockableN >
int try_lock( Lockable1& lock1, Lockable2& lock2, LockableN&... lockn );
```

Tenta bloquear cada um dos objetos [Lockable](<#/doc/named_req/Lockable>) fornecidos lock1, lock2, ..., lockn chamando `try_lock` em ordem, começando pelo primeiro.

Se uma chamada para `try_lock` falhar, nenhuma outra chamada para `try_lock` é realizada, `unlock` é chamado para quaisquer objetos bloqueados e um índice baseado em ​0​ do objeto que falhou ao bloquear é retornado.

Se uma chamada para `try_lock` resultar em uma exceção, `unlock` é chamado para quaisquer objetos bloqueados antes de relançar a exceção.

### Parâmetros

lock1, lock2, ..., lockn | \- | os objetos [Lockable](<#/doc/named_req/Lockable>) a serem bloqueados

### Valor de retorno

-1 em caso de sucesso, ou o valor do índice baseado em ​0​ do objeto que falhou ao bloquear.

### Exemplo

O exemplo a seguir usa `std::try_lock` para periodicamente totalizar e redefinir contadores executados em threads separadas.

Execute este código
```cpp
    #include <chrono>
    #include <functional>
    #include <iostream>
    #include <mutex>
    #include <thread>
    #include <vector>
    
    int main()
    {
        int foo_count = 0;
        std::mutex foo_count_mutex;
        int bar_count = 0;
        std::mutex bar_count_mutex;
        int overall_count = 0;
        bool done = false;
        std::mutex done_mutex;
    
        auto increment = 
        {
            for (int i = 0; i < 10; ++i)
            {
                std::unique_lock<std::mutex> lock(m);
                ++counter;
                std::cout << desc << ": " << counter << '\n';
                lock.unlock();
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }
        };
    
        std::thread increment_foo(increment, std::ref(foo_count), 
            std::ref(foo_count_mutex), "foo");
        std::thread increment_bar(increment, std::ref(bar_count), 
            std::ref(bar_count_mutex), "bar");
    
        std::thread update_overall(&
        {
            done_mutex.lock();
            while (!done)
            {
                done_mutex.unlock();
                int result = std::try_lock(foo_count_mutex, bar_count_mutex);
                if (result == -1)
                {
                    overall_count += foo_count + bar_count;
                    foo_count = 0;
                    bar_count = 0;
                    std::cout << "overall: " << overall_count << '\n';
                    foo_count_mutex.unlock();
                    bar_count_mutex.unlock();
                }
                std::this_thread::sleep_for(std::chrono::seconds(2));
                done_mutex.lock();
            }
            done_mutex.unlock();
        });
    
        increment_foo.join();
        increment_bar.join();
        done_mutex.lock();
        done = true;
        done_mutex.unlock();
        update_overall.join();
    
        std::cout << "Done processing\n"
                  << "foo: " << foo_count << '\n'
                  << "bar: " << bar_count << '\n'
                  << "overall: " << overall_count << '\n';
    }
```

Saída possível:
```
    bar: 1
    foo: 1
    foo: 2
    bar: 2
    foo: 3
    overall: 5
    bar: 1
    foo: 1
    bar: 2
    foo: 2
    bar: 3
    overall: 10
    bar: 1
    foo: 1
    bar: 2
    foo: 2
    overall: 14
    bar: 1
    foo: 1
    bar: 2
    overall: 17
    foo: 1
    bar: 1
    foo: 2
    overall: 20
    Done processing
    foo: 0
    bar: 0
    overall: 20
```

### Veja também

[ lock](<#/doc/thread/lock>)(C++11) | bloqueia mutexes especificados, bloqueia se algum estiver indisponível
---|---
(modelo de função) |
---