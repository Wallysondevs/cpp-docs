# std::barrier

Definido no cabeçalho `[<barrier>](<#/doc/header/barrier>)`

```c
template< class CompletionFunction = /* veja abaixo */ >
class barrier;
```

O template de classe `std::barrier` fornece um mecanismo de coordenação de threads que bloqueia um grupo de threads de tamanho conhecido até que todas as threads nesse grupo tenham atingido a barrier. Ao contrário de [std::latch](<#/doc/thread/latch>), as barriers são reutilizáveis: uma vez que um grupo de threads que chegam é desbloqueado, a barrier pode ser reutilizada. Ao contrário de [std::latch](<#/doc/thread/latch>), as barriers executam um callable possivelmente vazio antes de desbloquear as threads.

O tempo de vida de um objeto barrier consiste em uma ou mais fases. Cada fase define um _ponto de sincronização de fase_ onde as threads em espera bloqueiam. As threads podem chegar à barrier, mas adiar a espera no _ponto de sincronização de fase_ chamando [`arrive`](<#/doc/thread/barrier/arrive>). Tais threads podem posteriormente bloquear no _ponto de sincronização de fase_ chamando [`wait`](<#/doc/thread/barrier/wait>).

Uma _fase_ da barrier consiste nos seguintes passos:

1.  A _contagem esperada_ é decrementada por cada chamada a [`arrive`](<#/doc/thread/barrier/arrive>) ou [`arrive_and_drop`](<#/doc/thread/barrier/arrive_and_drop>).
2.  Quando a contagem esperada atinge zero, o _passo de conclusão da fase_ é executado, o que significa que o [`_completion_`](<#/doc/thread/barrier>) é invocado, e todas as threads bloqueadas no ponto de sincronização da fase são desbloqueadas. O fim do passo de conclusão [strongly happens-before](<#/doc/atomic/memory_order>) todas as chamadas que foram desbloqueadas pelo passo de conclusão retornarem.
    Exatamente uma vez depois que a contagem esperada atinge zero, uma thread executa o passo de conclusão durante sua chamada a [`arrive`](<#/doc/thread/barrier/arrive>), [`arrive_and_drop`](<#/doc/thread/barrier/arrive_and_drop>), ou [`wait`](<#/doc/thread/barrier/wait>), exceto que é definido pela implementação se o passo é executado caso nenhuma thread chame [`wait`](<#/doc/thread/barrier/wait>).
3.  Quando o passo de conclusão termina, a contagem esperada é redefinida para o valor especificado na construção menos o número de chamadas a [`arrive_and_drop`](<#/doc/thread/barrier/arrive_and_drop>) desde então, e a próxima _fase da barrier_ começa.

Invocações concorrentes das funções membro de `barrier`, exceto para o destrutor, não introduzem data races.

### Parâmetros de template

- **CompletionFunction** — um tipo de objeto de função
-`CompletionFunction` deve atender aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [Destructible](<#/doc/named_req/Destructible>). [std::is_nothrow_invocable_v](<#/doc/types/is_invocable>)<CompletionFunction&> deve ser verdadeiro.

O argumento de template padrão de `CompletionFunction` é um tipo de objeto de função não especificado que adicionalmente atende aos requisitos de [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). Chamar um lvalue dele sem argumentos não tem efeitos.

### Tipos membro

Nome | Definição
---|---
`arrival_token` | um tipo de objeto não especificado que atende aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>), [MoveAssignable](<#/doc/named_req/MoveAssignable>) e [Destructible](<#/doc/named_req/Destructible>)

### Membros de dados

Membro | Definição
---|---
`CompletionFunction` `_completion_` | um objeto de função de conclusão que é chamado em cada passo de conclusão de fase
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/thread/barrier/barrier>) | constrói uma `barrier`
(função membro pública)
[ (destrutor)](<#/doc/thread/barrier/~barrier>) | destrói a `barrier`
(função membro pública)
operator=[deleted] | `barrier` não é atribuível
(função membro pública)
[ arrive](<#/doc/thread/barrier/arrive>) | chega à barrier e decrementa a contagem esperada
(função membro pública)
[ wait](<#/doc/thread/barrier/wait>) | bloqueia no ponto de sincronização da fase até que seu passo de conclusão de fase seja executado
(função membro pública)
[ arrive_and_wait](<#/doc/thread/barrier/arrive_and_wait>) | chega à barrier e decrementa a contagem esperada em um, então bloqueia até que a fase atual seja concluída
(função membro pública)
[ arrive_and_drop](<#/doc/thread/barrier/arrive_and_drop>) | decrementa tanto a contagem esperada inicial para fases subsequentes quanto a contagem esperada para a fase atual em um
(função membro pública)

##### Constantes

[ max](<#/doc/thread/barrier/max>)[static] | o valor máximo da contagem esperada suportado pela implementação
(função membro estática pública)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_barrier`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [`std::barrier`](<#/doc/thread/barrier>)
[`202302L`](<#/>) | (C++20)
(DR) | Garantias relaxadas para conclusão de fase

### Exemplo

Execute este código
```cpp
    #include <barrier>
    #include <iostream>
    #include <string>
    #include <syncstream>
    #include <thread>
    #include <vector>
    
    int main()
    {
        const auto workers = {"Anil", "Busara", "Carl"};
    
        auto on_completion =  noexcept
        {
            // locking not needed here
            static auto phase =
                "... done\n"
                "Cleaning up...\n";
            std::cout << phase;
            phase = "... done\n";
        };
    
        std::barrier sync_point(std::ssize(workers), on_completion);
    
        auto work = &
        {
            std::string product = "  " + name + " worked\n";
            std::osyncstream(std::cout) << product;  // ok, op<< call is atomic
            sync_point.arrive_and_wait();
    
            product = "  " + name + " cleaned\n";
            std::osyncstream(std::cout) << product;
            sync_point.arrive_and_wait();
        };
    
        std::cout << "Starting...\n";
        std::vector<std::jthread> threads;
        threads.reserve(std::size(workers));
        for (auto const& worker : workers)
            threads.emplace_back(work, worker);
    }
```

Saída possível:
```
    Starting...
      Anil worked
      Carl worked
      Busara worked
    ... done
    Cleaning up...
      Busara cleaned
      Carl cleaned
      Anil cleaned
    ... done
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P2588R3](<https://wg21.link/P2588R3>) | C++20 | garantias antigas de conclusão de fase podem impedir a aceleração de hardware | relaxado

### Veja também

[ latch](<#/doc/thread/latch>)(C++20) | barrier de thread de uso único
(classe)