# std::thread::join

```cpp
void join();  // (desde C++11)
```

Bloqueia a thread atual até que a thread identificada por *this finalize sua execução.

A conclusão da thread identificada por *this _sincroniza com_ o retorno bem-sucedido correspondente de `join()`.

Nenhuma sincronização é realizada em *this em si. Chamar `join()` concorrentemente no mesmo objeto thread a partir de múltiplas threads constitui uma condição de corrida (data race) que resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Pós-condições

[joinable()](<#/doc/thread/thread/joinable>) é falso.

### Exceções

[std::system_error](<#/doc/error/system_error>) se ocorrer um erro.

### Condições de erro

  * [resource_deadlock_would_occur](<#/doc/error/errc>) se this->get_id() == [std::this_thread::get_id](<#/doc/thread/get_id>)() (deadlock detectado).
  * [no_such_process](<#/doc/error/errc>) se a thread não for válida.
  * [invalid_argument](<#/doc/error/errc>) se [joinable()](<#/doc/thread/thread/joinable>) for falso.

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
        std::thread helper1(foo);
    
        std::cout << "starting second helper...\n";
        std::thread helper2(bar);
    
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

  * 33.4.3.6 Membros [thread.thread.member]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 32.4.2.5 Membros [thread.thread.member]

  * Padrão C++17 (ISO/IEC 14882:2017):

  * 33.3.2.5 Membros da thread [thread.thread.member]

  * Padrão C++14 (ISO/IEC 14882:2014):

  * 30.3.1.5 Membros da thread [thread.thread.member]

  * Padrão C++11 (ISO/IEC 14882:2011):

  * 30.3.1.5 Membros da thread [thread.thread.member]

### Veja também

[ detach](<#/doc/thread/thread/detach>) | permite que a thread seja executada independentemente do manipulador da thread
(função membro pública)
[ joinable](<#/doc/thread/thread/joinable>) | verifica se a thread é joinable, ou seja, potencialmente em execução em um contexto paralelo
(função membro pública)
[Documentação C](<#/>) para thrd_join