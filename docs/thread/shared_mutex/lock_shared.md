# std::shared_mutex::lock_shared

```cpp
void lock_shared();  // (desde C++17)
```

  
Adquire a posse compartilhada do mutex. Se outra thread estiver segurando o mutex em posse exclusiva, uma chamada a `lock_shared` bloqueará a execução até que a posse compartilhada possa ser adquirida. 

Se `lock_shared` for chamado por uma thread que já possui o `mutex` em qualquer modo (exclusivo ou compartilhado), o comportamento é indefinido. 

Se mais do que o número máximo de proprietários compartilhados definido pela implementação já tiverem bloqueado o mutex no modo compartilhado, `lock_shared` bloqueará a execução até que o número de proprietários compartilhados seja reduzido. O número máximo de proprietários é garantido ser de pelo menos 10000. 

Uma operação [unlock()](<#/doc/thread/shared_mutex/unlock>) anterior no mesmo mutex _sincroniza-se-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) quando ocorrem erros, incluindo erros do sistema operacional subjacente que impediriam `lock` de cumprir suas especificações. O mutex não é bloqueado no caso de qualquer exceção ser lançada. 

### Observações

`lock_shared()` geralmente não é chamado diretamente: [std::shared_lock](<#/doc/thread/shared_lock>) é usado para gerenciar o bloqueio compartilhado. 

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <shared_mutex>
    #include <syncstream>
    #include <thread>
    #include <vector>
     
    std::mutex stream_mutx;
    void print(auto v)
    {
        std::unique_lock<std::mutex> lock(stream_mutx);
        std::cout << std::this_thread::get_id() << " saw: ";
        for (auto e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        using namespace std::chrono_literals;
        constexpr int N_READERS = 5;
        constexpr int LAST = -999;
     
        std::shared_mutex smtx;
        int product = 0;
     
        auto writer = &smtx, &product
        {
            for (int i = start; i < end; ++i)
            {
                auto data = i;            
                {
                    std::unique_lock<std::shared_mutex> lock(smtx);
                    product = data;
                } 
                std::this_thread::sleep_for(3ms);
            }
     
            smtx.lock(); // lock manually
            product = LAST;
            smtx.unlock();
        };
     
        auto reader = &smtx, &product
        {
            int data = 0;
            std::vector<int> seen;
            do
            {
                {
                    smtx.lock_shared(); // better to use: std::shared_lock lock(smtx);
                    data = product;
                    smtx.unlock_shared();
                }                                   
     
                seen.push_back(data);
                std::this_thread::sleep_for(2ms);
            }
            while (data != LAST);
     
            print(seen);
        };
     
        std::vector<std::thread> threads;
        threads.emplace_back(writer, 1, 13);
        threads.emplace_back(writer, 42, 52);
     
        for (int i = 0; i < N_READERS; ++i)
            threads.emplace_back(reader);
     
        for (auto&& t : threads)
            t.join();
    }
```

Saída possível: 
```
    127755840 saw: 43 3 3 4 46 5 6 7 7 8 9 51 10 11 11 12 -999
    144541248 saw: 2 44 3 4 46 5 6 7 7 8 9 51 10 11 11 12 -999
    110970432 saw: 42 2 3 45 4 5 47 6 7 8 8 9 10 11 11 12 -999
    119363136 saw: 42 2 3 4 46 5 6 7 7 8 9 9 10 11 11 12 12 -999
    136148544 saw: 2 44 3 4 46 5 6 48 7 8 9 51 10 11 11 12 12 -999
```

### Veja também

[ lock](<#/doc/thread/shared_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_shared](<#/doc/thread/shared_mutex/try_lock_shared>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex não estiver disponível   
(função membro pública)  
[ unlock_shared](<#/doc/thread/shared_mutex/unlock_shared>) | desbloqueia o mutex (posse compartilhada)   
(função membro pública)