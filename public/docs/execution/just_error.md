# std::execution::just_error

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
inline constexpr just_error_t just_error{};
struct just_error_t { /*unspecified*/ };
(objeto de ponto de customização)
Assinatura da chamada
execution::sender auto just_error( auto&& error );
```

Uma fábrica de sender que retorna um sender que é concluído imediatamente chamando o [`set_error()`](<https://en.cppreference.com/mwiki/index.php?title=cpp/execution/set_error&action=edit&redlink=1> "cpp/execution/set error \(page does not exist\)") do receiver.

Seja e uma subexpressão representada por um erro de entrada que será injetado e retornado pelo receiver. A expressão just_error(e) é [expression-equivalent](<#/doc/language/expressions>) a /*make-sender*/(just_error, /*product-type*/(e))

### Objetos de Ponto de Customização

O nome `execution::just_error` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). A versão cv-unqualified de seu tipo é um tipo de tag denotado como `execution::just_error_t`.

Todas as instâncias de `execution::just_error_t` são iguais. Os efeitos de invocar diferentes instâncias do tipo `execution::just_error_t` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é obrigada a ser invocável). Assim, `execution::just_error` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `execution::just_error` acima, `execution::just_error_t` modela

* [std::invocable](<#/doc/concepts/invocable>)<execution::just_error_t, Args...>,
* [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_error_t, Args...&gt;,
* [std::invocable](<#/doc/concepts/invocable>)<execution::just_error_t&, Args...>, e
* [std::invocable](<#/doc/concepts/invocable>)&lt;const execution::just_error_t&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `execution::just_error_t` participa da resolução de sobrecarga.

### Observações

Se o erro fornecido for uma referência lvalue, uma cópia é feita dentro do sender retornado e uma referência lvalue não-const à cópia é enviada para o set_error do receiver. Se o valor fornecido for uma referência rvalue, ele é movido para o sender retornado e uma referência rvalue a ele é enviada para o `set_error` do receiver.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo