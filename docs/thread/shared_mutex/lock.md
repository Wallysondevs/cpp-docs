# std::shared_mutex::lock

```cpp
void lock();  // (desde C++17)
```

  
Adquire uma posse exclusiva do `shared_mutex`. Se outra thread estiver mantendo um lock exclusivo ou um lock compartilhado no mesmo `shared_mutex`, uma chamada a `lock` bloqueará a execução até que todos esses locks sejam liberados. Enquanto o `shared_mutex` estiver bloqueado em modo exclusivo, nenhum outro lock de qualquer tipo poderá ser mantido. 

Se `lock` for chamado por uma thread que já possui o `shared_mutex` em qualquer modo (exclusivo ou compartilhado), o comportamento é indefinido. Uma operação [unlock()](<#/doc/thread/shared_mutex/unlock>) anterior no mesmo mutex _sincroniza-se-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) quando ocorrem erros, incluindo erros do sistema operacional subjacente que impediriam `lock` de cumprir suas especificações. O mutex não é bloqueado no caso de qualquer exceção ser lançada. 

### Notas

`lock()` geralmente não é chamado diretamente: [std::unique_lock](<#/doc/thread/unique_lock>), [`std::scoped_lock`](<#/doc/thread/scoped_lock>), e [std::lock_guard](<#/doc/thread/lock_guard>) são usados para gerenciar o bloqueio exclusivo. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <shared_mutex>
    #include <syncstream>
    #include <thread>
    #include <vector>
     
    std::mutex stream_mutx;
    void print(auto const& v)
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
                    std::unique_lock<std::shared_mutex> lock(smtx); // better than:
                                                                    // smtx.lock();
                    product = data;
                }
                std::this_thread::sleep_for(3ms);
            }
     
            smtx.lock(); // lock manually
            product = LAST;
            smtx.unlock();
        };
     
        auto reader = [&smtx, &product]
        {
            int data = 0;
            std::vector<int> seen;
            do
            {
                {
                    // better to use:
                    std::shared_lock lock(smtx); // smtx.lock_shared();
                    data = product;
                }                                // smtx.unlock_shared();
     
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

[ try_lock](<#/doc/thread/shared_mutex/try_lock>) |  tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[ unlock](<#/doc/thread/shared_mutex/unlock>) |  desbloqueia o mutex   
(função membro pública)  
[ lock_shared](<#/doc/thread/shared_mutex/lock_shared>) |  bloqueia o mutex para posse compartilhada, bloqueia se o mutex não estiver disponível   
(função membro pública)