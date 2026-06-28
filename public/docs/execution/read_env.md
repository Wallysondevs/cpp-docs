# std::execution::read_env

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
inline constexpr /*unspecified*/ read_env{};
(objeto de ponto de customização)
Assinatura da chamada
execution::sender auto read_env( auto&& query );
```

Uma fábrica de senders que retorna um sender que acessa o ambiente de um receiver e extrai o valor atual associado a um dado [objeto de consulta](<#/doc/experimental/execution>).

Para qualquer objeto de consulta `q`, a expressão `read_env(q)` é [expressão-equivalente](<#/doc/language/expressions>) a `/*make-sender*/(read_env, q)`.

### Objetos de ponto de customização

O nome `execution::read_env` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___read_env_fn_`.

Todas as instâncias de `___read_env_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___read_env_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser `const`-qualificada ou não (no entanto, uma instância `volatile`-qualificada não é exigida ser invocável). Assim, `execution::read_env` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `execution::read_env` acima, `___read_env_fn_` modela

*   [std::invocable](<#/doc/concepts/invocable>)<__read_env_fn, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __read_env_fn, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<__read_env_fn&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __read_env_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___read_env_fn_` participa da resolução de sobrecarga.

### Exemplo

Um exemplo de uso desta fábrica é para agendar trabalho dependente no scheduler do receiver, que pode ser obtido com `read_env(get_scheduler)`:
```cpp
    std::execution::sender auto task =
      std::execution::read_env(std::execution::get_scheduler)
        | std::execution::let_value( {
            return std::execution::starts_on(sched, /*some nested work here*/);
        });
    
    std::this_thread::sync_wait( std::move(task) ); // espera que termine
```