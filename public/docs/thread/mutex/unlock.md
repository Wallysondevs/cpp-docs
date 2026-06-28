# std::mutex::unlock

```cpp
void unlock();  // (desde C++11)
```

  
Desbloqueia o mutex.

O mutex deve estar bloqueado pela thread de execução atual; caso contrário, o comportamento é indefinido.

Esta operação _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) qualquer operação de bloqueio subsequente que obtenha a posse do mesmo mutex.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Observações

`unlock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>) e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo.

### Exemplo

Este exemplo mostra como `lock` e `unlock` podem ser usados para proteger dados compartilhados.

Execute este código
```
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
            int g_num_running = ++g_num;
            g_num_mutex.unlock();
            std::cout << id << " => " << g_num_running << '\n';
     
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }
     
    int main()
    {
        std::thread t1(slow_increment, 0);
        std::thread t2(slow_increment, 1);
        t1.join();
        t2.join();
    }
```

Saída possível: 
```
    0 => 1
    1 => 2
    0 => 3
    1 => 4
    0 => 5
    1 => 6
```

### Veja também

[ lock](<#/doc/thread/mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[Documentação C](<#/>) para mtx_unlock