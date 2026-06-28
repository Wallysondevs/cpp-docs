# std::recursive_mutex::try_lock

```cpp
bool try_lock() noexcept;  // (desde C++11)
```

  
Tenta bloquear o mutex. Retorna imediatamente. Em caso de aquisição bem-sucedida do bloqueio, retorna true; caso contrário, retorna false.

Esta função pode falhar de forma espúria e retornar false mesmo que o mutex não esteja atualmente bloqueado por nenhuma outra thread.

Uma thread pode chamar `try_lock` em um mutex recursivo repetidamente. Chamadas bem-sucedidas a `try_lock` incrementam a contagem de posse: o mutex só será liberado depois que a thread fizer um número correspondente de chamadas para [unlock](<#/doc/thread/recursive_mutex/unlock>).

O número máximo de níveis de posse é não especificado. Uma chamada a `try_lock` retornará false se este número for excedido.

Uma operação [unlock()](<#/doc/thread/recursive_mutex/unlock>) anterior no mesmo mutex _sincroniza-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar true. Note que uma [lock()](<#/doc/thread/recursive_mutex/lock>) anterior não sincroniza com esta operação se ela retornar false.

### Parâmetros

(nenhum)

### Valor de retorno

true se o bloqueio foi adquirido com sucesso, caso contrário false.

### Exceções

Não lança exceções.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    
    int main()
    {
        std::recursive_mutex test;
        if (test.try_lock())
        {
            std::cout << "lock acquired\n";
            test.unlock();
        }
        else
            std::cout << "lock not acquired\n";
    
        test.lock();
        // non-recursive mutex would return false from try_lock now
        if (test.try_lock())
        {
            std::cout << "lock acquired\n";
            test.unlock(); 
        }
        else
            std::cout << "lock not acquired\n";
    
        test.unlock();
    }
```

Saída:
```
    lock acquired
    lock acquired
```

### Veja também

[ lock](<#/doc/thread/recursive_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ unlock](<#/doc/thread/recursive_mutex/unlock>) | desbloqueia o mutex   
(função membro pública)  
[documentação C](<#/>) para mtx_trylock