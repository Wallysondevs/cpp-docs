# std::execution::just

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
struct just_t { /*unspecified*/ };
inline constexpr just_t just{};
(objeto de ponto de customização)
Assinatura da chamada
execution::sender auto just( auto&&... values );
```

Uma fábrica de sender que retorna um sender que é concluído imediatamente chamando o [`set_value()`](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/set_value&action=edit&redlink=1> "cpp/execution/set value \(page does not exist\)") do receiver.

Seja ts um pack de subexpressões. A expressão just(ts...) é [expressão-equivalente](<#/doc/language/expressions>) a /*make-sender*/(just, /*product-type*/(ts...))

### Objetos de ponto de customização

O nome `execution::just` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). A versão não qualificada por cv de seu tipo é um tipo de tag denotado como `execution::just_t`.

Todas as instâncias de `execution::just_t` são iguais. Os efeitos de invocar diferentes instâncias do tipo `execution::just_t` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é exigida para ser invocável). Assim, `execution::just` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `execution::just` acima, `execution::just_t` modela

  * [std::invocable](<#/doc/concepts/invocable>)<execution::just_t, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_t, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<execution::just_t&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_t&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `execution::just_t` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo