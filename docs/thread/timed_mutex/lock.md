# std::timed_mutex::lock

```cpp
void lock();  // (desde C++11)
```

Bloqueia o mutex. Se outra thread já bloqueou o mutex, uma chamada a `lock` bloqueará a execução até que o bloqueio seja adquirido.

Se `lock` for chamado por uma thread que já possui o `mutex`, o comportamento é indefinido: por exemplo, o programa _pode_ entrar em deadlock. Uma implementação que possa detectar o uso inválido é encorajada a lançar um [std::system_error](<#/doc/error/system_error>) com a condição de erro `resource_deadlock_would_occur` em vez de entrar em deadlock.

Operações [unlock()](<#/doc/thread/timed_mutex/unlock>) anteriores no mesmo mutex _sincronizam-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) quando ocorrem erros, incluindo erros do sistema operacional subjacente que impediriam `lock` de cumprir suas especificações. O mutex não é bloqueado no caso de qualquer exceção ser lançada.

### Observações

`lock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>), [`std::scoped_lock`](<#/doc/thread/scoped_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo.

### Exemplo

Este exemplo mostra como `lock` e `unlock` podem ser usados para proteger dados compartilhados.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <thread>
    
    int g_num = 0; // protegido por g_num_mutex
    std::mutex g_num_mutex;
    
    void slow_increment(int id) 
    {
        for (int i = 0; i < 3; ++i)
        {
            g_num_mutex.lock(); 
            ++g_num;
            // observe que o mutex também sincroniza a saída
            std::cout << "id: " << id << ", g_num: " << g_num << '\n';
            g_num_mutex.unlock();
    
            std::this_thread::sleep_for(std::chrono::milliseconds(234));
        }
    }
    
    int main()
    {
        std::thread t1{slow_increment, 0};
        std::thread t2{slow_increment, 1};
        t1.join();
        t2.join();
    }
```

Saída possível:
```
    id: 0, g_num: 1
    id: 1, g_num: 2
    id: 1, g_num: 3
    id: 0, g_num: 4
    id: 0, g_num: 5
    id: 1, g_num: 6
```

### Veja também

[ try_lock](<#/doc/thread/timed_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ try_lock_for](<#/doc/thread/timed_mutex/try_lock_for>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível pela duração de timeout especificada
(função membro pública)
[ try_lock_until](<#/doc/thread/timed_mutex/try_lock_until>) | tenta bloquear o mutex, retorna se o mutex esteve
indisponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)
[ unlock](<#/doc/thread/timed_mutex/unlock>) | desbloqueia o mutex
(função membro pública)
[documentação C](<#/>) para mtx_lock