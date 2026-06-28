# std::jthread::join

```cpp
void join();  // (desde C++20)
```

Bloqueia a thread atual até que a thread identificada por *this finalize sua execução.

A conclusão da thread identificada por *this _sincroniza com_ o retorno bem-sucedido correspondente de `join()`.

Nenhuma sincronização é realizada em *this. Chamar `join()` concorrentemente no mesmo objeto `jthread` a partir de múltiplas threads constitui uma data race que resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Pós-condições

joinable() é falso.

### Exceções

[std::system_error](<#/doc/error/system_error>) se ocorrer um erro.

### Condições de erro

* [resource_deadlock_would_occur](<#/doc/error/errc>) se this->get_id() == [std::this_thread::get_id](<#/doc/thread/get_id>)() (deadlock detectado).
* [no_such_process](<#/doc/error/errc>) se a thread não for válida.
* [invalid_argument](<#/doc/error/errc>) se joinable() for falso.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    void foo()
    {
        // simulate expensive operation
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    void bar()
    {
        // simulate expensive operation
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    int main()
    {
        std::cout << "starting first helper...\n";
        std::jthread helper1(foo);
    
        std::cout << "starting second helper...\n";
        std::jthread helper2(bar);
    
        std::cout << "waiting for helpers to finish..." << std::endl;
        helper1.join();
        helper2.join();
    
        std::cout << "done!\n";
    }
```

Saída:
```
    starting first helper...
    starting second helper...
    waiting for helpers to finish...
    done!
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

  * 33.4.4.3 Membros [thread.jthread.mem]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 32.4.3.2 Membros [thread.jthread.mem]

### Veja também

[ detach](<#/doc/thread/jthread/detach>) | permite que a thread seja executada independentemente do handle da thread
(função membro pública)
[ joinable](<#/doc/thread/jthread/joinable>) | verifica se a thread é joinable, ou seja, potencialmente em execução em um contexto paralelo
(função membro pública)
[Documentação C](<#/>) para thrd_join