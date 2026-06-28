# std::execution::sequenced_policy, std::execution::parallel_policy, std::execution::parallel_unsequenced_policy, std::execution::unsequenced_policy

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
class sequenced_policy { /* não especificado */ };
class parallel_policy { /* não especificado */ };
class parallel_unsequenced_policy { /* não especificado */ };
class unsequenced_policy { /* não especificado */ };
```

1) O tipo de política de execução usado como um tipo único para desambiguar a sobrecarga de algoritmos paralelos e exigir que a execução de um algoritmo paralelo não possa ser paralelizada. As invocações de funções de acesso a elementos em algoritmos paralelos invocados com esta política (geralmente especificado como [std::execution::seq](<#/doc/algorithm/execution_policy_tag>)) são sequenciadas de forma indeterminada na thread de chamada.

2) O tipo de política de execução usado como um tipo único para desambiguar a sobrecarga de algoritmos paralelos e indicar que a execução de um algoritmo paralelo pode ser paralelizada. As invocações de funções de acesso a elementos em algoritmos paralelos invocados com esta política (geralmente especificado como [std::execution::par](<#/doc/algorithm/execution_policy_tag>)) têm permissão para serem executadas tanto na thread invocadora quanto em uma thread implicitamente criada pela biblioteca para suportar a execução do algoritmo paralelo. Quaisquer invocações desse tipo executando na mesma thread são sequenciadas de forma indeterminada umas em relação às outras. Se as threads de execução criadas por [std::thread](<#/doc/thread/thread>) ou [std::jthread](<#/doc/thread/jthread>) fornecerem garantias de progresso concorrente, então as threads de execução criadas pela biblioteca fornecem garantias de progresso paralelo. Caso contrário, a garantia de progresso fornecida é definida pela implementação. Nota: o progresso paralelo garante que, se uma thread de execução der um passo, ela eventualmente dará outro passo, permitindo que as threads entrem em seções críticas e adquiram locks, porque a thread que possui o lock será eventualmente agendada novamente e poderá liberá-lo.

3) O tipo de política de execução usado como um tipo único para desambiguar a sobrecarga de algoritmos paralelos e indicar que a execução de um algoritmo paralelo pode ser paralelizada, vetorizada ou migrada entre threads (como por um agendador de "parent-stealing"). As invocações de funções de acesso a elementos em algoritmos paralelos invocados com esta política têm permissão para serem executadas de forma não ordenada em threads não especificadas, e não sequenciadas umas em relação às outras dentro de cada thread. A invocação de funções de acesso a elementos em algoritmos paralelos invocados com esta política não tem permissão para invocar operações inseguras para vetorização, como aquelas especificadas pela standard library para sincronizar, incluindo as de [std::atomic](<#/doc/atomic/atomic>) e outros primitivos de concorrência. Se as threads de execução criadas por [std::thread](<#/doc/thread/thread>) ou [std::jthread](<#/doc/thread/jthread>) fornecerem garantias de progresso concorrente, então as threads de execução criadas pela biblioteca fornecem garantias de progresso fracamente paralelo. Caso contrário, a garantia de progresso fornecida é a da thread que invoca o algoritmo paralelo. Nota: o progresso fracamente paralelo garante que uma das threads de execução que deu um passo eventualmente dará outro passo, o que não permite que as threads entrem em seções críticas ou adquiram locks, porque a thread que possui o lock pode não ser agendada novamente até que uma thread que esteja tentando adquirir o lock tenha saído.

4) O tipo de política de execução usado como um tipo único para desambiguar a sobrecarga de algoritmos paralelos e indicar que a execução de um algoritmo paralelo pode ser vetorizada, por exemplo, executada em uma única thread usando instruções que operam em múltiplos itens de dados.

Durante a execução de um algoritmo paralelo com qualquer uma dessas políticas de execução, se a invocação de uma função de acesso a elementos sair via uma exceção não capturada, [std::terminate](<#/doc/error/terminate>) é chamada, mas as implementações podem definir políticas de execução adicionais que lidam com exceções de forma diferente.

### Notas

Ao usar a política de execução paralela, é responsabilidade do programador evitar condições de corrida (data races) e deadlocks:
```cpp
    int a[] = {0, 1};
    std::vector<int> v;
    std::for_each(std::execution::par, std::begin(a), std::end(a), &
    {
        v.push_back(i * 2 + 1); // Erro: condição de corrida (data race)
    });
```
```cpp
    std::atomic<int> x {0};
    int a[] = {1, 2};
    std::for_each(std::execution::par, std::begin(a), std::end(a), &
    {
        x.fetch_add(1, std::memory_order_relaxed);
        while (x.load(std::memory_order_relaxed) == 1) { } // Erro: assume ordem de execução
    });
```
```cpp
    int x = 0;
    std::mutex m;
    int a[] = {1, 2};
    std::for_each(std::execution::par, std::begin(a), std::end(a), &
    {
        std::lock_guard<std::mutex> guard(m);
        ++x; // correto
    });
```

As políticas de execução não sequenciadas são o único caso em que as chamadas de função são _não sequenciadas_ umas em relação às outras, o que significa que elas podem ser intercaladas. Em todas as outras situações em C++, elas são [sequenciadas de forma indeterminada](<#/doc/language/eval_order>) (não podem ser intercaladas). Por causa disso, os usuários não têm permissão para alocar ou desalocar memória, adquirir mutexes, usar especializações de [std::atomic](<#/doc/atomic/atomic>) que não sejam lock-free, ou, em geral, realizar quaisquer operações _inseguras para vetorização_ ao usar essas políticas (funções inseguras para vetorização são aquelas que sincronizam com outra função, por exemplo, [std::mutex::unlock](<#/doc/thread/mutex/unlock>) sincroniza com o próximo [std::mutex::lock](<#/doc/thread/mutex/lock>)).
```cpp
    int x = 0;
    std::mutex m;
    int a[] = {1, 2};
    std::for_each(std::execution::par_unseq, std::begin(a), std::end(a), &
    {
        std::lock_guard<std::mutex> guard(m); // Erro: o construtor de lock_guard chama m.lock()
        ++x;
    });
```

Se a implementação não puder paralelizar ou vetorizar (por exemplo, devido à falta de recursos), todas as políticas de execução padrão podem recorrer à execução sequencial.

### Veja também

[ seqparpar_unsequnseq](<#/doc/algorithm/execution_policy_tag>)(C++17)(C++17)(C++17)(C++20) | objetos de política de execução global
(constante)