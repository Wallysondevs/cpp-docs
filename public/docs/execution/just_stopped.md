# std::execution::just_stopped

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
inline constexpr just_stopped_t just_stopped{};
struct just_stopped_t { /*unspecified*/ };
(objeto de ponto de customização)
Assinatura da chamada
execution::sender auto just_stopped();
```

Uma sender factory que retorna um sender que completa imediatamente chamando [`set_stopped()`](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/set_stopped&action=edit&redlink=1> "cpp/execution/set stopped \(page does not exist\)") do receiver.

A expressão just_stopped() é [expression-equivalent](<#/doc/language/expressions>) a /*make-sender*/(just_stopped)

### Objetos de ponto de customização

O nome `execution::just_stopped` denota um _objeto de ponto de customização_ , que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). A versão não-cv de seu tipo é um tag type denotado como `execution::just_stopped_t`.

Todas as instâncias de `execution::just_stopped_t` são iguais. Os efeitos de invocar diferentes instâncias do tipo `execution::just_stopped_t` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser `const-qualified` ou não (no entanto, uma instância `volatile-qualified` não é exigida para ser invocável). Assim, `execution::just_stopped` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `execution::just_stopped` acima, `execution::just_stopped_t` modela

*   [std::invocable](<#/doc/concepts/invocable>)<execution::just_stopped_t, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_stopped_t, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<execution::just_stopped_t&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_stopped_t&, Args...&gt;.

Caso contrário, nenhum function call operator de `execution::just_stopped_t` participa da resolução de sobrecarga.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo