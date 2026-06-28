# std::latch

Definido no cabeçalho `[<latch>](<#/doc/header/latch>)`

```c
class latch;
```

A classe `latch` é um contador decrescente do tipo [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) que pode ser usado para sincronizar threads. O valor do contador é inicializado na criação. Threads podem bloquear no latch até que o contador seja decrementado para zero. Não há possibilidade de aumentar ou redefinir o contador, o que torna o latch uma barreira de uso único.

Invocações concorrentes das funções membro de `std::latch`, exceto para o destrutor, não introduzem condições de corrida (data races).

### Membros de Dados

Nome | Definição
---|---
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) `_counter_` | o contador interno
(objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/thread/latch/latch>) | constrói um `latch`
(função membro pública)
[ (destrutor)](<#/doc/thread/latch/~latch>) | destrói o `latch`
(função membro pública)
operator=[deleted] | `latch` não é atribuível
(função membro pública)
[ count_down](<#/doc/thread/latch/count_down>) | decrementa o contador de forma não bloqueante
(função membro pública)
[ try_wait](<#/doc/thread/latch/try_wait>) | testa se o contador interno é igual a zero
(função membro pública)
[ wait](<#/doc/thread/latch/wait>) | bloqueia até que o contador atinja zero
(função membro pública)
[ arrive_and_wait](<#/doc/thread/latch/arrive_and_wait>) | decrementa o contador e bloqueia até que ele atinja zero
(função membro pública)

##### Constantes

[ max](<#/doc/thread/latch/max>)[static] | o valor máximo do contador suportado pela implementação
(função membro estática pública)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_latch`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::latch`

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <latch>
    #include <string>
    #include <thread>
    
    struct Job
    {
        const std::string name;
        std::string product{"not worked"};
        std::thread action{};
    };
    
    int main()
    {
        Job jobs[]{{"Annika"}, {"Buru"}, {"Chuck"}};
    
        std::latch work_done{std::size(jobs)};
        std::latch start_clean_up{1};
    
        auto work = &
        {
            my_job.product = my_job.name + " worked";
            work_done.count_down();
            start_clean_up.wait();
            my_job.product = my_job.name + " cleaned";
        };
    
        std::cout << "Work is starting... ";
        for (auto& job : jobs)
            job.action = std::thread{work, std::ref(job)};
    
        work_done.wait();
        std::cout << "done:\n";
        for (auto const& job : jobs)
            std::cout << "  " << job.product << '\n';
    
        std::cout << "Workers are cleaning up... ";
        start_clean_up.count_down();
        for (auto& job : jobs)
            job.action.join();
    
        std::cout << "done:\n";
        for (auto const& job : jobs)
            std::cout << "  " << job.product << '\n';
    }
```

Saída:
```
    Work is starting... done:
      Annika worked
      Buru worked
      Chuck worked
    Workers are cleaning up... done:
      Annika cleaned
      Buru cleaned
      Chuck cleaned
```

### Veja também

[ barrier](<#/doc/thread/barrier>)(C++20) | barreira de thread reutilizável
(modelo de classe)