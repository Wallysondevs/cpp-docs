# std::recursive_mutex::lock

```cpp
`void lock();`  // (desde C++11)
```

Bloqueia o mutex. Se outra thread já bloqueou o mutex, uma chamada a `lock` bloqueará a execução até que o bloqueio seja adquirido.

Uma thread pode chamar `lock` em um mutex recursivo repetidamente. A posse será liberada somente depois que a thread fizer um número correspondente de chamadas a `unlock`.

O número máximo de níveis de posse não é especificado. Uma exceção do tipo [std::system_error](<#/doc/error/system_error>) será lançada se este número for excedido.

Operações [unlock()](<#/doc/thread/recursive_mutex/unlock>) anteriores no mesmo mutex _sincronizam-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) quando ocorrem erros, incluindo erros do sistema operacional subjacente que impediriam `lock` de cumprir suas especificações. O mutex não é bloqueado no caso de qualquer exceção ser lançada.

### Notas

`lock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>), [`std::scoped_lock`](<#/doc/thread/scoped_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo.

### Exemplo

Este exemplo mostra como `lock` e `unlock` podem ser usados para proteger dados compartilhados.

Run this code
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
            // note, que o mutex também sincroniza a saída
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

[ try_lock](<#/doc/thread/recursive_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função membro pública)
[ unlock](<#/doc/thread/recursive_mutex/unlock>) | desbloqueia o mutex
(função membro pública)
[Documentação C](<#/>) para mtx_lock