# std::execution::scheduler

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
template< class Sch >
concept scheduler =
std::derived_from<
typename std::remove_cvref_t<Sch>::scheduler_concept,
scheduler_t> &&
/*queryable*/<Sch> &&
requires(Sch&& sch)
{
{
std::execution::schedule(std::forward<Sch>(sch))
} -> std::execution::sender;
{
auto(
std::execution::get_completion_scheduler<
std::execution::set_value_t>(
std::execution::get_env(
std::execution::schedule(
std::forward<Sch>(sch)))))
} -> std::same_as<std::remove_cvref_t<Sch>>;
} &&
std::equality_comparable<std::remove_cvref_t<Sch>> &&
std::copy_constructible<std::remove_cvref_t<Sch>>;
};
Tipo de tag auxiliar
struct scheduler_t {};
```

  
O concept `scheduler` é modelado por tipos que são _schedulers_, ou seja, manipuladores leves para recursos de execução, como pools de threads, que funcionam com a biblioteca de execução C++.

### Requisitos semânticos

Dado um scheduler do tipo `Sch` e um ambiente de execução do tipo `Env` tal que sender_in<schedule_result_t&lt;Sch&gt;, Env> seja satisfeito, então /*sender-in-of*/<schedule_result_t&lt;Sch&gt;, Env> é modelado.

O construtor de cópia, destrutor, comparação de igualdade ou funções membro de troca (swap) do scheduler não devem lançar exceções.

Todas essas funções membro, bem como a função `schedule` do tipo scheduler, devem ser thread-safe.

Dois schedulers são iguais apenas se representarem o mesmo recurso de execução.

Para um dado scheduler `sch`, a expressão get_completion_scheduler<set_value_t>(get_env(schedule(sch))) é igual a `sch`.

Para um dado scheduler `sch`, se a expressão get_domain(sch) for bem-formada, então a expressão get_domain(get_env(schedule(sch))) também será bem-formada e terá o mesmo tipo.

O destrutor de um scheduler não deve bloquear a conclusão pendente de quaisquer receivers conectados aos objetos sender retornados de schedule (o recurso subjacente pode fornecer uma API separada para aguardar a conclusão de objetos de função submetidos)

### Exemplos

Um wrapper simples para std::execution::run_loop que constantemente verifica a fila de run_loop em uma única thread dedicada. Demonstração usando a implementação de referência preliminar: <https://godbolt.org/z/146fY4Y91>

Execute este código
```cpp
    #include <execution>
    #include <iostream>
    #include <thread>
     
    class single_thread_context
    {
        std::execution::run_loop loop_{};
        std::jthread thread_;
     
    public:
        single_thread_context()
            : thread_([this] { loop_.run(); })
        {}
        single_thread_context(single_thread_context&&) = delete;
     
        ~single_thread_context()
        {
            loop_.finish();
        }
     
        std::execution::scheduler auto get_scheduler() noexcept
        {
            return loop_.get_scheduler();
        }
    };
     
    int main()
    {
        single_thread_context ctx;
     
        std::execution::sender auto snd =
            std::execution::schedule(ctx.get_scheduler())
            | std::execution::then([]
                {
                    std::cout << "Hello world! Have an int.\n";
                    return 015;
                })
            | std::execution::then( { return arg + 42; });
     
        auto [i] = std::this_thread::sync_wait(snd).value();
     
        std::cout << "Back in the main thread, result is " << i << '\n';
    }
```

Saída: 
```
    Hello world! Have an int.
    Back in the main thread, result is 55
```

### Veja também

[ execution::schedule](<#/doc/execution/schedule>)(C++26) | prepara um grafo de tarefas para execução em um dado scheduler  
(objeto de ponto de customização)  