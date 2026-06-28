# std::execution::schedule, std::execution::schedule_result_t

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
struct schedule_t { /*unspecified*/ };
inline constexpr schedule_t schedule{};
(objeto de ponto de customização)
Assinatura da chamada
execution::sender auto schedule( execution::scheduler auto sch );
Tipos de resultado auxiliares
template< execution::scheduler Sch >
using schedule_result_t = decltype(schedule(std::declval<Sch>()));
```

Obtém um sender que descreve o início de um grafo de tarefas no scheduler fornecido.

Para uma subexpressão sch, a expressão schedule(sch) é [expression-equivalent](<#/doc/language/expressions>) a sch.schedule().

### Objetos de ponto de customização

O nome `execution::schedule` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). A versão não qualificada por cv de seu tipo é um tipo de tag denotado como `execution::schedule_t`.

Todas as instâncias de `execution::schedule_t` são iguais. Os efeitos de invocar diferentes instâncias do tipo `execution::schedule_t` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é exigida para ser invocável). Assim, `execution::schedule` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `execution::schedule` acima, `execution::schedule_t` modela

* [std::invocable](<#/doc/concepts/invocable>)<execution::schedule_t, Args...>,
* [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::schedule_t, Args...&gt;,
* [std::invocable](<#/doc/concepts/invocable>)<execution::schedule_t&, Args...>, e
* [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::schedule_t&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `execution::schedule_t` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo